"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Smile, Calendar, TrendingUp, Flame, Plus, ShieldCheck, Trash2 } from "lucide-react";

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  emoji: string;
  note: string;
  triggers: string[];
  level: number; // 1 to 5
}

const MOOD_OPTIONS = [
  { label: "Great", emoji: "✨", level: 5, color: "from-emerald-100 to-teal-100 border-emerald-200 text-emerald-700" },
  { label: "Chill", emoji: "😌", level: 4, color: "from-blue-100 to-cyan-100 border-blue-200 text-blue-700" },
  { label: "Meh", emoji: "😐", level: 3, color: "from-slate-100 to-gray-100 border-slate-200 text-slate-700" },
  { label: "Stressed", emoji: "😰", level: 2, color: "from-amber-100 to-orange-100 border-amber-200 text-amber-700" },
  { label: "Overwhelmed", emoji: "🌧️", level: 1, color: "from-rose-100 to-violet-100 border-rose-200 text-rose-700" },
];

const TRIGGER_TAGS = ["School", "Friends", "Family", "Sleep", "Social Media", "Exams", "Health", "Future"];

export function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<typeof MOOD_OPTIONS[0] | null>(null);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [note, setNote] = useState("");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("teentalk_mood_logs");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse mood logs", e);
      }
    }
  }, []);

  const saveEntriesToStorage = (newEntries: MoodEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem("teentalk_mood_logs", JSON.stringify(newEntries));
  };

  const handleAddMood = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      mood: selectedMood.label,
      emoji: selectedMood.emoji,
      level: selectedMood.level,
      note: note.trim(),
      triggers: selectedTriggers,
    };

    const updated = [newEntry, ...entries];
    saveEntriesToStorage(updated);
    setSelectedMood(null);
    setSelectedTriggers([]);
    setNote("");
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    saveEntriesToStorage(updated);
  };

  const toggleTrigger = (tag: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Streak calculation
  const streakDays = entries.length > 0 ? entries.length : 0;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Top Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="liquid-glass rounded-3xl p-6 border border-black/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-600">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-2xl font-display font-bold text-slate-900">{streakDays} Check-ins</h4>
            <p className="text-xs text-slate-600">Total Vibe Logs Recorded</p>
          </div>
        </div>

        <div className="liquid-glass rounded-3xl p-6 border border-black/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl font-display font-bold text-slate-900">Local Vault</h4>
            <p className="text-xs text-slate-600">Zero Server Data Transfer</p>
          </div>
        </div>

        <div className="liquid-glass rounded-3xl p-6 border border-black/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl font-display font-bold text-slate-900">
              {entries.length > 0 ? entries[0].emoji + " " + entries[0].mood : "No Logs Yet"}
            </h4>
            <p className="text-xs text-slate-600">Latest Recorded Vibe</p>
          </div>
        </div>
      </div>

      {/* Log Mood Section */}
      <div className="liquid-glass rounded-3xl p-8 border border-black/10 flex flex-col gap-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-2xl text-slate-900">How are you feeling right now?</h3>
            <p className="text-xs text-slate-600">Select your current vibe to track emotional patterns over time.</p>
          </div>
        </div>

        {/* Mood Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {MOOD_OPTIONS.map((option) => {
            const isSelected = selectedMood?.label === option.label;
            return (
              <button
                key={option.label}
                onClick={() => setSelectedMood(option)}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-b " + option.color + " scale-105 shadow-xl"
                    : "bg-black/5 hover:bg-black/10 border-black/10 text-slate-600"
                }`}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span className={`font-display font-bold text-xs ${isSelected ? "text-slate-900" : "text-slate-600"}`}>{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Optional Triggers & Notes */}
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-col gap-4 border-t border-black/10 pt-6"
          >
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-2 block">
                What influenced your vibe today? (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {TRIGGER_TAGS.map((tag) => {
                  const isTagged = selectedTriggers.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTrigger(tag)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isTagged
                          ? "bg-violet-600 text-white border border-violet-600"
                          : "bg-black/5 hover:bg-black/10 text-slate-600 border border-black/10"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 mb-2 block">
                Add a private note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. 'Turned in my biology project! Feeling relieved.'"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>

            <button
              onClick={handleAddMood}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 font-display font-bold text-sm text-white shadow-xl shadow-violet-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Save Vibe Entry</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Mood History List */}
      <div className="liquid-glass rounded-3xl p-8 border border-black/10 flex flex-col gap-6">
        <h3 className="font-display font-bold text-xl text-slate-900">Your Recent Vibe History</h3>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            <Smile className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <p>No mood logs yet. Choose how you feel above to log your first vibe!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-between gap-4 hover:border-violet-400/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl p-2 rounded-xl bg-white/50 border border-black/5">{entry.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-sm text-slate-900">{entry.mood}</h4>
                      <span className="text-[10px] text-slate-500">{entry.date}</span>
                    </div>
                    {entry.note && <p className="text-xs text-slate-600 mt-0.5">{entry.note}</p>}
                    {entry.triggers.length > 0 && (
                      <div className="flex gap-1.5 mt-2">
                        {entry.triggers.map((t) => (
                          <span key={t} className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full border border-violet-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
