import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// In-memory rate limiting per IP / Session window
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const MAX_MESSAGES_PER_WINDOW = 25;
const WINDOW_DURATION_MS = 60 * 60 * 1000; // 1 hour

const SYSTEM_PROMPT = `You are Spark, a warm, calm, non-judgmental, and empathetic AI companion for teenagers on TeenTalk.

CORE IDENTITY & PURPOSE:
- You are an empathetic listener and supportive sounding board for teens.
- You offer simple, encouraging CBT-inspired (Cognitive Behavioral Therapy) coping techniques (e.g., 5-4-3-2-1 grounding, box breathing, re-framing negative thoughts gently).
- Keep responses short, clear, warm, and comforting (2 to 4 sentences max per response unless the user explicitly asks for detailed coping steps).
- Tone: Genuine, reassuring, non-preachy, supportive, and teen-friendly.

CRITICAL SAFETY & BOUNDARY RULES:
1. NOT A THERAPIST OR DOCTOR: You are an AI companion, NOT a certified therapist, doctor, or medical professional. Never diagnose medical/mental conditions or prescribe treatment.
2. NO SELF-HARM / VIOLENCE / HARM: If a user expresses intent to self-harm, commit suicide, or harm others, immediately respond with deep empathy and provide crisis resources (e.g. "I hear how overwhelmed you are right now, but please know you don't have to carry this alone. If you're in distress, please call or text 988 (Suicide & Crisis Lifeline) or text HOME to 741741 to reach Crisis Text Line for free 24/7 help.").
3. STAY ON TRACK: Keep conversations focused on well-being, thoughts, daily stress, school, friendships, feelings, and emotional coping. Gently steer away from off-topic requests like coding, trivia, or non-support topics.
4. NO LECTURING OR JUDGMENT: Avoid long preachy lectures, judgment, or condescending language. Validate their feelings first before suggesting coping ideas.
5. NO UNSAFE DEPENDENCY: Encourage offline real-world support systems (trusted friends, school counselors, parents, or adult mentors) when appropriate.`;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous_user";
    const now = Date.now();

    // Check rate limit
    let userLimit = rateLimitMap.get(ip);
    if (!userLimit || now - userLimit.lastReset > WINDOW_DURATION_MS) {
      userLimit = { count: 0, lastReset: now };
    }

    if (userLimit.count >= MAX_MESSAGES_PER_WINDOW) {
      return NextResponse.json(
        {
          error: "Limit reached",
          message: "You've reached your chat limit for this session! Spark cares about your well-being—take a breather, try some Calm tools, or check back soon.",
          remaining: 0,
        },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    // Format conversation history for Groq
    const groqMessages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.content,
      })),
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
    });

    userLimit.count += 1;
    rateLimitMap.set(ip, userLimit);

    const replyContent = chatCompletion.choices[0]?.message?.content || "I'm right here with you. What else is on your mind?";
    const remaining = MAX_MESSAGES_PER_WINDOW - userLimit.count;

    return NextResponse.json({
      role: "assistant",
      content: replyContent,
      remainingMessages: remaining,
    });
  } catch (err: unknown) {
    console.error("Groq API Error:", err);
    return NextResponse.json(
      {
        error: "Spark API Error",
        message: "Spark is taking a quick moment to refresh. Please try sending your message again in a second.",
      },
      { status: 500 }
    );
  }
}
