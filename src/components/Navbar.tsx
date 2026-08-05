"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ShieldAlert, HeartHandshake, Smile, Wind, Lock, Info, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

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
            <div className="w-full h-full bg-slate-950/80 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-violet-300 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-violet-300 transition-colors">
              Teen<span className="text-violet-400">Talk</span>
            </span>
            <span className="text-[10px] text-violet-300/70 tracking-wider uppercase font-medium">Anonymous AI Companion</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-violet-600/40 text-white border border-violet-400/40 shadow-inner"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-violet-300" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/crisis"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 hover:border-rose-400 transition-all shadow-sm"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>SOS Crisis</span>
          </Link>

          <Link
            href="/chat"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] transition-all"
          >
            <span>Talk to Spark</span>
            <Sparkles className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
