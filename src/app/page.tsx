"use client";

import Link from "next/link";
import { HeroScrollCanvas } from "@/components/HeroScrollCanvas";
import { Sparkles, HeartHandshake, ShieldCheck, Smile, Wind, PhoneCall, Lock, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-950">
      {/* 3D Frame Scroll Hero Narrative Section */}
      <HeroScrollCanvas />

      {/* Feature Highlight Grid Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-400/30 uppercase tracking-widest inline-block mb-3">
            Designed for Teen Minds
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Built with <span className="text-gradient">Empathy & Absolute Privacy</span>
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-4 leading-relaxed">
            TeenTalk gives you modern, non-judgmental wellness tools tailored to your daily emotional ups and downs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Spark AI */}
          <div className="liquid-glass-card p-8 rounded-3xl flex flex-col gap-4 border border-white/15">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-400/30 flex items-center justify-center text-violet-300">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Spark AI Companion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Powered by Groq Llama 3.3. Talk out loud about school stress, friend issues, or anxious thoughts anytime.
            </p>
            <Link href="/chat" className="text-xs font-semibold text-violet-300 flex items-center gap-1 mt-auto hover:underline">
              Start Chatting <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Local Mood Vault */}
          <div className="liquid-glass-card p-8 rounded-3xl flex flex-col gap-4 border border-white/15">
            <div className="w-12 h-12 rounded-2xl bg-teal-600/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Private Mood Vault</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Track your daily vibe trends locally in your browser. No databases, zero tracking, total confidentiality.
            </p>
            <Link href="/dashboard" className="text-xs font-semibold text-teal-300 flex items-center gap-1 mt-auto hover:underline">
              Log Your Vibe <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: Calm Tools */}
          <div className="liquid-glass-card p-8 rounded-3xl flex flex-col gap-4 border border-white/15">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Calm & Grounding</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interactive 4-7-8 breathing aid, ambient audio soundscapes, and a thought vaporizer to dissolve anxiety.
            </p>
            <Link href="/calm" className="text-xs font-semibold text-indigo-300 flex items-center gap-1 mt-auto hover:underline">
              Breathe & Reset <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Crisis Support */}
          <div className="liquid-glass-card p-8 rounded-3xl flex flex-col gap-4 border border-white/15">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">24/7 Crisis Safety Net</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instant one-tap connections to free confidential hotlines (988 Lifeline, Crisis Text Line 741741, Trevor Project).
            </p>
            <Link href="/crisis" className="text-xs font-semibold text-rose-300 flex items-center gap-1 mt-auto hover:underline">
              Access Support <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full">
        <div className="liquid-glass-glow p-10 md:p-14 rounded-3xl border border-white/20 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-3xl text-white">How TeenTalk Works</h2>
            <p className="text-xs md:text-sm text-slate-300 mt-2">Simple, zero-friction steps to emotional clarity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-400/40 text-violet-200 font-display font-bold text-lg flex items-center justify-center">
                1
              </div>
              <h4 className="font-display font-semibold text-base text-white">Open the App</h4>
              <p className="text-xs text-slate-300 leading-relaxed">No sign up, no email, no password. Open and immediately talk or vent.</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-400/40 text-indigo-200 font-display font-bold text-lg flex items-center justify-center">
                2
              </div>
              <h4 className="font-display font-semibold text-base text-white">Talk to Spark</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Vent thoughts, get empathetic active listening, and simple CBT grounding steps.</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal-600/30 border border-teal-400/40 text-teal-200 font-display font-bold text-lg flex items-center justify-center">
                3
              </div>
              <h4 className="font-display font-semibold text-base text-white">Reset & Unwind</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Use ambient soundscapes, vaporize heavy thoughts, and log your mood locally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Core Trust Commitments Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 uppercase tracking-widest inline-block mb-3">
            Core Safety & Trust Guarantees
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Built for <span className="text-gradient">Complete Peace of Mind</span>
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-4 leading-relaxed">
            TeenTalk is engineered from the ground up to protect your privacy and support your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="liquid-glass p-8 rounded-3xl border border-white/15 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">100% Anonymous</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No registration, email, or account needed. You can use all emotional support tools immediately and anonymously.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] text-emerald-400 font-medium">
              Zero personal data collected
            </div>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-white/15 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">CBT-Inspired Techniques</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Empathetic active listening paired with standard Cognitive Behavioral Therapy grounding exercises and breathing aids.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] text-violet-300 font-medium">
              Grounding & calm focus
            </div>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-white/15 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Local Data Vault</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                AI chats run statelessly over Groq API with zero server logging. Mood history stays exclusively in your device&apos;s local storage.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-[11px] text-teal-300 font-medium">
              On-device local storage only
            </div>
          </div>
        </div>
      </section>

      {/* Privacy First Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
        <div className="liquid-glass p-8 md:p-12 rounded-3xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-lg">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Strict Privacy Promise</span>
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
              Your thoughts belong to you. Period.
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              TeenTalk does not require account registration, stores zero chat history on any backend server, and keeps mood data exclusively in your device&apos;s local memory.
            </p>
          </div>
          <Link
            href="/privacy"
            className="px-6 py-3.5 rounded-full font-display font-semibold text-xs bg-white/10 hover:bg-white/20 border border-white/20 text-white shrink-0 transition-all"
          >
            Read Full Privacy Commitment →
          </Link>
        </div>
      </section>
    </div>
  );
}
