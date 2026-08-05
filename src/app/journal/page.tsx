import { Sparkles, PenLine, Download, Lock } from "lucide-react";

export const metadata = {
  title: "Interactive Journal | TeenTalk",
  description: "A private, 3D interactive journaling experience.",
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center overflow-hidden pt-20">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-100 to-transparent pointer-events-none" />
      
      <div className="w-full flex justify-center z-10 mb-8 mt-12">
        <div className="flex items-center gap-2 px-5 py-2.5 bg-violet-100/80 backdrop-blur-xl border border-violet-200 rounded-full shadow-sm text-violet-700">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-semibold">Your Local Private Vault</span>
        </div>
      </div>

      <div className="text-center z-10 max-w-2xl mx-auto px-6 mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-slate-900 font-extrabold tracking-tight mb-4">
          Dump your thoughts.<br />
          <span className="text-violet-600">Close the lid.</span>
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Everything typed here stays on your device. We do not track, send, or store this data anywhere else. It's completely yours.
        </p>
      </div>

      <div className="w-full max-w-4xl z-10 px-6">
        <div className="liquid-glass p-1 md:p-2 rounded-3xl border border-black/10 shadow-2xl relative bg-white overflow-hidden group">
          
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-violet-500 via-indigo-500 to-teal-500" />

          <div className="bg-slate-50 rounded-2xl p-6 md:p-10 min-h-[500px] flex flex-col border border-black/5 transition-all group-focus-within:bg-white">
            <div className="flex justify-between items-center mb-8 border-b border-black/5 pb-4">
              <div className="flex items-center gap-3 text-slate-400 font-serif italic text-sm">
                <PenLine className="w-4 h-4" />
                <span>Today's Entry...</span>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-500 text-xs font-semibold transition-colors">
                <Download className="w-3 h-3" />
                Save Locally
              </button>
            </div>
            
            <textarea 
              className="flex-1 w-full bg-transparent resize-none outline-none border-none text-lg md:text-xl font-serif text-slate-800 placeholder-slate-300 leading-relaxed"
              placeholder="What's on your mind? Just start typing..."
              autoFocus
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
