"use client";

import React from "react";
import { CHAPTERS, Chapter } from "@/lib/constants";

interface StoryOverlayProps {
  progress: number;
  onJumpToChapter?: (chapter: Chapter) => void;
  onEnterChronicles?: () => void;
}

export default function StoryOverlay({
  progress,
  onJumpToChapter,
  onEnterChronicles,
}: StoryOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-8 md:p-16 select-none">
      {/* Top spacer for navigation bar */}
      <div className="h-16" />

      {/* Dynamic Narrative Content for Each Chapter */}
      <div className="relative flex-1 flex items-center justify-center">
        {CHAPTERS.map((ch, idx) => {
          const isLastChapter = idx === CHAPTERS.length - 1;

          // Calculate chapter active range and opacity
          let opacity: number;
          let translateY: number;

          if (isLastChapter) {
            // Act V (Roronoa Zoro):
            // Fades in smoothly as user reaches Act V (from 0.84 to ~0.89)
            // and remains at full 100% opacity until the very last frame (1.0)!
            if (progress < ch.startProgress) {
              opacity = 0;
              translateY = 24;
            } else {
              opacity = Math.min(1, (progress - ch.startProgress) / 0.05);
              translateY = Math.max(0, (1 - opacity) * 24);
            }
          } else {
            // Acts I to IV: Smooth curve fading in and out between chapters
            const range = ch.endProgress - ch.startProgress;
            const center = ch.startProgress + range * 0.5;
            const dist = Math.abs(progress - center);
            const halfRange = range * 0.55;

            opacity = Math.max(0, Math.min(1, 1 - Math.pow(dist / halfRange, 2.2)));
            translateY = (progress - center) * 60;
          }

          if (opacity <= 0.01) return null;

          return (
            <div
              key={ch.id}
              className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-300 ease-out pointer-events-none"
              style={{
                opacity,
                transform: `translate3d(0, ${translateY}px, 0)`,
                filter: `blur(${(1 - opacity) * 6}px)`,
              }}
            >
              {/* Background Calligraphic Kanji Watermark in Negative Space */}
              <div
                className={`absolute font-serif font-black text-emerald-400/[0.10] leading-none pointer-events-none select-none tracking-widest -z-10 ${
                  isLastChapter
                    ? "text-[26vw] md:text-[30vw] lg:text-[32vw]"
                    : "text-[24vw] md:text-[27vw] lg:text-[29vw]"
                }`}
                style={{
                  fontFamily:
                    '"Yu Mincho", "Hiragino Mincho ProN", "MS PMincho", "Noto Serif JP", serif',
                  transform: `scale(${0.95 + opacity * 0.1})`,
                  textShadow: "0 0 35px rgba(43, 248, 160, 0.15)",
                }}
              >
                {ch.kanji}
              </div>

              {/* Clean artistic chapter narrative content */}
              <div
                className={`relative flex flex-col items-center mx-auto px-6 py-6 transition-all duration-300 ${
                  isLastChapter ? "max-w-6xl md:max-w-7xl lg:max-w-[92vw] w-full" : "max-w-4xl"
                }`}
              >
                {/* Chapter Metadata */}
                <div
                  className={`flex items-center gap-3 mb-4 text-[11px] uppercase tracking-[0.35em] font-mono ${
                    isLastChapter ? "text-emerald-950 font-bold" : "text-emerald-400"
                  }`}
                >
                  <span
                    className={`w-8 h-[1px] inline-block ${
                      isLastChapter ? "bg-emerald-950/60" : "bg-emerald-400/60"
                    }`}
                  />
                  <span>ACT {ch.number} · {ch.kanji}</span>
                  <span
                    className={`w-8 h-[1px] inline-block ${
                      isLastChapter ? "bg-emerald-950/60" : "bg-emerald-400/60"
                    }`}
                  />
                </div>

                {/* Main Headline - Extra Large for Roronoa Zoro with Avatar Airbender Font */}
                <h2
                  className={`tracking-tight leading-[1.04] mb-4 select-none ${
                    isLastChapter
                      ? "text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11.5rem] text-emerald-400 drop-shadow-[0_0_30px_rgba(43,248,160,0.55)] md:whitespace-nowrap"
                      : "text-4xl md:text-7xl lg:text-8xl text-white"
                  }`}
                  style={{
                    fontFamily:
                      '"Avatar Airbender", "Cinzel", "Cormorant Garamond", serif',
                  }}
                >
                  {ch.title}
                </h2>

                {/* Subtitle - Clean without black shadow */}
                <p
                  className={`tracking-[0.26em] uppercase mb-6 ${
                    isLastChapter
                      ? "text-sm md:text-xl font-bold text-emerald-950 max-w-2xl"
                      : "text-sm md:text-lg font-medium text-amber-300 max-w-xl"
                  }`}
                >
                  {ch.subtitle}
                </p>

                {/* Poetic Quote - Black ink color for Act V without black shadow */}
                <div
                  className={`font-serif italic leading-relaxed ${
                    isLastChapter
                      ? "max-w-xl px-6 py-2.5 text-xs md:text-base font-semibold text-black"
                      : "max-w-md px-6 py-2.5 text-xs md:text-sm text-zinc-100"
                  }`}
                >
                  &ldquo;{ch.quote}&rdquo;
                </div>

                {/* Scroll prompt on Chapter 1 */}
                {idx === 0 && (
                  <div
                    className="mt-10 flex flex-col items-center gap-3 text-zinc-200 text-[10px] tracking-[0.4em] uppercase font-mono"
                    style={{
                      textShadow: "0 2px 6px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    <span>SCROLL TO DRAW</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-emerald-400 to-transparent animate-pulse" />
                  </div>
                )}

                {/* Action buttons on Act V styled with Sumi-e Paint Stroke */}
                {isLastChapter && (
                  <div className="mt-8 pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* Return to start */}
                    <button
                      onClick={() => onJumpToChapter?.(CHAPTERS[0])}
                      className="group relative cursor-pointer flex items-center justify-center w-[270px] md:w-[310px] h-[60px] md:h-[70px] transition-all duration-300 active:scale-95"
                      title="Return to Chapter 1"
                    >
                      <img
                        src="/paint-strok.png"
                        alt="Paint stroke"
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-all duration-300 filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_0_25px_rgba(43,248,160,0.75)] group-hover:scale-[1.04]"
                      />
                      <span
                        className="relative z-10 text-zinc-100 group-hover:text-emerald-300 font-mono text-xs md:text-sm tracking-[0.28em] uppercase font-bold transition-colors duration-300 pl-1 select-none"
                        style={{
                          textShadow:
                            "0 2px 8px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 1)",
                        }}
                      >
                        RETURN TO START ↑
                      </span>
                    </button>

                    {/* Enter chronicles */}
                    <button
                      onClick={onEnterChronicles}
                      className="group relative cursor-pointer flex items-center justify-center w-[270px] md:w-[310px] h-[60px] md:h-[70px] transition-all duration-300 active:scale-95"
                      title="Enter the Life Story Chronicles"
                    >
                      <img
                        src="/paint-strok.png"
                        alt="Paint stroke"
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-all duration-300 filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_0_25px_rgba(43,248,160,0.85)] group-hover:scale-[1.04]"
                      />
                      <span
                        className="relative z-10 text-emerald-300 group-hover:text-white font-mono text-xs md:text-sm tracking-[0.28em] uppercase font-bold transition-colors duration-300 pl-1 select-none"
                        style={{
                          textShadow:
                            "0 2px 8px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 1)",
                        }}
                      >
                        ENTER CHRONICLES ↓
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacer for scrubber */}
      <div className="h-16" />
    </div>
  );
}
