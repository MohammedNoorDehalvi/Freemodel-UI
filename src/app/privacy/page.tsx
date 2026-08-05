import { Lock, ShieldCheck, Database, HardDrive, Cpu, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Privacy & Data Commitment | TeenTalk",
  description: "Learn how TeenTalk protects teenager privacy with local-only storage, zero accounts, and strict data safety.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-emerald-700 bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
            <Lock className="w-4 h-4" />
            <span>Privacy First Architecture</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Privacy & Data Security
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            We believe teenagers deserve complete peace of mind when processing their thoughts. Here is how we guarantee your privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="liquid-glass p-8 rounded-3xl border border-black/10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">No Account Required</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              TeenTalk does not ask for your real name, email, phone number, or social media login. You open the app and instantly start using it anonymously.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-black/10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">Zero Server Chat Storage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chat messages sent to Spark are processed statelessly via Groq API and never stored in any persistent database on our servers.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-black/10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-600">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">Local-Only Mood Vault</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your mood entries stay strictly in your device&apos;s local storage (<code className="text-teal-700 bg-teal-50 px-1 py-0.5 rounded border border-teal-200">localStorage</code>). If you clear your browser data, your mood entries disappear.
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl border border-black/10 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">Rate-Limited Safety Protection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We enforce automated session-based query limits to prevent bot abuse, excessive reliance, and ensure users take regular healthy breaks.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Medical & Emergency Disclaimer:</strong> Spark is an AI companion created for supportive active listening and simple CBT coping exercises. Spark is NOT a certified therapist, psychologist, medical doctor, or emergency service. If you are experiencing a mental health emergency, please use our <a href="/crisis" className="underline font-bold text-amber-700">Crisis Support page</a> or call 988 immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
