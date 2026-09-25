"use client";

import React, { useState } from "react";
import { HandDrawnArrow, HankoStamp, WashiTape, SumiSplatter } from "./HandDrawnElements";
import { soundEngine } from "@/lib/audio";

const EVOLUTION_STAGES = [
  { stage: "01", label: "ARROGANCE", kanji: "過信", desc: "Shimotsuki village prodigy believing he had reached the apex." },
  { stage: "02", label: "BARATIE DEFEAT", kanji: "敗北", desc: "A pocket knife to the chest. The terrifying realization of the world's breadth." },
  { stage: "03", label: "KURAIGANA HUMILITY", kanji: "平伏", desc: "Swallowing his warrior pride to bow before his mortal enemy." },
  { stage: "04", label: "3D2Y TRAINING", kanji: "鍛錬", desc: "Two agonizing years of blood, baboons, and Haki mastery." },
  { stage: "05", label: "SUPREME STRENGTH", kanji: "無双", desc: "A swordsman fighting not for ego, but for his captain's crown." },
];

export default function MihawkHumilitySection() {
  const [activeStage, setActiveStage] = useState(2);

  const handleStageClick = (idx: number) => {
    setActiveStage(idx);
    soundEngine?.triggerBladeRing(0.4);
  };

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-neutral-300/50">
      {/* Chapter Indicator */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-emerald-800 font-bold bg-emerald-950/10 px-2.5 py-1 rounded-[2px]">
            CHAPTER 08
          </span>
          <span className="w-8 h-[1px] bg-neutral-400" />
          <span className="text-sm font-serif font-bold text-neutral-600 tracking-widest">
            師弟と誇り
          </span>
        </div>

        <h2
          className="text-4xl md:text-6xl text-[#1a1714] tracking-tight mb-3"
          style={{ fontFamily: '"Avatar Airbender", serif' }}
        >
          Humility Before Strength
        </h2>

        <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase max-w-xl">
          The Baratie scar to Kuraigana Island: surrendering ego to surpass the apex
        </p>
      </div>

      {/* Grid: Left Evolution Diagram / Right Illustration */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Evolution Diagram */}
        <div className="lg:col-span-5 flex flex-col">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4 block">
            DIAGRAM: THE TRANSFORMATION OF A SWORDSMAN
          </span>

          <div className="flex flex-col gap-3">
            {EVOLUTION_STAGES.map((s, idx) => {
              const isSelected = idx === activeStage;
              return (
                <div
                  key={s.stage}
                  onClick={() => handleStageClick(idx)}
                  className={`p-4 rounded-[2px] border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#fcfbf7] border-neutral-800 shadow-md translate-x-2"
                      : "bg-[#eee7d8] border-neutral-300/80 hover:bg-[#e7decb] hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800">
                        {s.stage}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider font-bold text-neutral-900">
                        {s.label}
                      </span>
                    </div>
                    <span
                      className="font-serif font-bold text-neutral-500 text-sm"
                      style={{ fontFamily: '"Noto Serif JP", serif' }}
                    >
                      {s.kanji}
                    </span>
                  </div>
                  <p className="font-serif text-xs text-neutral-600 leading-normal">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-neutral-900/[0.03] border-l-2 border-neutral-700">
            <p
              className="font-serif italic text-sm text-neutral-800 leading-relaxed"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              &ldquo;When a man like you throws away his pride, it is always for the sake of someone else.&rdquo;
            </p>
            <span className="block mt-1 font-mono text-[10px] tracking-widest uppercase text-neutral-500">
              — Dracule Mihawk
            </span>
          </div>
        </div>

        {/* Right: Desk-Mounted Sketch Illustration */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative p-3 sm:p-4 bg-[#fbf8f2] rounded-[2px] shadow-[0_25px_50px_-15px_rgba(45,35,25,0.35)] max-w-[620px] w-full">
            {/* Washi Tape */}
            <WashiTape className="absolute -top-3.5 left-10 z-20" angle={-3} />
            <WashiTape className="absolute -top-3.5 right-10 z-20" angle={4} />

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-[#ebe2d0]">
              <img
                src="/zoro-pic/08-mihawk-humility.jpg"
                alt="Zoro bowing before Dracule Mihawk on Kuraigana Island"
                className="w-full h-full object-cover filter contrast-[1.02]"
                loading="lazy"
              />
            </div>

            <div className="pt-2 px-1 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              <span>FIG. 8 · THE KNEELING AT KURAIGANA CASTLE</span>
              <span className="text-neutral-400">PENCIL & SUMI-E</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <HankoStamp text={"師弟\n修業"} size="sm" rotation={-2} />
            <span
              className="text-base text-neutral-800 font-bold"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              &ldquo;To become the greatest, one must first kneel before the summit.&rdquo;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

