import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-violet-600/40 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
