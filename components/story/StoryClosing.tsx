"use client";

import React from "react";
import { HankoStamp, WashiTape, SumiSplatter } from "./HandDrawnElements";
import { soundEngine } from "@/lib/audio";

export default function StoryClosing({
  onReturnToTop,
}: {
  onReturnToTop?: () => void;
}) {
  const handleReturn = () => {
    soundEngine?.triggerBladeRing(0.8);
    if (onReturnToTop) {
      onReturnToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-28 md:py-44 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-neutral-400/40">
      {/* Chapter Indicator */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-emerald-900 font-bold bg-emerald-950/15 px-2.5 py-1 rounded-[2px]">
            CHAPTER 10 · EPILOGUE
          </span>
          <span className="w-8 h-[1px] bg-neutral-400" />
          <span className="text-sm font-serif font-bold text-neutral-700 tracking-widest">
            現在 · 大剣豪
          </span>
        </div>

        <h2
          className="text-5xl md:text-7xl text-[#141d17] tracking-tight mb-4"
          style={{ fontFamily: '"Avatar Airbender", serif' }}
        >
          Roronoa Zoro Today
        </h2>

        <p className="text-xs md:text-sm font-mono tracking-[0.28em] text-neutral-600 uppercase max-w-xl">
          The name that will reach the heavens · Master of the Three Sword Style
        </p>
      </div>

      {/* Heroic Climax Illustration */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="group relative max-w-4xl w-full p-3.5 sm:p-6 bg-[#fbf8f2] rounded-[2px] shadow-[0_35px_80px_-20px_rgba(45,35,25,0.4)]">
          {/* Washi Tape */}
          <WashiTape className="absolute -top-3.5 left-16 z-20" angle={-2} />
          <WashiTape className="absolute -top-3.5 right-16 z-20" angle={3} />

          {/* Sumi-e Splatters */}
          <SumiSplatter
            variant={3}
            className="absolute -bottom-10 -left-10 w-32 h-32 opacity-70 z-20"
          />
          <SumiSplatter
            variant={2}
            className="absolute -top-10 -right-10 w-28 h-28 opacity-60 z-20"
          />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-[#1a201b]">
            <img
              src="/zoro-pic/10-zoro-today.jpg"
              alt="Roronoa Zoro today as the legendary master swordsman"
              className="w-full h-full object-cover filter contrast-[1.03]"
              loading="lazy"
            />
          </div>

          <div className="pt-3 px-1 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>CHRONICLE X · FINAL PLATE · THE KING OF HELL</span>
            <span className="text-emerald-800 font-bold">三刀流剣聖</span>
          </div>
        </div>

        {/* Narrative Synthesis */}
        <div className="mt-14 max-w-2xl text-center flex flex-col items-center">
          <p className="font-serif text-lg sm:text-xl text-neutral-800 leading-relaxed mb-8">
            Two thousand and one duels in a quiet East Blue dojo. A celestial promise sealed with tears. An unbreakable vow forged in blood beneath the executioner&apos;s cross in Shells Town.
          </p>

          <p className="font-serif text-base sm:text-lg text-neutral-700 leading-relaxed mb-10">
            Today, Roronoa Zoro stands as a supreme master swordsman of the Grand Line—ready to challenge Dracule Mihawk once more, crown Monkey D. Luffy as King of the Pirates, and make good on the promise he made to Kuina under the moonlit sky.
          </p>

          {/* Hanko Group */}
          <div className="flex items-center gap-6 mb-12">
            <HankoStamp text={"世界\n一"} subText="GREATEST" size="md" rotation={-3} />
            <HankoStamp text={"海賊\n狩り"} subText="PIRATE HUNTER" size="md" rotation={2} />
            <HankoStamp text={"閻王\n大成"} subText="KING OF HELL" size="md" rotation={-1} />
          </div>

          {/* Loop Return CTA Button styled with authentic Sumi-e Paint Stroke */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleReturn}
              className="group relative cursor-pointer flex items-center justify-center w-[320px] md:w-[390px] h-[68px] md:h-[82px] transition-all duration-300 active:scale-95"
              title="Return to the beginning of the interactive experience"
            >
              {/* Paint Stroke Image */}
              <img
                src="/paint-strok.png"
                alt="Paint stroke"
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none transition-all duration-300 filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_0_30px_rgba(43,248,160,0.85)] group-hover:scale-[1.04]"
              />

              {/* Button Text */}
              <span
                className="relative z-10 text-zinc-100 group-hover:text-emerald-300 font-mono text-xs md:text-sm tracking-[0.32em] uppercase font-bold transition-colors duration-300 pl-1 select-none"
                style={{
                  textShadow:
                    "0 2px 8px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 1)",
                }}
              >
                RETURN TO HERO SCROLL ↑
              </span>
            </button>

            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
              EXPLORE THE FRAME-BY-FRAME CINEMATIC HERO
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

