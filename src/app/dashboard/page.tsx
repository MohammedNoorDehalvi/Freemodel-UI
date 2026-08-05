import { MoodTracker } from "@/components/MoodTracker";
import { Smile } from "lucide-react";

export const metadata = {
  title: "Mood & Vibe Tracker | TeenTalk",
  description: "Track your daily mood trends locally on your device with complete privacy.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <Smile className="w-4 h-4" />
            <span>Local Vibe Vault</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            Your Personal Vibe History
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-2">
            Log how you feel, identify emotional patterns, and keep your data 100% private on your own device.
          </p>
        </div>

        <MoodTracker />
      </div>
    </div>
  );
}
