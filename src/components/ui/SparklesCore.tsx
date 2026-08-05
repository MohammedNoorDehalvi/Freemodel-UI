"use client";
import React, { useId, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const [particles, setParticles] = useState<any[]>([]);
  const generatedId = useId();
  const particleId = id || generatedId;

  useEffect(() => {
    const density = particleDensity || 120;
    const sizeMin = minSize || 1;
    const sizeMax = maxSize || 3;
    const newParticles = Array.from({ length: density }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (sizeMax - sizeMin) + sizeMin,
      color: particleColor || "#ffffff",
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, [particleDensity, minSize, maxSize, particleColor]);

  return (
    <div
      className={cn("absolute inset-0 z-0", className)}
      style={{ background: background || "transparent" }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
