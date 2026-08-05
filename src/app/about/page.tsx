import { Info, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About TeenTalk | Mission & Vision",
  description: "Learn why TeenTalk was created as a calm, safe AI sanctuary for youth mental well-being.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <Info className="w-4 h-4" />
            <span>Our Mission</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            About TeenTalk
          </h1>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            Giving every teenager a gentle, zero-judgment space to express themselves, untangle thoughts, and find calm when life gets loud.
          </p>
        </div>

        <div className="liquid-glass p-10 rounded-3xl border border-white/15 flex flex-col gap-6 text-sm text-slate-300 leading-relaxed shadow-2xl">
          <h2 className="font-display font-bold text-2xl text-white">Why TeenTalk Exists</h2>
          <p>
            Being a teenager today comes with unique pressures—academic stress, social expectations, identity questions, and constant digital noise. Too often, teens keep their worries bottled up because they fear being misunderstood, judged, or burdening loved ones.
          </p>
          <p>
            TeenTalk was built to bridge that gap. We designed Spark AI as a gentle, empathetic sounding board that validates feelings first, offers light Cognitive Behavioral Therapy (CBT) grounding steps, and never preaches or lectures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 border-t border-b border-white/10 py-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-display font-bold text-white text-base">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span>Empathetic AI</span>
              </div>
              <p className="text-xs text-slate-400">Warm active listening powered by Groq Llama 3.3 model.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-display font-bold text-white text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Safety Guardrails</span>
              </div>
              <p className="text-xs text-slate-400">Automated crisis redirection and strict boundary protections.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-display font-bold text-white text-base">
                <HeartHandshake className="w-5 h-5 text-teal-400" />
                <span>Zero Judgment</span>
              </div>
              <p className="text-xs text-slate-400">An anonymous sanctuary with zero pressure or judgment.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Link
              href="/chat"
              className="px-6 py-3 rounded-full font-display font-bold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg transition-all"
            >
              Experience Spark AI →
            </Link>
            <Link
              href="/crisis"
              className="text-xs text-rose-400 hover:underline font-semibold"
            >
              Need Immediate Emergency Help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
