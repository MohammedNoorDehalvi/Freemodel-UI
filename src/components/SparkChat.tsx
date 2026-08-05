"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, RefreshCw, ShieldAlert, Heart, Wind, MessageSquare, Info, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "Hey there! I'm Spark, your safe & private AI companion. Whatever's on your mind—school stress, friend drama, or just needing to vent—I'm right here. No judgment, ever. What's up?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

const QUICK_CHIPS = [
  { label: "💬 I want to vent", text: "I just really need to vent about something that happened today." },
  { label: "🧘 Help me calm down", text: "I'm feeling really anxious right now. Can you help me calm down?" },
  { label: "🌊 I feel overwhelmed", text: "Everything feels like too much right now. Where do I start?" },
  { label: "📚 Stressed about school", text: "School and exams are stressing me out so bad." },
  { label: "🌬️ Quick breathing exercise", text: "Can you guide me through a quick 1-minute breathing exercise?" },
];

export function SparkChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingCount, setRemainingCount] = useState<number>(25);
  const [isLimited, setIsLimited] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading || isLimited) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setIsLimited(true);
        setErrorMessage(data.message || "Session chat limit reached.");
        setRemainingCount(0);
        return;
      }

      if (!response.ok || data.error) {
        throw new Error(data.message || "Failed to reach Spark.");
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (typeof data.remainingMessages === "number") {
        setRemainingCount(data.remainingMessages);
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage("Spark took a quick breather. Try sending your message again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setIsLimited(false);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[82vh] liquid-glass rounded-3xl border border-black/10 overflow-hidden shadow-2xl relative">
      
      {/* Top Header */}
      <div className="px-6 py-4 border-b border-black/10 bg-white/60 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-200 to-indigo-200 flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-700 animate-pulse" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              Spark AI
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 font-sans font-medium">
                Groq Llama 3.3
              </span>
            </h2>
            <p className="text-xs text-slate-500">Empathic Companion • Zero Logging</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 bg-black/5 border border-black/10 px-3 py-1.5 rounded-full">
            <MessageSquare className="w-3.5 h-3.5 text-violet-600" />
            <span>{remainingCount} messages left</span>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-black/5 hover:bg-black/10 border border-black/10 text-slate-600 hover:text-slate-900 transition-all text-xs flex items-center gap-1.5"
            title="Reset Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Safety Alert Banner */}
      <div className="px-6 py-2.5 bg-violet-50 border-b border-violet-200 text-[11px] text-violet-900 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-violet-600 shrink-0" />
          <span>Spark is an AI companion for emotional support, not a therapist or crisis service.</span>
        </div>
        <Link href="/crisis" className="text-rose-600 hover:text-rose-700 font-semibold underline shrink-0 flex items-center gap-1">
          <ShieldAlert className="w-3 h-3" />
          <span>Crisis Support</span>
        </Link>
      </div>

      {/* Message History Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
              msg.role === "user" 
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 text-violet-700 border border-violet-200"
            }`}>
              {msg.role === "user" ? "You" : <Sparkles className="w-4 h-4 text-violet-700" />}
            </div>

            {/* Bubble */}
            <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-none shadow-lg shadow-violet-600/20"
                    : "liquid-glass-card text-slate-800 rounded-tl-none border border-black/10"
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-slate-400 px-1">{msg.timestamp}</span>
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mr-auto items-center"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-violet-200 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-600 animate-spin" />
            </div>
            <div className="liquid-glass-card px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 ml-1">Spark is thinking...</span>
            </div>
          </motion.div>
        )}

        {/* Limit Reached Warning */}
        {isLimited && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex flex-col gap-3 my-2"
          >
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Session Limit Reached</span>
            </div>
            <p className="text-xs leading-relaxed">{errorMessage}</p>
            <div className="flex gap-3 mt-1">
              <Link href="/calm" className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                <span>Try Calm Tools</span>
              </Link>
              <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-semibold text-slate-900">
                Log Your Mood
              </Link>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Chips */}
      {!isLimited && (
        <div className="px-6 py-2 bg-slate-50/80 border-t border-black/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.text)}
              disabled={loading}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/5 hover:bg-black/10 border border-black/10 text-slate-600 hover:text-slate-900 shrink-0 transition-all hover:scale-105"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* Message Input Box */}
      <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-black/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLimited ? "Session limit reached for today..." : "Type your thoughts... (Spark is here to listen)"}
            disabled={loading || isLimited}
            className="flex-1 px-5 py-3.5 rounded-2xl glass-input text-sm placeholder:text-slate-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading || isLimited}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white disabled:opacity-40 hover:shadow-lg hover:shadow-violet-600/30 hover:scale-105 transition-all shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

    </div>
  );
}
