import { FocusCards } from "@/components/ui/FocusCards";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { LayoutGrid } from "@/components/ui/LayoutGrid";

export const metadata = {
  title: "Wellness Tools | TeenTalk",
  description: "A hub for all grounding and mindfulness tools.",
};

const cards = [
  {
    title: "Vaporize Anxiety",
    src: "https://images.unsplash.com/photo-1518241353330-0f7941c2d1b7?q=80&w=3000&auto=format&fit=crop",
    href: "/calm",
  },
  {
    title: "Deep Breathing",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3000&auto=format&fit=crop",
    href: "/calm",
  },
  {
    title: "Mood Tracker",
    src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=3000&auto=format&fit=crop",
    href: "/dashboard",
  },
  {
    title: "Interactive Journal",
    src: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=3000&auto=format&fit=crop",
    href: "/journal",
  },
  {
    title: "Spark AI Chat",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=3000&auto=format&fit=crop",
    href: "/chat",
  },
  {
    title: "Crisis Support",
    src: "https://images.unsplash.com/photo-1498677231914-50a747970dba?q=80&w=3000&auto=format&fit=crop",
    href: "/crisis",
  },
];

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Interactive Journaling</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A private, fully local vault for your thoughts. Type out what's on your mind and just close the lid. It's that simple.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Mood Tracking</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Understand your emotional baseline. Over time, you'll see patterns in your anxiety and mood fluctuations.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Spark AI</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Sometimes you just need someone to listen without giving advice. Spark is here 24/7.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Grounding Tools</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Panic attacks and anxiety spikes are tough. Our interactive 4-7-8 breathing and thought vaporizer will help you reset.
      </p>
    </div>
  );
};

const gridCards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=3000&auto=format&fit=crop",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=3000&auto=format&fit=crop",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=3000&auto=format&fit=crop",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3000&auto=format&fit=crop",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center relative pt-20 pb-40">
      <BackgroundBeams className="opacity-40" />
      
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10 px-6 mt-10">
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight">
          Wellness Hub
        </h1>
        <p className="text-sm md:text-base text-slate-600 mt-4">
          All your mindfulness, venting, and reflection tools in one place.
        </p>
      </div>

      <div className="w-full relative z-10 px-4 md:px-0 mb-32">
        <FocusCards cards={cards} />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10 relative z-10 px-6">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
          Deep Dive Features
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Click any card to learn more about how TeenTalk helps.
        </p>
      </div>

      <div className="w-full h-screen relative z-10">
        <LayoutGrid cards={gridCards} />
      </div>
    </div>
  );
}
