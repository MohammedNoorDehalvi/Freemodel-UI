"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RefreshCw, Wind } from "lucide-react";

type Phase = "idle" | "inhale" | "hold" | "exhale";

const PHASES: Record<Phase, { name: string; duration: number; instruction: string; scale: number; color: string }> = {
  idle: { name: "Ready", duration: 0, instruction: "Tap Start to begin 4-7-8 Breathing", scale: 1, color: "from-violet-500/20 to-indigo-500/20" },
  inhale: { name: "Inhale", duration: 4, instruction: "Breathe in deeply through your nose...", scale: 1.4, color: "from-teal-400/30 to-emerald-500/30" },
  hold: { name: "Hold", duration: 7, instruction: "Hold your breath gently...", scale: 1.4, color: "from-indigo-500/30 to-violet-500/30" },
  exhale: { name: "Exhale", duration: 8, instruction: "Slowly blow all the air out through your mouth...", scale: 0.85, color: "from-rose-500/30 to-violet-500/30" },
};

export function BreathingGuide() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // Transition to next phase
        if (phase === "idle" || phase === "exhale") {
          setPhase("inhale");
          setTimeLeft(PHASES.inhale.duration);
          if (phase === "exhale") setCycles((c) => c + 1);
        } else if (phase === "inhale") {
          setPhase("hold");
          setTimeLeft(PHASES.hold.duration);
        } else if (phase === "hold") {
          setPhase("exhale");
          setTimeLeft(PHASES.exhale.duration);
        }
      }
    } else {
      setPhase("idle");
      setTimeLeft(0);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, timeLeft]);

  const toggleBreathing = () => {
    if (isActive) {
      setIsActive(false);
      setPhase("idle");
    } else {
      setIsActive(true);
      setPhase("inhale");
      setTimeLeft(PHASES.inhale.duration);
      setCycles(0);
    }
  };

  const currentInfo = PHASES[phase];

  return (
    <div className="w-full liquid-glass rounded-3xl p-8 border border-black/10 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-violet-500/5 pointer-events-none" />

      <div className="flex items-center gap-2 text-teal-700 bg-teal-100 border border-teal-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
        <Wind className="w-4 h-4" />
        <span>4-7-8 Breathing Aid</span>
      </div>

      <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-2">
        Find Your Calm Rhythm
      </h3>
      <p className="text-xs md:text-sm text-slate-600 max-w-md mb-10 leading-relaxed">
        Slowing down your breath activates your body&apos;s natural relaxation response in under 2 minutes.
      </p>

      {/* Animated Liquid Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-10">
        {/* Outer Glow Ring */}
        <motion.div
          animate={{
            scale: currentInfo.scale * 1.15,
            opacity: isActive ? [0.3, 0.6, 0.3] : 0.2,
          }}
          transition={{ duration: currentInfo.duration || 1, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentInfo.color} blur-2xl`}
        />

        {/* Liquid Glass Main Circle */}
        <motion.div
          animate={{ scale: currentInfo.scale }}
          transition={{ duration: currentInfo.duration || 1, ease: "easeInOut" }}
          className="w-48 h-48 rounded-full liquid-glass-glow border-2 border-black/10 flex flex-col items-center justify-center p-6 shadow-2xl z-10"
        >
          <span className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-wider mb-1">
            {currentInfo.name}
          </span>
          {isActive && (
            <span className="font-display font-black text-4xl text-teal-600">
              {timeLeft}s
            </span>
          )}
        </motion.div>
      </div>

      {/* Dynamic Instruction */}
      <div className="min-h-[48px] flex items-center justify-center mb-8 px-4">
        <p className="text-sm font-medium text-slate-800 bg-black/5 border border-black/10 px-5 py-2.5 rounded-2xl backdrop-blur-md">
          {currentInfo.instruction}
        </p>
      </div>

      {/* Controls & Cycle Counter */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleBreathing}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
            isActive
              ? "bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300"
              : "bg-gradient-to-r from-teal-500 to-indigo-600 hover:scale-105 text-white shadow-teal-500/20"
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" /> Pause Session
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Start Breathing
            </>
          )}
        </button>

        {cycles > 0 && (
          <div className="text-xs text-slate-600 font-medium bg-black/5 px-4 py-3 rounded-full border border-black/10">
            Completed: <span className="text-teal-700 font-bold">{cycles}</span> cycle{cycles > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
