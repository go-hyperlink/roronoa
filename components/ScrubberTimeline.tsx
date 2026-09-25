"use client";

import React, { useRef, useState, useCallback } from "react";
import { CHAPTERS, TOTAL_FRAMES, Chapter } from "@/lib/constants";
import { soundEngine } from "@/lib/audio";

interface ScrubberTimelineProps {
  progress: number;
  onScrub: (progress: number) => void;
  onJumpToChapter: (chapter: Chapter) => void;
}

export default function ScrubberTimeline({
  progress,
  onScrub,
  onJumpToChapter,
}: ScrubberTimelineProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);

  const calculateProgressFromEvent = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return progress;
      const rect = trackRef.current.getBoundingClientRect();
      const raw = (clientX - rect.left) / rect.width;
      return Math.max(0, Math.min(1, raw));
    },
    [progress]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const newProgress = calculateProgressFromEvent(e.clientX);
    onScrub(newProgress);
    soundEngine?.triggerSwish(0.4);

    const handlePointerMove = (moveEvt: PointerEvent) => {
      const p = calculateProgressFromEvent(moveEvt.clientX);
      onScrub(p);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const p = calculateProgressFromEvent(e.clientX);
    setHoverProgress(p);
  };

  const handleMouseLeave = () => {
    setHoverProgress(null);
  };

  // Find active chapter
  const activeChapter =
    CHAPTERS.find((ch) => progress >= ch.startProgress && progress <= ch.endProgress) ||
    CHAPTERS[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 px-6 md:px-16 pb-6 pointer-events-auto select-none bg-gradient-to-t from-black/80 via-black/30 to-transparent">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        {/* Timeline Metadata row */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">
              {Math.round(progress * 100)}%
            </span>
            <span className="text-zinc-600">·</span>
            <span>TIMELINE</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="hidden sm:inline text-zinc-500">
              CLICK OR DRAG TO SCRUB
            </span>
            <span className="text-zinc-300 font-medium tracking-[0.2em] uppercase">
              {activeChapter.number}. {activeChapter.kanji}
            </span>
          </div>
        </div>

        {/* Scrubber Interactive Track */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-7 flex items-center cursor-pointer group"
        >
          {/* Track background */}
          <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden relative group-hover:h-[3px] transition-all duration-200">
            {/* Ink Progress fill */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 shadow-[0_0_12px_rgba(43,248,160,0.6)] transition-[width] duration-75 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Chapter Markers */}
          {CHAPTERS.map((ch) => {
            const markerPercent = (ch.targetFrame / TOTAL_FRAMES) * 100;
            return (
              <button
                key={ch.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onJumpToChapter(ch);
                }}
                title={`${ch.title} (${ch.kanji})`}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-emerald-500/40 bg-zinc-950 hover:scale-150 hover:bg-emerald-400 hover:border-emerald-300 transition-all duration-200 z-10"
                style={{ left: `${markerPercent}%` }}
              />
            );
          })}

          {/* Scrubber Playhead / Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(43,248,160,0.9)] border-2 border-white pointer-events-none transition-transform duration-100 ${
              isDragging ? "scale-125" : "group-hover:scale-110"
            }`}
            style={{ left: `${progress * 100}%` }}
          />

          {/* Hover Tooltip */}
          {hoverProgress !== null && !isDragging && (
            <div
              className="absolute bottom-8 -translate-x-1/2 bg-black/90 border border-emerald-500/30 px-2.5 py-1 rounded text-[10px] font-mono text-zinc-200 pointer-events-none whitespace-nowrap shadow-xl"
              style={{ left: `${hoverProgress * 100}%` }}
            >
              {Math.round(hoverProgress * 100)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
