"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 flex items-center justify-center pointer-events-none w-full h-full overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-slate-50/80 z-10" />
      <svg
        className="absolute w-full h-full z-0 opacity-20"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,500 L1000,500"
          stroke="url(#gradient-beam)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M500,0 L500,1000"
          stroke="url(#gradient-beam)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
        <defs>
          <linearGradient id="gradient-beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
