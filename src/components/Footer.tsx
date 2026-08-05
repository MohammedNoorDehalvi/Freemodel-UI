import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, Lock, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-white/10 pt-16 pb-12 backdrop-blur-2xl relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Brand & Purpose */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/30 border border-violet-400/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet-300" />
            </div>
            <span className="font-display font-bold text-2xl text-white">TeenTalk</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A safe, anonymous, and calming AI companion designed for teenagers to vent thoughts, track vibes, and find inner peace without judgment.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-[11px] font-medium w-fit">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero Account Required • Local Storage Only</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Explore</h4>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li><Link href="/" className="hover:text-violet-300 transition-colors">Home Narrative</Link></li>
            <li><Link href="/chat" className="hover:text-violet-300 transition-colors">Spark AI Chat</Link></li>
            <li><Link href="/dashboard" className="hover:text-violet-300 transition-colors">Mood & Vibe Tracker</Link></li>
            <li><Link href="/calm" className="hover:text-violet-300 transition-colors">Calm & Grounding Space</Link></li>
            <li><Link href="/about" className="hover:text-violet-300 transition-colors">Our Mission</Link></li>
            <li><Link href="/faq" className="hover:text-violet-300 transition-colors">FAQ & Safety</Link></li>
          </ul>
        </div>

        {/* Privacy & Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Privacy & Safety</h4>
          <ul className="flex flex-col gap-2 text-xs text-slate-400">
            <li><Link href="/privacy" className="hover:text-violet-300 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/crisis" className="hover:text-violet-300 transition-colors">Crisis Lifelines (24/7)</Link></li>
            <li><span className="text-slate-500">Encrypted Local Storage</span></li>
            <li><span className="text-slate-500">Rate Limited AI Protection</span></li>
          </ul>
        </div>

        {/* Emergency Callout Card */}
        <div className="flex flex-col gap-3 bg-rose-950/30 border border-rose-500/20 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <PhoneCall className="w-4 h-4" />
            <span>In Immediate Crisis?</span>
          </div>
          <p className="text-[11px] text-rose-200/80 leading-normal">
            TeenTalk is an AI companion for emotional support, not a therapist or medical emergency service.
          </p>
          <div className="flex flex-col gap-1.5 mt-1">
            <a
              href="tel:988"
              className="text-xs font-bold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 py-2 px-3 rounded-lg text-center transition-all"
            >
              Call 988 Lifeline (Free & 24/7)
            </a>
            <Link
              href="/crisis"
              className="text-[11px] text-slate-300 text-center hover:underline mt-1"
            >
              View More Crisis Resources →
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} TeenTalk. Built with empathy for youth mental well-being.</p>
        <p className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Groq Llama 3.3 Powered • Strict Privacy Compliance</span>
        </p>
      </div>
    </footer>
  );
}
