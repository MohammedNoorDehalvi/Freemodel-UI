import { SparkChat } from "@/components/SparkChat";
import { WavyBackground } from "@/components/ui/WavyBackground";

export const metadata = {
  title: "Spark AI Chat | TeenTalk",
  description: "Talk to Spark, your private, anonymous AI companion for emotional support, venting, and grounding steps.",
};

export default function ChatPage() {
  return (
    <WavyBackground 
      backgroundFill="white" 
      blur={10} 
      waveWidth={50} 
      waveOpacity={0.3} 
      colors={["#f3e8ff", "#e0e7ff", "#ccfbf1", "#fbcfe8", "#c7d2fe"]}
      className="max-w-4xl w-full mx-auto pb-10"
    >
      <div className="w-full relative z-10 pt-10">
        <SparkChat />
      </div>
    </WavyBackground>
  );
}
