import React from "react";
import { cn } from "@/lib/utils";

export const GlassEffectCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] backdrop-blur-2xl p-8 md:p-10",
        "bg-white/5", // Extremely transparent base for liquid feel
        "before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-30", // Soft edge highlight
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-teal-500/10 opacity-30 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
