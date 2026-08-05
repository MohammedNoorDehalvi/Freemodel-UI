import { MoodTracker } from "@/components/MoodTracker";
import { Smile, Heart } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { AnimatedTooltip } from "@/components/ui/AnimatedTooltip";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";

const communitySupport = [
  {
    id: 1,
    name: "Alex",
    designation: "Found peace today",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Sam",
    designation: "Tracking progress",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jordan",
    designation: "Feeling balanced",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Taylor",
    designation: "Just breathed",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

export const metadata = {
  title: "Mood & Vibe Tracker | TeenTalk",
  description: "Track your daily mood trends locally on your device with complete privacy.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundBeams className="opacity-50" />
      {/* Ambient background blur */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-teal-700 bg-teal-100 border border-teal-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <Smile className="w-4 h-4" />
            <span>Local Vibe Vault</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Your Personal Vibe History
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            Log how you feel, identify emotional patterns, and keep your data 100% private on your own device.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex flex-row items-center justify-center w-full mb-4">
            <AnimatedTooltip items={communitySupport} />
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Join 100+ teens finding balance today privately.</span>
          </p>
        </div>

        <BentoGrid className="mb-12">
          <BentoGridItem 
            title="Emotional Clarity"
            description="Identifying your feelings is the first step to managing them. Your private logs reveal hidden patterns in your daily life."
            className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-white border-indigo-100"
            header={<div className="h-full w-full rounded-2xl bg-indigo-100/50 flex items-center justify-center text-indigo-300 animate-pulse"><Smile className="w-10 h-10" /></div>}
          />
          <BentoGridItem 
            title="Total Privacy"
            description="Your vault is secured locally. We literally cannot see what you log."
            className="md:col-span-1 bg-gradient-to-br from-teal-50 to-white border-teal-100"
            header={<div className="h-full w-full rounded-2xl bg-teal-100/50 flex items-center justify-center text-teal-300"><Heart className="w-10 h-10" /></div>}
          />
        </BentoGrid>

        <MoodTracker />
      </div>
    </div>
  );
}
