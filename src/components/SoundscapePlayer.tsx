"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Disc, CloudRain, Waves, Trees, Sparkles } from "lucide-react";

interface SoundTrack {
  id: string;
  name: string;
  desc: string;
  icon: any;
  color: string;
  type: "rain" | "waves" | "forest" | "drone";
}

const TRACKS: SoundTrack[] = [
  { id: "rain", name: "Soft Raindrops", desc: "Gentle patter on liquid glass", icon: CloudRain, color: "from-blue-500/20 to-teal-500/20", type: "rain" },
  { id: "waves", name: "Ocean Swells", desc: "Slow rhythmic tide roll", icon: Waves, color: "from-indigo-500/20 to-cyan-500/20", type: "waves" },
  { id: "forest", name: "Night Forest", desc: "Soothing nocturnal whispers", icon: Trees, color: "from-emerald-500/20 to-teal-500/20", type: "forest" },
  { id: "drone", name: "432 Hz Calm Drone", desc: "Harmonic restorative tone", icon: Sparkles, color: "from-violet-500/20 to-purple-500/20", type: "drone" },
];

export function SoundscapePlayer() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ gain?: GainNode; source?: any; stop?: () => void }>({});

  const stopAudio = () => {
    if (activeNodesRef.current.stop) {
      activeNodesRef.current.stop();
    }
    activeNodesRef.current = {};
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setActiveTrack(null);
  };

  const playTrack = (track: SoundTrack) => {
    if (activeTrack === track.id) {
      stopAudio();
      return;
    }

    stopAudio();

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (track.type === "drone") {
      // 432Hz Harmonic Sine Drone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.frequency.setValueAtTime(432, ctx.currentTime);
      osc2.frequency.setValueAtTime(216, ctx.currentTime);
      osc1.type = "sine";
      osc2.type = "triangle";

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(masterGain);

      osc1.start();
      osc2.start();

      activeNodesRef.current = {
        gain: masterGain,
        stop: () => {
          osc1.stop();
          osc2.stop();
        },
      };
    } else {
      // Noise buffer based sounds (Rain, Waves, Forest)
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter approximation
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();

      if (track.type === "rain") {
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, ctx.currentTime);
      } else if (track.type === "waves") {
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(400, ctx.currentTime);

        // LFO for wave swelling
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8-second wave swell
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(250, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();
      } else {
        // Forest
        filter.type = "highpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
      }

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      activeNodesRef.current = {
        gain: masterGain,
        stop: () => whiteNoise.stop(),
      };
    }

    setActiveTrack(track.id);
  };

  useEffect(() => {
    if (activeNodesRef.current.gain && audioCtxRef.current) {
      activeNodesRef.current.gain.gain.setValueAtTime(isMuted ? 0 : volume, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="w-full liquid-glass rounded-3xl p-8 border border-white/15 shadow-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Disc className={`w-5 h-5 ${activeTrack ? "animate-spin" : ""}`} />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">Ambient Soundscapes</h3>
            <p className="text-xs text-slate-300">Generative procedural audio for focus & calm</p>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-300 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-teal-300" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 accent-teal-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Grid of Soundscapes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TRACKS.map((track) => {
          const Icon = track.icon;
          const isPlaying = activeTrack === track.id;
          return (
            <button
              key={track.id}
              onClick={() => playTrack(track)}
              className={`p-5 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                isPlaying
                  ? "bg-gradient-to-r " + track.color + " border-white/30 shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 hover:bg-white/10 border-white/10"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`p-3 rounded-xl ${isPlaying ? "bg-white/20 text-white" : "bg-white/5 text-slate-300"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-violet-300 transition-colors">
                    {track.name}
                  </h4>
                  <p className="text-xs text-slate-400">{track.desc}</p>
                </div>
              </div>

              <div className={`p-2.5 rounded-full ${isPlaying ? "bg-white text-slate-900" : "bg-white/10 text-slate-300"}`}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
