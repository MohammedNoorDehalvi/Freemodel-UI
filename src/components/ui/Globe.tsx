"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.95, 0.95, 1],
      markerColor: [0.5, 0.2, 1],
      glowColor: [0.9, 0.9, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5072, -0.1276], size: 0.1 },
        { location: [48.8566, 2.3522], size: 0.1 },
        { location: [35.6762, 139.6503], size: 0.1 },
        { location: [-33.8688, 151.2093], size: 0.1 },
      ],
      onRender: (state: any) => {
        state.phi = phi;
        phi += 0.005;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
        onLoad={(e) => {
          (e.target as HTMLElement).style.opacity = "1";
        }}
      />
    </div>
  );
};
