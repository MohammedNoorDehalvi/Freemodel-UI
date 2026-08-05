"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Is TeenTalk completely free?",
    a: "Yes! TeenTalk is 100% free to use. There are no paid tiers, hidden subscriptions, or premium locks on any emotional support features.",
  },
  {
    q: "Do I need to sign up or create an account?",
    a: "No! TeenTalk requires zero accounts, zero passwords, and zero personal information. You can use Spark AI, the Mood Tracker, and Calm tools completely anonymously.",
  },
  {
    q: "How does Spark AI protect my privacy?",
    a: "Spark AI runs stateful chat completions over Groq's high-speed API without saving your messages to any database on our servers. Your mood logs stay exclusively inside your own browser's local storage.",
  },
  {
    q: "Is Spark AI a real therapist or doctor?",
    a: "No. Spark is an AI companion designed for active listening, supportive conversation, and basic CBT grounding exercises. Spark cannot diagnose conditions or replace professional mental health care or therapy.",
  },
  {
    q: "Why is there a message limit in Spark chat?",
    a: "We implement a session message counter to prevent system misuse, encourage healthy offline breaks, and ensure Spark remains fast and responsive for everyone.",
  },
  {
    q: "What should I do if I or a friend am in immediate danger?",
    a: "Please go immediately to our Crisis Support page or call/text 988 (in the US & Canada), text HOME to 741741, or reach out to a trusted adult, school counselor, or emergency service.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-300 mt-3">
            Everything you need to know about TeenTalk safety, AI boundaries, and privacy.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="liquid-glass rounded-2xl border border-white/15 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base text-white hover:text-violet-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform text-slate-400 ${isOpen ? "rotate-180 text-violet-300" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
