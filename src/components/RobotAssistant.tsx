"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, X, Maximize2 } from "lucide-react";
import Link from "next/link";
import { SparkChat } from "./SparkChat";

export function RobotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white/90 backdrop-blur-3xl border border-black/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden liquid-glass-glow"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 bg-gradient-to-r from-violet-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900">Spark Mini</h3>
                  <p className="text-[10px] text-slate-500">I'm listening...</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/chat" className="p-1.5 rounded-lg bg-black/5 hover:bg-black/10 text-slate-600 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden relative pb-12">
              <div className="absolute inset-0 scale-[0.85] origin-top -translate-y-4">
                <SparkChat />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-16 h-16 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-600/30 border-2 border-white/20"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="robot"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              className="text-white"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-500 ${isHovered ? "animate-bounce" : ""}`}
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              className="text-white"
            >
              <X className="w-8 h-8" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsing ring */}
        {!isOpen && (
          <span className="absolute -inset-2 rounded-full border-2 border-violet-500/50 animate-ping [animation-duration:3s] pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
