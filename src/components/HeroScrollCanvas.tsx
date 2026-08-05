"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ShieldCheck, Sparkles, HeartHandshake, Wind } from "lucide-react";
import { InteractiveButton } from "./ui/InteractiveButton";
import { TextWaveAnimation } from "./ui/TextWaveAnimation";
import { GlassEffectCard } from "./ui/GlassEffectCard";

const TOTAL_FRAMES = 300;

export function HeroScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload frames 1..300
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      const handleLoad = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      
      img.onload = handleLoad;
      img.onerror = () => {
        console.error(`Failed to load frame ${frameNum}`);
        handleLoad();
      };
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
      imgs.push(img);
    }
    imagesRef.current = imgs;
    
    // Fallback: If network is slow or cache hangs, force start after 3.5 seconds
    const timeoutId = setTimeout(() => {
      if (loadedCount < TOTAL_FRAMES) {
        setImagesLoaded(true);
      }
    }, 3500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Render canvas frame based on scroll index
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Set canvas dimensions matching display or window
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate aspect ratio covering canvas
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Subscribe to scroll changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Offset by 40 frames to start with the image a bit scrolled up as requested
      const START_FRAME = 40;
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, START_FRAME + Math.floor(latest * (TOTAL_FRAMES - 1 - START_FRAME)))
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    });

    // Initial draw when loaded
    if (imagesLoaded) {
      drawFrame(0);
    }

    return () => unsubscribe();
  }, [scrollYProgress, imagesLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  // Narrative Story beats matching scroll ranges
  const [activeBeat, setActiveBeat] = useState(1);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.28) setActiveBeat(1);
    else if (latest >= 0.28 && latest < 0.53) setActiveBeat(2);
    else if (latest >= 0.53 && latest < 0.78) setActiveBeat(3);
    else setActiveBeat(4);
  });

  const beat1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.28, 1], [1, 1, 0, 0]);
  const beat1X = useTransform(scrollYProgress, [0, 0.22, 0.28, 1], ["0%", "0%", "-5%", "-5%"]);

  const beat2Opacity = useTransform(scrollYProgress, [0, 0.28, 0.33, 0.48, 0.53, 1], [0, 0, 1, 1, 0, 0]);
  const beat2X = useTransform(scrollYProgress, [0, 0.28, 0.33, 0.48, 0.53, 1], ["5%", "5%", "0%", "0%", "-5%", "-5%"]);

  const beat3Opacity = useTransform(scrollYProgress, [0, 0.53, 0.58, 0.73, 0.78, 1], [0, 0, 1, 1, 0, 0]);
  const beat3X = useTransform(scrollYProgress, [0, 0.53, 0.58, 0.73, 0.78, 1], ["-5%", "-5%", "0%", "0%", "5%", "5%"]);

  const beat4Opacity = useTransform(scrollYProgress, [0, 0.78, 0.83, 0.98, 1], [0, 0, 1, 1, 1]);
  const beat4Y = useTransform(scrollYProgress, [0, 0.78, 0.83, 1], ["10%", "10%", "0%", "0%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh]">
      {/* Sticky Canvas & Text Overlay Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />

        {/* Ambient Overlay to ensure text readability without hiding frames */}
        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply z-10 pointer-events-none" />

        {/* Loading Indicator */}
        {!imagesLoaded && (
          <div className="absolute z-40 inset-0 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full border-4 border-violet-500/20 border-t-violet-600 animate-spin mb-4" />
            <p className="text-sm font-display text-violet-700">Loading 3D Visual Experience ({loadProgress}%)...</p>
          </div>
        )}

        {/* Scroll Narrative Overlay Content */}
        <div className="relative z-20 w-full max-w-6xl mx-auto h-full pointer-events-none">
          
          {/* BEAT 1 (0% - 25% Scroll) */}
          <motion.div
            style={{ opacity: beat1Opacity, x: beat1X, pointerEvents: activeBeat === 1 ? 'auto' : 'none' }}
            className="absolute inset-0 flex items-center justify-end px-4 sm:px-6"
          >
            <GlassEffectCard className="liquid-glass-glow max-w-lg w-full">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-widest mb-4 inline-block">
                The Overwhelming Noise
              </span>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-4">
                <TextWaveAnimation text="Drowning in" duration={0.8} />
                <span className="text-rose-600 drop-shadow-sm">
                  <TextWaveAnimation text="Expectations." delay={0.4} duration={0.8} />
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                The pressure to be perfect, the weight of unsaid words, the late nights staring at the ceiling. You don't have to carry this heavy world entirely alone.
              </p>
              <div className="flex items-center gap-2 text-xs text-rose-600 font-medium">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>Scroll down to step into a safe space...</span>
              </div>
            </GlassEffectCard>
          </motion.div>

          {/* BEAT 2 (28% - 53% Scroll) */}
          <motion.div
            style={{ opacity: beat2Opacity, x: beat2X, pointerEvents: activeBeat === 2 ? 'auto' : 'none' }}
            className="absolute inset-0 flex items-center justify-center md:justify-end px-4 sm:px-6 md:pr-12"
          >
            <GlassEffectCard className="liquid-glass-glow max-w-lg w-full">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200 uppercase tracking-widest mb-4 inline-block">
                A Safe Harbor
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-4">
                <TextWaveAnimation text="Breathe out the" duration={0.8} />
                <span className="text-violet-600 drop-shadow-sm">
                  <TextWaveAnimation text="Chaos." delay={0.4} duration={0.8} />
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                TeenTalk is your completely private, judgment-free sanctuary. A quiet place to untangle your messy thoughts, let your guard down, and just be yourself.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-100 p-2.5 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Anonymous & Zero Data Tracking</span>
              </div>
            </GlassEffectCard>
          </motion.div>

          {/* BEAT 3 (53% - 78% Scroll) */}
          <motion.div
            style={{ opacity: beat3Opacity, x: beat3X, pointerEvents: activeBeat === 3 ? 'auto' : 'none' }}
            className="absolute inset-0 flex items-center justify-start px-4 sm:px-6"
          >
            <GlassEffectCard className="liquid-glass-glow max-w-lg w-full">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-teal-100 text-teal-700 border border-teal-200 uppercase tracking-widest mb-4 inline-block">
                Gentle Guidance
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-4">
                <TextWaveAnimation text="Someone who" duration={0.8} />
                <span className="text-teal-600 drop-shadow-sm">
                  <TextWaveAnimation text="Listens." delay={0.4} duration={0.8} />
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                Meet Spark, an empathetic AI companion. Pour your heart out anonymously, and receive warm, CBT-backed support and grounding techniques whenever you need them most.
              </p>
              <InteractiveButton href="/chat" variant="primary">
                <Sparkles className="w-4 h-4" />
                <span>Start Talking to Spark</span>
              </InteractiveButton>
            </GlassEffectCard>
          </motion.div>

          {/* BEAT 4 (78% - 100% Scroll Final Hook) */}
          <motion.div
            style={{ opacity: beat4Opacity, y: beat4Y, pointerEvents: activeBeat === 4 ? 'auto' : 'none' }}
            className="absolute inset-0 flex items-center justify-center px-4 sm:px-6"
          >
            <GlassEffectCard className="liquid-glass-glow max-w-2xl text-center w-full flex flex-col items-center">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-black/5 border border-black/10 text-slate-600 uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
                Your Sanctuary Awaits
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-4 flex flex-wrap justify-center">
                <TextWaveAnimation text="Reclaim your" duration={0.8} className="justify-center w-full" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-indigo-500 to-violet-500 block mt-1">
                  <TextWaveAnimation text="Peace of Mind." delay={0.4} duration={0.8} className="justify-center" />
                </span>
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-lg leading-relaxed mb-8">
                You deserve a space to heal. Track your true feelings, practice calming exercises, and let go of the anxiety holding you back today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                <InteractiveButton href="/chat" variant="primary">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Enter Spark Chat</span>
                </InteractiveButton>
                <InteractiveButton href="/calm" variant="secondary">
                  <Wind className="w-4 h-4 text-teal-600" />
                  <span>Explore Calm Tools</span>
                </InteractiveButton>
              </div>
            </GlassEffectCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
