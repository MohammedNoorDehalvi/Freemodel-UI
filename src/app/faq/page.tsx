"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TextRevealCard } from "@/components/ui/TextRevealCard";

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
    <div className="min-h-screen px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-violet-700 bg-violet-100 border border-violet-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <TextRevealCard
            text="Hover to reveal truth"
            revealText="Privacy is guaranteed."
            className="mb-8"
          >
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight text-center">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-slate-600 mt-3 text-center">
              Everything you need to know about TeenTalk safety, AI boundaries, and privacy.
            </p>
          </TextRevealCard>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="liquid-glass rounded-2xl border border-black/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base text-slate-900 hover:text-violet-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform text-slate-500 ${isOpen ? "rotate-180 text-violet-700" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-black/10 pt-4"
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
