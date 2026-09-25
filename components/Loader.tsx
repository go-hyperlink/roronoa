"use client";

import React, { useEffect, useState } from "react";
import { getSequencePreloader } from "@/lib/imageSequence";
import { TOTAL_FRAMES } from "@/lib/constants";

interface LoaderProps {
  onReady: () => void;
}

export default function Loader({ onReady }: LoaderProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const preloader = getSequencePreloader();

    const unsubscribe = preloader.subscribe((loaded) => {
      setLoadedCount(loaded);
    });

    preloader.startPreloading();

    return () => {
      unsubscribe();
    };
  }, []);

  const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  // Automatically enter the experience after 100% loaded
  useEffect(() => {
    if (percent >= 100 && !isDismissed) {
      const timer = setTimeout(() => {
        setIsDismissed(true);
        setTimeout(() => {
          onReady();
        }, 700);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [percent, isDismissed, onReady]);

  if (isDismissed) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070b09] opacity-0 pointer-events-none transition-opacity duration-700 ease-out" />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b09] text-zinc-300 p-8 select-none transition-opacity duration-700">
      {/* Background Japanese Calligraphy Watermark */}
      <div
        className="absolute text-[24vw] font-serif font-black text-emerald-400/[0.08] pointer-events-none tracking-widest"
        style={{
          fontFamily:
            '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", "Noto Serif JP", serif',
          textShadow: "0 0 35px rgba(43, 248, 160, 0.12)",
        }}
      >
        刀
      </div>

      <div className="relative flex flex-col items-center max-w-sm w-full">
        {/* Animated Sumi-e Ink Ring */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Outer faint circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-zinc-900 stroke-current"
              strokeWidth="2"
              fill="none"
            />
            {/* Ink progress circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-emerald-400 stroke-current transition-all duration-200 ease-out"
              strokeWidth="2.5"
              strokeDasharray={276.4}
              strokeDashoffset={276.4 - (276.4 * percent) / 100}
              strokeLinecap="round"
              fill="none"
              style={{
                filter: "drop-shadow(0 0 8px rgba(43, 248, 160, 0.5))",
              }}
            />
          </svg>

          {/* Center Kanji */}
          <div
            className="absolute text-xl font-serif text-emerald-400 font-bold"
            style={{
              fontFamily:
                '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", "Noto Serif JP", serif',
            }}
          >
            斬
          </div>
        </div>

        {/* Title */}
        <div className="text-[11px] font-mono tracking-[0.35em] text-zinc-400 uppercase mb-2">
          PREPARING THE ARTWORK
        </div>

        {/* Counter */}
        <div className="text-3xl font-serif tracking-[0.2em] text-zinc-100 mb-6 flex items-baseline gap-2">
          <span className="text-emerald-400 font-semibold">
            {percent}%
          </span>
          <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
            LOADED
          </span>
        </div>

        {/* Status Indicator (Automatic entry upon 100% loaded) */}
        <div className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase flex items-center gap-2.5 h-8">
          <span
            className={`w-2 h-2 rounded-full ${
              percent >= 100
                ? "bg-emerald-400 shadow-[0_0_10px_#34d399]"
                : "bg-emerald-500/60 animate-ping"
            }`}
          />
          <span>
            {percent >= 100 ? "ENTERING EXHIBITION..." : "GRINDING SUMI INK..."}
          </span>
        </div>
      </div>

      {/* Subtle Bottom Credits */}
      <div className="absolute bottom-8 text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase">
        RORONOA ZORO · SCROLL-DRIVEN EXHIBITION
      </div>
    </div>
  );
}
