"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 0.8 : 1.1]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 0.8 : 1.1]
  );
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[120vh] md:min-h-[150vh] flex flex-col items-center justify-start py-20 pb-40 md:py-40 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-75"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="dark:text-white text-neutral-800 text-3xl font-bold mb-20 text-center"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      <motion.div
        style={{
          translateY,
          rotateX: rotate,
          scaleX,
          scaleY,
        }}
        className="w-[30rem] sm:w-[40rem] md:w-[50rem] h-[20rem] sm:h-[30rem] md:h-[35rem] bg-[#222222] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] p-2 sm:p-3 md:p-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transform-origin-bottom overflow-hidden relative"
      >
        {/* Screen */}
        <div className="w-full h-full bg-[#111111] rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden flex flex-col border-4 border-[#333333]">
          <div className="w-full flex-1 relative bg-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50" />
            <div className="absolute inset-0 z-10 flex flex-col p-8">
              <h3 className="font-display font-bold text-4xl text-slate-900">Your Private Vault</h3>
              <p className="text-sm text-slate-500 mt-2 mb-8">What's on your mind today? (Only you can see this)</p>
              <textarea 
                className="flex-1 w-full bg-transparent resize-none outline-none border-none text-xl font-serif text-slate-800 placeholder-slate-300"
                placeholder="Start typing..."
              ></textarea>
            </div>
            {showGradient && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Base / Keyboard wrapper - purely visual */}
        <div className="absolute inset-x-0 bottom-[-8rem] sm:bottom-[-10rem] md:bottom-[-12rem] h-[8rem] sm:h-[10rem] md:h-[12rem] bg-gradient-to-b from-[#272729] to-[#121213] rounded-b-[2rem] sm:rounded-b-[2.5rem] md:rounded-b-[3rem] p-4 flex items-center justify-center transform rotate-x-[80deg] origin-top preserve-3d">
          <div className="w-[85%] h-[90%] bg-[#1c1c1c] rounded-xl flex flex-col gap-1 p-2">
            <div className="w-full h-8 bg-black rounded-lg opacity-80" />
            <div className="flex-1 w-full bg-[#2a2a2a] rounded-lg opacity-80" />
            <div className="w-1/3 h-1/4 bg-[#111] rounded-lg mx-auto opacity-50" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
