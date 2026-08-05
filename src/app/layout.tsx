import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RobotAssistant } from "@/components/RobotAssistant";
import { MagicCursor } from "@/components/ui/MagicCursor";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradientAnimation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "TeenTalk | Anonymous AI Companion & Well-being Sanctuary for Teenagers",
  description: "A private, safe, and soothing space for teenagers to vent thoughts, track moods locally, practice calm exercises, and access instant crisis support.",
  keywords: ["teen mental health", "AI companion for teens", "anonymous venting app", "mood tracker", "calm exercises", "crisis lifelines"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col cursor-none`}>
        <MagicCursor />
        <BackgroundGradientAnimation containerClassName="!fixed inset-0 z-[-2]" interactive={false} />
        <Navbar />
        <main className="flex-1 w-full pt-20">
          {children}
        </main>
        <Footer />
        <RobotAssistant />
        <FloatingDock />
      </body>
    </html>
  );
}
