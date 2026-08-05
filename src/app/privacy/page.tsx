import { Lock, ShieldCheck, Database, HardDrive, Cpu, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Privacy & Data Commitment | TeenTalk",
  description: "Learn how TeenTalk protects teenager privacy with local-only storage, zero accounts, and strict data safety.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <Lock className="w-4 h-4" />
            <span>Privacy First Architecture</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            Privacy & Data Security
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-2">
            We believe teenagers deserve complete peace of mind when processing their thoughts. Here is how we guarantee your privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="liquid-glass p-8 rounded-3xl border border-white/15 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">No Account Required</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              TeenTalk does not ask for your real name, email, phone number, or social media login. You open the app and instantly start using it anonymously.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-white/15 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Zero Server Chat Storage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chat messages sent to Spark are processed statelessly via Groq API and never stored in any persistent database on our servers.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-white/15 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Local-Only Mood Vault</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your mood entries stay strictly in your device&apos;s local storage (<code className="text-teal-300 bg-teal-950 px-1 py-0.5 rounded">localStorage</code>). If you clear your browser data, your mood entries disappear.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-white/15 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Rate-Limited Safety Protection</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We enforce automated session-based query limits to prevent bot abuse, excessive reliance, and ensure users take regular healthy breaks.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 rounded-3xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Medical & Emergency Disclaimer:</strong> Spark is an AI companion created for supportive active listening and simple CBT coping exercises. Spark is NOT a certified therapist, psychologist, medical doctor, or emergency service. If you are experiencing a mental health emergency, please use our <a href="/crisis" className="underline font-bold text-amber-100">Crisis Support page</a> or call 988 immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
