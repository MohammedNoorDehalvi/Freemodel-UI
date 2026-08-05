"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, HeartHandshake, ShieldCheck, ArrowDown, Wind } from "lucide-react";

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
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
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
      imgs.push(img);
    }
    imagesRef.current = imgs;
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
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * TOTAL_FRAMES))
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
  const beat1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  const beat1X = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], ["5%", "0%", "0%", "-5%"]);

  const beat2Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.48, 0.53], [0, 1, 1, 0]);
  const beat2X = useTransform(scrollYProgress, [0.28, 0.33, 0.48, 0.53], ["5%", "0%", "0%", "-5%"]);

  const beat3Opacity = useTransform(scrollYProgress, [0.53, 0.58, 0.73, 0.78], [0, 1, 1, 0]);
  const beat3X = useTransform(scrollYProgress, [0.53, 0.58, 0.73, 0.78], ["-5%", "0%", "0%", "5%"]);

  const beat4Opacity = useTransform(scrollYProgress, [0.78, 0.83, 0.98, 1], [0, 1, 1, 1]);
  const beat4Y = useTransform(scrollYProgress, [0.78, 0.83], ["10%", "0%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-slate-950">
      {/* Sticky Canvas & Text Overlay Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />

        {/* Ambient Dark Overlay to make glass text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette z-10 pointer-events-none" />

        {/* Loading Indicator */}
        {!imagesLoaded && (
          <div className="absolute z-40 inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full border-4 border-violet-500/20 border-t-violet-400 animate-spin mb-4" />
            <p className="text-sm font-display text-violet-200">Loading 3D Visual Experience ({loadProgress}%)...</p>
          </div>
        )}

        {/* Scroll Narrative Overlay Content */}
        <div className="relative z-20 w-full max-w-6xl mx-auto h-full pointer-events-none">
          
          {/* BEAT 1 (0% - 25% Scroll) */}
          <motion.div
            style={{ opacity: beat1Opacity, x: beat1X }}
            className="absolute inset-0 flex items-center justify-end px-6"
          >
            <div className="liquid-glass-glow p-8 md:p-12 rounded-3xl backdrop-blur-2xl border border-white/20 shadow-2xl max-w-xl pointer-events-auto w-full">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20 uppercase tracking-widest mb-6 inline-block">
                The Overwhelming Noise
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-5">
                Drowning in <br/><span className="text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.4)]">Expectations.</span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed mb-8">
                The pressure to be perfect, the weight of unsaid words, the late nights staring at the ceiling. You don't have to carry this heavy world entirely alone.
              </p>
              <div className="flex items-center gap-3 text-xs text-rose-300 font-medium">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>Scroll down to step into a safe space...</span>
              </div>
            </div>
          </motion.div>

          {/* BEAT 2 (28% - 53% Scroll) */}
          <motion.div
            style={{ opacity: beat2Opacity, x: beat2X }}
            className="absolute inset-0 flex items-center justify-center md:justify-end px-6 md:pr-12"
          >
            <div className="liquid-glass-glow p-8 md:p-12 rounded-3xl backdrop-blur-2xl border border-white/20 shadow-2xl max-w-xl pointer-events-auto w-full">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-violet-500/10 text-violet-300 border border-violet-500/20 uppercase tracking-widest mb-6 inline-block">
                A Safe Harbor
              </span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-5">
                Breathe out the <br/><span className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.4)]">Chaos.</span>
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed mb-8">
                TeenTalk is your completely private, judgment-free sanctuary. A quiet place to untangle your messy thoughts, let your guard down, and just be yourself.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Anonymous & Zero Data Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* BEAT 3 (53% - 78% Scroll) */}
          <motion.div
            style={{ opacity: beat3Opacity, x: beat3X }}
            className="absolute inset-0 flex items-center justify-start px-6"
          >
            <div className="liquid-glass-glow p-8 md:p-12 rounded-3xl backdrop-blur-2xl border border-white/20 shadow-2xl max-w-xl pointer-events-auto w-full">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 uppercase tracking-widest mb-6 inline-block">
                Gentle Guidance
              </span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-5">
                Someone who <br/><span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]">Listens.</span>
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed mb-8">
                Meet Spark, an empathetic AI companion. Pour your heart out anonymously, and receive warm, CBT-backed support and grounding techniques whenever you need them most.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-600/30 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Talking to Spark</span>
              </Link>
            </div>
          </motion.div>

          {/* BEAT 4 (78% - 100% Scroll Final Hook) */}
          <motion.div
            style={{ opacity: beat4Opacity, y: beat4Y }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="liquid-glass-glow p-8 md:p-14 rounded-3xl backdrop-blur-2xl border border-white/20 shadow-2xl max-w-3xl text-center pointer-events-auto w-full flex flex-col items-center">
              <span className="px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold bg-white/10 border border-white/10 text-white uppercase tracking-wider mb-6 shadow-lg backdrop-blur-md">
                Your Sanctuary Awaits
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6">
                Reclaim your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-violet-400 drop-shadow-sm">Peace of Mind.</span>
              </h2>
              <p className="text-sm md:text-base lg:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
                You deserve a space to heal. Track your true feelings, practice calming exercises, and let go of the anxiety holding you back today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="/chat"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-display font-bold text-sm bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 text-white shadow-2xl shadow-violet-600/30 hover:scale-105 transition-all"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Enter Spark Chat</span>
                </Link>
                <Link
                  href="/calm"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full font-display font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white backdrop-blur-md transition-all"
                >
                  <Wind className="w-4 h-4 text-teal-300" />
                  <span>Explore Calm Tools</span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
