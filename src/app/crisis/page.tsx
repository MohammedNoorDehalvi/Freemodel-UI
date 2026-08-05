"use client";

import { useState } from "react";
import { ShieldAlert, PhoneCall, MessageSquare, HeartHandshake, Globe, AlertTriangle, X, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LampContainer } from "@/components/ui/LampEffect";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const CRISIS_RESOURCES = [
  {
    title: "Kiran Mental Health Helpline",
    desc: "24/7 toll-free helpline by the Ministry of Social Justice and Empowerment for mental health support.",
    phone: "1800-599-0019",
    region: "India",
    badge: "Govt 24/7 Helpline",
  },
  {
    title: "Vandrevala Foundation",
    desc: "Free 24/7 mental health crisis and suicide prevention helpline.",
    phone: "9999 666 555",
    sms: "9999666555",
    smsKeyword: "HELP",
    region: "India",
    badge: "24/7 Support",
  },
  {
    title: "AASRA",
    desc: "24x7 helpline for emotional distress and suicide prevention.",
    phone: "9820466726",
    region: "India",
    badge: "24/7 Hotline",
  },
  {
    title: "Snehi",
    desc: "Specialized helpline for children, adolescents, and adults facing emotional crisis.",
    phone: "011-26522021",
    region: "India",
    badge: "Emotional Support",
  },
];

export default function CrisisPage() {
  const [sosActive, setSosActive] = useState(false);
  const [groundingStep, setGroundingStep] = useState(1);

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center relative overflow-hidden">
      {/* Red Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 flex flex-col gap-10">

        <LampContainer className="py-20 -mt-20 z-0">
          <div className="text-center max-w-2xl mx-auto pt-10">
            <div className="flex items-center justify-center gap-2 text-rose-700 bg-rose-100 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mx-auto mb-3">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Immediate Help & Support</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
              You Are Not Alone.
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
              If you are in immediate physical danger, feeling overwhelmed by self-harm thoughts, or in severe distress, please connect with these free, confidential, 24/7 resources right now.
            </p>
          </div>
        </LampContainer>

        {/* SOS Grounding Mode Banner */}
        <div className="liquid-glass-glow p-8 rounded-3xl border border-rose-200 bg-rose-50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">Feeling an Intense Panic Attack?</h3>
              <p className="text-xs text-slate-600">Tap for instant full-screen sensory grounding instructions to get calm right now.</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSosActive(true);
              setGroundingStep(1);
            }}
            className="px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/20 shrink-0 transition-all hover:scale-105"
          >
            Launch Grounding SOS Mode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRISIS_RESOURCES.map((resource) => (
            <CardContainer key={resource.id} className="w-full">
              <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-rose-500/[0.1] border-black/[0.1] w-full h-auto rounded-xl p-6 border liquid-glass">
                <CardItem
                  translateZ="50"
                  className="flex items-center gap-3 mb-4 w-full justify-between"
                >
                  <h3 className="font-display font-bold text-lg text-slate-900">{resource.title}</h3>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-widest shrink-0">
                    {resource.badge}
                  </span>
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-sm text-slate-600 mb-6 line-clamp-4"
                >
                  {resource.desc}
                </CardItem>
                <CardItem
                  translateZ="80"
                  className="flex flex-col gap-3 w-full"
                >
                  {resource.phone ? (
                    <a
                      href={`tel:${resource.phone}`}
                      className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Call {resource.phone}
                    </a>
                  ) : null}
                  {resource.sms ? (
                    <a
                      href={`sms:${resource.sms}`}
                      className="w-full py-3 rounded-full bg-slate-100 text-slate-900 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors border border-slate-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Text {resource.sms}
                    </a>
                  ) : null}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      {/* Grounding SOS Full Screen Modal */}
      <AnimatePresence>
        {sosActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setSosActive(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-black/5 hover:bg-black/10 text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-xl w-full text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-200 flex items-center justify-center text-rose-600 animate-pulse">
                <HeartHandshake className="w-8 h-8" />
              </div>

              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-widest">
                5-4-3-2-1 Sensory Grounding
              </span>

              {groundingStep === 1 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-display font-extrabold text-3xl text-slate-900">
                    Step 1: Look around you
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Name <span className="text-rose-600 font-bold text-lg">5 things</span> you can see right now in your room. (e.g. your desk, a lamp, your shoes, a window, a book).
                  </p>
                </div>
              )}

              {groundingStep === 2 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-display font-extrabold text-3xl text-slate-900">
                    Step 2: Feel your surroundings
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Notice <span className="text-violet-600 font-bold text-lg">4 things</span> you can physically feel. (e.g. your feet on the floor, your chair, the fabric of your clothes).
                  </p>
                </div>
              )}

              {groundingStep === 3 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-display font-extrabold text-3xl text-slate-900">
                    Step 3: Listen closely
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Identify <span className="text-teal-600 font-bold text-lg">3 sounds</span> around you. (e.g. hum of a fan, distant cars, your own breathing).
                  </p>
                </div>
              )}

              {groundingStep === 4 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-display font-extrabold text-3xl text-slate-900">
                    Step 4: Take a slow breath
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Breathe in for 4 seconds... hold for 4... and release. You are safe in this moment.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4 mt-6">
                {groundingStep < 4 ? (
                  <button
                    onClick={() => setGroundingStep((s) => s + 1)}
                    className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 font-display font-bold text-sm text-white shadow-xl shadow-rose-600/40 transition-all"
                  >
                    Next Grounding Step →
                  </button>
                ) : (
                  <button
                    onClick={() => setSosActive(false)}
                    className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 font-display font-bold text-sm text-white shadow-xl shadow-emerald-600/40 transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>I Feel Grounded Now</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
