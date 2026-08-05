"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "default" | "sm" | "lg";
  href?: string;
}

export const InteractiveButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, InteractiveButtonProps>(
  ({ children, className, variant = "primary", size = "default", href, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-full font-display font-bold transition-all duration-300 overflow-hidden outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white";
    
    const sizes = {
      default: "px-8 py-4 text-sm",
      sm: "px-4 py-2 text-xs",
      lg: "px-10 py-5 text-base",
    };

    const variants = {
      primary: "text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 shadow-xl shadow-violet-600/30 hover:shadow-violet-500/50 focus:ring-violet-500 border border-black/10",
      secondary: "text-slate-900 bg-white/60 hover:bg-white/80 border border-black/10 backdrop-blur-md shadow-lg focus:ring-black/20",
      danger: "text-white bg-gradient-to-r from-rose-600 to-red-500 shadow-xl shadow-rose-600/30 hover:shadow-rose-500/50 border border-rose-400/20 focus:ring-rose-500",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-black/5 border border-transparent focus:ring-black/10",
    };

    const innerContent = (
      <>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        <div className="absolute inset-0 z-0 bg-black/0 hover:bg-black/5 transition-colors duration-300 rounded-full pointer-events-none" />
      </>
    );

    if (href) {
      return (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={cn(baseStyles, sizes[size], variants[variant], className)}
            {...(props as any)}
          >
            {innerContent}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...(props as any)}
      >
        {innerContent}
      </motion.button>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";
