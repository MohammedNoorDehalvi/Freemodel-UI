"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ShieldAlert, HeartHandshake, Smile, Wind, Lock, Info, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { InteractiveButton } from "./ui/InteractiveButton";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Spark Chat", href: "/chat", icon: HeartHandshake },
    { name: "Mood Tracker", href: "/dashboard", icon: Smile },
    { name: "Calm Space", href: "/calm", icon: Wind },
    { name: "About", href: "/about", icon: Info },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300 ${
        scrolled ? "liquid-glass shadow-2xl py-3 px-6 rounded-full" : "bg-transparent py-4 px-4"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-teal-400 p-[1px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-50/90 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-violet-600 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors">
              Teen<span className="text-violet-600">Talk</span>
            </span>
            <span className="text-[10px] text-violet-700/70 tracking-wider uppercase font-medium">Anonymous AI Companion</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-black/5 border border-black/10 rounded-full px-4 py-1.5 backdrop-blur-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-violet-600/10 text-violet-800 border border-violet-400/30 shadow-inner"
                    : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-violet-700" : "text-slate-500"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <InteractiveButton
            href="/crisis"
            variant="danger"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS Crisis</span>
          </InteractiveButton>

          <InteractiveButton
            href="/chat"
            variant="primary"
            size="sm"
            className="hidden sm:flex items-center gap-1.5"
          >
            <span>Talk to Spark</span>
            <Sparkles className="w-3.5 h-3.5" />
          </InteractiveButton>
        </div>
      </div>
    </header>
  );
}
