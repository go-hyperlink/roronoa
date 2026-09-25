"use client";

import React, { useState } from "react";
import { HandDrawnArrow, HankoStamp, WashiTape, SumiSplatter } from "./HandDrawnElements";
import { soundEngine } from "@/lib/audio";

interface SwordDetail {
  id: "wado" | "kitetsu" | "enma";
  name: string;
  kanji: string;
  position: string;
  grade: string;
  smith: string;
  essence: string;
  colorHex: string;
  description: string;
  quote: string;
}

const SWORDS: SwordDetail[] = [
  {
    id: "wado",
    name: "Wado Ichimonji",
    kanji: "和道一文字",
    position: "In the Mouth · Teeth Clench",
    grade: "O Wazamono (21 Great Grade Blades)",
    smith: "Shimotsuki Kozaburo",
    essence: "The Oath · Soul · Purity",
    colorHex: "#e2ded4",
    description:
      "Kuina's heirloom. Zoro carries it clenched between his jaws, directly connected to his skull and breath. It has never broken and never wavered.",
    quote: "Her spirit cuts through whatever stands before us.",
  },
  {
    id: "kitetsu",
    name: "Sandai Kitetsu",
    kanji: "三代鬼徹",
    position: "Right Hand · Dominant Lead",
    grade: "Wazamono (Grade Blade)",
    smith: "Tenguyama Hitetsu",
    essence: "The Curse · Bloodlust · Instinct",
    colorHex: "#dc2626",
    description:
      "Tossed in the air in Loguetown to test his luck against its blood curse. A bloodthirsty blade that hungers to cut even without its master's intent.",
    quote: "A problem child sword with an appetite for slaughter.",
  },
  {
    id: "enma",
    name: "Enma",
    kanji: "閻魔",
    position: "Left Hand · Conqueror Arm",
    grade: "O Wazamono (21 Great Grade Blades)",
    smith: "Shimotsuki Kozaburo",
    essence: "The King of Hell · Ryuo Drainage",
    colorHex: "#10b981",
    description:
      "Entrusted by Kozuki Hiyori in exchange for Shusui. It violently forces out the wielder's Haki in torrential flame waves, capable of slicing the bottom of hell.",
    quote: "If you don't master it, it drains you till you shrivel.",
  },
];

export default function SantoryuDiagram() {
  const [selectedSword, setSelectedSword] = useState<SwordDetail>(SWORDS[0]);

  const handleSelect = (sword: SwordDetail) => {
    setSelectedSword(sword);
    soundEngine?.triggerBladeRing(0.7);
  };

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-neutral-300/50">
      {/* Background Watermark */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-[16vw] font-serif font-black text-black/[0.03] leading-none pointer-events-none select-none z-0"
        style={{ fontFamily: '"Noto Serif JP", serif' }}
      >
        三刀流
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        {/* Chapter Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-emerald-800 font-bold bg-emerald-950/10 px-2.5 py-1 rounded-[2px]">
            CHAPTER 03
          </span>
          <span className="w-8 h-[1px] bg-neutral-400" />
          <span className="text-sm font-serif font-bold text-neutral-600 tracking-widest">
            三刀流解剖図
          </span>
        </div>

        <h2
          className="text-4xl md:text-6xl text-[#1a1714] tracking-tight mb-3"
          style={{ fontFamily: '"Avatar Airbender", serif' }}
        >
          Santoryu — Anatomy of Three Blades
        </h2>

        <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase max-w-xl">
          Swordsmith diagram & mechanical stance breakdown
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Swordsmith Illustration */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative p-3 sm:p-4 bg-[#fbf8f2] rounded-[2px] shadow-[0_25px_50px_-15px_rgba(45,35,25,0.3)] max-w-[620px] w-full">
            {/* Washi tape accents */}
            <WashiTape className="absolute -top-3 left-10 z-20" angle={-3} />
            <WashiTape className="absolute -top-3 right-10 z-20" angle={4} />

            {/* Main Illustration */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-[#ebe2d0]">
              <img
                src="/zoro-pic/03-santoryu.jpg"
                alt="Santoryu three swords anatomical diagram"
                className="w-full h-full object-cover filter contrast-[1.02]"
                loading="lazy"
              />

              {/* Hand-drawn Callout Pins on Image */}
              <button
                onClick={() => handleSelect(SWORDS[0])}
                className={`absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedSword.id === "wado"
                    ? "bg-white text-neutral-900 ring-4 ring-emerald-500 scale-125 shadow-lg"
                    : "bg-white/80 text-neutral-800 hover:scale-110"
                }`}
                title="Wado Ichimonji (Mouth)"
              >
                <span className="font-mono text-xs font-black">1</span>
              </button>

              <button
                onClick={() => handleSelect(SWORDS[1])}
                className={`absolute top-[48%] right-[22%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedSword.id === "kitetsu"
                    ? "bg-red-700 text-white ring-4 ring-red-400 scale-125 shadow-lg"
                    : "bg-red-800/80 text-white hover:scale-110"
                }`}
                title="Sandai Kitetsu (Right Hand)"
              >
                <span className="font-mono text-xs font-black">2</span>
              </button>

              <button
                onClick={() => handleSelect(SWORDS[2])}
                className={`absolute top-[65%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                  selectedSword.id === "enma"
                    ? "bg-emerald-700 text-white ring-4 ring-emerald-300 scale-125 shadow-lg"
                    : "bg-emerald-800/80 text-white hover:scale-110"
                }`}
                title="Enma (Left Hand)"
              >
                <span className="font-mono text-xs font-black">3</span>
              </button>
            </div>

            {/* Caption */}
            <div className="pt-2 px-1 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              <span>FIG. 3 · THREE BLADE TRIANGULATION</span>
              <span className="text-emerald-700 font-bold">CLICK NODES TO INSPECT</span>
            </div>
          </div>

          {/* Hand-written memo underneath */}
          <div className="mt-4 flex items-center gap-2 text-neutral-700 max-w-md text-center">
            <span
              className="text-base font-bold"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              &ldquo;Three swords aren&apos;t just three weapons. They are spirit, instinct, and raw willpower woven into one strike.&rdquo;
            </span>
          </div>
        </div>

        {/* Right: Interactive Blade Dossier */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Sword Selector Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#ebe3d2] rounded-[3px] mb-6 shadow-inner">
            {SWORDS.map((sword) => {
              const isSelected = selectedSword.id === sword.id;
              return (
                <button
                  key={sword.id}
                  onClick={() => handleSelect(sword)}
                  className={`flex-1 py-2 px-2 text-xs font-mono tracking-[0.15em] uppercase rounded-[2px] transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#fcfaf5] text-neutral-950 font-bold shadow-sm"
                      : "text-neutral-600 hover:text-neutral-950 hover:bg-[#f5ecdc]"
                  }`}
                >
                  {sword.name.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Selected Blade Card */}
          <div className="p-6 md:p-8 bg-[#fdfcf9] rounded-[2px] border border-neutral-300/80 shadow-[0_10px_30px_-10px_rgba(45,35,25,0.15)] relative">
            {/* Top metadata */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-emerald-800 font-semibold">
                {selectedSword.position}
              </span>
              <span
                className="text-lg font-serif font-black text-neutral-800"
                style={{ fontFamily: '"Noto Serif JP", serif' }}
              >
                {selectedSword.kanji}
              </span>
            </div>

            {/* Sword Title */}
            <h3
              className="text-3xl text-neutral-950 mb-2"
              style={{ fontFamily: '"Avatar Airbender", serif' }}
            >
              {selectedSword.name}
            </h3>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 my-3 border-y border-neutral-200 text-xs font-mono">
              <div>
                <span className="text-neutral-400 block tracking-wider">GRADE:</span>
                <span className="text-neutral-800 font-semibold">{selectedSword.grade}</span>
              </div>
              <div>
                <span className="text-neutral-400 block tracking-wider">SMITH:</span>
                <span className="text-neutral-800 font-semibold">{selectedSword.smith}</span>
              </div>
              <div className="col-span-2">
                <span className="text-neutral-400 block tracking-wider">DOMAIN:</span>
                <span className="text-neutral-800 font-semibold">{selectedSword.essence}</span>
              </div>
            </div>

            {/* Description */}
            <p className="font-serif text-sm md:text-base text-neutral-700 leading-relaxed mb-6">
              {selectedSword.description}
            </p>

            {/* Quote */}
            <div className="p-3 bg-neutral-100/70 border-l-2 border-emerald-600 rounded-r-[2px]">
              <p
                className="font-serif italic text-xs md:text-sm text-neutral-800"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                &ldquo;{selectedSword.quote}&rdquo;
              </p>
            </div>

            {/* Japanese Hanko stamp */}
            <div className="mt-6 flex justify-end">
              <HankoStamp
                text={selectedSword.kanji}
                subText="名刀"
                size="sm"
                rotation={2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

