"use client";

import React from "react";
import { CHAPTERS, Chapter } from "@/lib/constants";
import { soundEngine } from "@/lib/audio";

interface NavigationProps {
  progress: number;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onJumpToChapter: (chapter: Chapter) => void;
  isPastHero?: boolean;
  onJumpToStory?: () => void;
}

export default function Navigation({
  progress,
  reducedMotion,
  onToggleReducedMotion,
  onJumpToChapter,
  isPastHero = false,
  onJumpToStory,
}: NavigationProps) {
  const [isMuted, setIsMuted] = React.useState(true);

  const handleToggleSound = () => {
    if (soundEngine) {
      const muted = soundEngine.toggleMute();
      setIsMuted(muted);
    }
  };

  // Find active chapter based on progress
  const activeChapter =
    CHAPTERS.find((ch) => progress >= ch.startProgress && progress <= ch.endProgress) ||
    CHAPTERS[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 md:py-5 text-zinc-300 pointer-events-auto bg-gradient-to-b from-black/75 via-black/35 to-transparent backdrop-blur-[3px] transition-colors duration-300">
      {/* Brand / Character Title */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-3 select-none text-left cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(43,248,160,0.8)] animate-pulse" />
        <div className="flex flex-col">
          <span
            className="text-xs md:text-sm tracking-[0.28em] text-zinc-100 uppercase group-hover:text-emerald-300 transition-colors"
            style={{ fontFamily: '"Avatar Airbender", serif' }}
          >
            Roronoa Zoro
          </span>
          <span className="text-[9px] font-mono tracking-[0.2em] text-emerald-400/80 -mt-0.5">
            ロロノア・ゾロ
          </span>
        </div>
      </button>

      {/* Chapters Quick Jump */}
      <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono tracking-[0.22em] uppercase">
        {CHAPTERS.map((ch) => {
          const isActive = !isPastHero && activeChapter.id === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => onJumpToChapter(ch)}
              className={`relative py-1.5 transition-colors cursor-pointer ${
                isActive ? "text-emerald-300 font-semibold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>
                {ch.number}. {ch.title.split(" ")[0]}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-emerald-500/20 shadow-[0_0_6px_rgba(43,248,160,0.6)]" />
              )}
            </button>
          );
        })}

        {/* Story Chronicles Jump Link */}
        <button
          onClick={onJumpToStory}
          className={`relative py-1.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
            isPastHero ? "text-amber-400 font-semibold" : "text-amber-300/80 hover:text-amber-200"
          }`}
        >
          <span className="text-[9px] text-amber-500 font-bold">📜</span>
          <span>CHRONICLES</span>
          {isPastHero && (
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          )}
        </button>
      </nav>

      {/* Controls — Audio and FX buttons styled with paint stroke */}
      <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-mono tracking-[0.2em] uppercase">
        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          title="Toggle Ambient Audio"
          className="group relative cursor-pointer flex items-center justify-center w-[118px] md:w-[126px] h-[34px] transition-all duration-300 active:scale-95"
        >
          {/* Authentic Sumi-e Paint Stroke Background */}
          <img
            src="/paint-strok.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_14px_rgba(43,248,160,0.7)] group-hover:scale-[1.05]"
          />

          <span className="relative z-10 flex items-center gap-1.5 text-zinc-200 group-hover:text-white transition-colors duration-200 pl-0.5 select-none font-semibold">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isMuted
                  ? "bg-zinc-500"
                  : "bg-emerald-400 shadow-[0_0_6px_rgba(43,248,160,0.8)] animate-pulse"
              }`}
            />
            <span>AUDIO {isMuted ? "OFF" : "ON"}</span>
          </span>
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={onToggleReducedMotion}
          title="Toggle Motion Effects"
          className="group relative cursor-pointer flex items-center justify-center w-[100px] md:w-[108px] h-[34px] transition-all duration-300 active:scale-95"
        >
          {/* Authentic Sumi-e Paint Stroke Background */}
          <img
            src="/paint-strok.png"
            alt=""
            aria-hidden
            className={`absolute inset-0 w-full h-full object-fill pointer-events-none select-none transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
              reducedMotion
                ? "opacity-70"
                : "group-hover:drop-shadow-[0_0_14px_rgba(43,248,160,0.7)] group-hover:scale-[1.05]"
            }`}
          />

          <span className="relative z-10 flex items-center gap-1 transition-colors duration-200 pl-0.5 select-none font-semibold">
            <span
              className={
                reducedMotion
                  ? "text-amber-300 group-hover:text-amber-200"
                  : "text-zinc-200 group-hover:text-white"
              }
            >
              FX {reducedMotion ? "LOW" : "HIGH"}
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
