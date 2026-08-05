import { BreathingGuide } from "@/components/BreathingGuide";
import { SoundscapePlayer } from "@/components/SoundscapePlayer";
import { ThoughtVaporizer } from "@/components/ThoughtVaporizer";
import { Wind } from "lucide-react";
import { Meteors } from "@/components/ui/Meteors";
import { Vortex } from "@/components/ui/Vortex";

export const metadata = {
  title: "Calm & Grounding Sanctuary | TeenTalk",
  description: "Interactive 4-7-8 breathing exercises, ambient soundscapes, and thought vaporizing tools.",
};

export default function CalmPage() {
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <Meteors number={20} className="opacity-40" />
      {/* Background Glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 flex flex-col gap-12">
        <Vortex
          backgroundColor="transparent"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          baseHue={220}
        >
          <div className="text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-indigo-700 bg-indigo-100 border border-indigo-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3 relative z-20">
              <Wind className="w-4 h-4" />
              <span>Reset & Grounding Tools</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight relative z-20">
              Calm Space
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 relative z-20">
              Take a breather. Choose a tool below to slow down your racing thoughts and regain emotional balance.
            </p>
          </div>
        </Vortex>

        {/* Breathing Guide */}
        <BreathingGuide />

        {/* Ambient Soundscapes */}
        <SoundscapePlayer />

        {/* Thought Vaporizer */}
        <ThoughtVaporizer />
      </div>
    </div>
  );
}
