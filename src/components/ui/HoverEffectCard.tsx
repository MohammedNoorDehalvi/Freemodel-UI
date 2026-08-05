"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-violet-500/10 dark:bg-slate-800/50 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-slate-950/40 border border-transparent dark:border-white/[0.1] group-hover:border-violet-500/30 relative z-20 backdrop-blur-sm transition-colors duration-300">
            <div className="relative z-50">
              <div className="p-4">
                {item.icon && <div className="mb-4 text-violet-400">{item.icon}</div>}
                <h4 className="text-zinc-100 font-bold tracking-wide mt-4">
                  {item.title}
                </h4>
                <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
