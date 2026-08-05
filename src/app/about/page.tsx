import { Info, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { Globe } from "@/components/ui/Globe";

export const metadata = {
  title: "About TeenTalk | Mission & Vision",
  description: "Learn why TeenTalk was created as a calm, safe AI sanctuary for youth mental well-being.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <TracingBeam className="px-6">
        <div className="w-full max-w-4xl relative z-10 flex flex-col gap-10">
          <div className="text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-violet-700 bg-violet-100 border border-violet-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <Info className="w-4 h-4" />
            <span>Our Mission</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
            About TeenTalk
          </h1>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Giving every teenager a gentle, zero-judgment space to express themselves, untangle thoughts, and find calm when life gets loud.
          </p>
        </div>

        <div className="liquid-glass p-10 rounded-3xl border border-black/10 flex flex-col gap-6 text-sm text-slate-700 leading-relaxed shadow-2xl">
          <h2 className="font-display font-bold text-2xl text-slate-900">Why TeenTalk Exists</h2>
          <p>
            Being a teenager today comes with unique pressures—academic stress, social expectations, identity questions, and constant digital noise. Too often, teens keep their worries bottled up because they fear being misunderstood, judged, or burdening loved ones.
          </p>
          <p>
            TeenTalk was built to bridge that gap. We designed Spark AI as a gentle, empathetic sounding board that validates feelings first, offers light Cognitive Behavioral Therapy (CBT) grounding steps, and never preaches or lectures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 border-t border-b border-black/10 py-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-display font-bold text-slate-900 text-base">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <span>Empathetic AI</span>
              </div>
              <p className="text-xs text-slate-600">Warm active listening powered by Groq Llama 3.3 model.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-display font-bold text-slate-900 text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Safety Guardrails</span>
              </div>
              <p className="text-xs text-slate-600">Automated crisis redirection and strict boundary protections.</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-display font-bold text-slate-900 text-base">
                <HeartHandshake className="w-5 h-5 text-teal-600" />
                <span>Zero Judgment</span>
              </div>
              <p className="text-xs text-slate-600">An anonymous sanctuary with zero pressure or judgment.</p>
            </div>
          </div>
          
          {/* Globe Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-black/10 mt-6">
            <div className="flex flex-col gap-4 max-w-sm">
              <h3 className="font-display font-bold text-2xl text-slate-900">A Global Sanctuary</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you're in New York, London, or Tokyo, TeenTalk is accessible everywhere. A quiet, safe space for teens around the world to find balance.
              </p>
            </div>
            <div className="w-full max-w-[300px] h-[300px]">
              <Globe />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-4 border-t border-black/5">
            <Link
              href="/chat"
              className="px-6 py-3 rounded-full font-display font-bold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg transition-all"
            >
              Experience Spark AI →
            </Link>
            <Link
              href="/crisis"
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              Need Immediate Emergency Help?
            </Link>
          </div>
          </div>
        </div>
      </TracingBeam>
    </div>
  );
}
