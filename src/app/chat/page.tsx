import { SparkChat } from "@/components/SparkChat";

export const metadata = {
  title: "Spark AI Chat | TeenTalk",
  description: "Talk to Spark, your private, anonymous AI companion for emotional support, venting, and grounding steps.",
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">
        <SparkChat />
      </div>
    </div>
  );
}
