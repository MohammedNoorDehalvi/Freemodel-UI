"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, Trash2, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export function ThoughtVaporizer() {
  const [thought, setThought] = useState("");
  const [isVaporizing, setIsVaporizing] = useState(false);
  const [vaporizedCount, setVaporizedCount] = useState(0);

  const handleVaporize = () => {
    if (!thought.trim() || isVaporizing) return;

    setIsVaporizing(true);

    // Fire glowing particle burst using canvas-confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#c4b5fd", "#a78bfa", "#38bdf8", "#34d399", "#f472b6"],
    });

    setTimeout(() => {
      setThought("");
      setIsVaporizing(false);
      setVaporizedCount((c) => c + 1);
    }, 1200);
  };

  return (
    <div className="w-full liquid-glass rounded-3xl p-8 border border-black/10 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-slate-900">Thought Vaporizer</h3>
            <p className="text-xs text-slate-600">Write down what&apos;s weighing on you and watch it dissolve into light.</p>
          </div>
        </div>

        {vaporizedCount > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-full font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{vaporizedCount} thought{vaporizedCount > 1 ? "s" : ""} released</span>
          </div>
        )}
      </div>

      {/* Input Box / Vaporizing Animation Frame */}
      <div className="relative min-h-[160px]">
        <AnimatePresence>
          {isVaporizing ? (
            <motion.div
              key="vaporizing"
              initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              animate={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-violet-600/40 via-pink-500/40 to-teal-400/40 rounded-2xl p-6 flex items-center justify-center border border-black/20 backdrop-blur-2xl text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-8 h-8 text-violet-700 animate-spin" />
                <span className="font-display font-bold text-lg text-slate-900">Vaporizing into stardust...</span>
              </div>
            </motion.div>
          ) : (
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Write your stressful or heavy thought here... (e.g. 'I'm worried I blew that presentation today'). It will never be saved anywhere."
              className="w-full h-40 p-5 rounded-2xl glass-input text-sm leading-relaxed resize-none focus:ring-2 focus:ring-violet-400/50"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-slate-500">
          🔒 Nothing is stored on any server. Disappears permanently.
        </p>

        <button
          onClick={handleVaporize}
          disabled={!thought.trim() || isVaporizing}
          className="px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:scale-105 text-white disabled:opacity-40 shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Vaporize Thought</span>
        </button>
      </div>
    </div>
  );
}
