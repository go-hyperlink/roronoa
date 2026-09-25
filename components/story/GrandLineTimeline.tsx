"use client";

import React, { useState } from "react";
import { HandDrawnArrow, HankoStamp, WashiTape, SumiSplatter } from "./HandDrawnElements";
import { soundEngine } from "@/lib/audio";

interface RouteStop {
  id: string;
  saga: string;
  kanji: string;
  title: string;
  milestone: string;
  quote: string;
  technique: string;
}

const ROUTE_STOPS: RouteStop[] = [
  {
    id: "east-blue",
    saga: "East Blue",
    kanji: "東の海",
    title: "Loguetown — The Arms Test",
    milestone: "Zoro throws the cursed Sandai Kitetsu spinning into the air over his bare arm to test whether his luck surpasses its curse. The blade avoids his flesh.",
    quote: "Let's see whose luck is stronger—mine, or the sword's curse.",
    technique: "Sandai Kitetsu & Yubashiri Acquired",
  },
  {
    id: "alabasta",
    saga: "Alabasta",
    kanji: "砂漠の国",
    title: "Breath of All Things",
    milestone: "Pushed to the brink of death by Mr. 1's steel body. Zoro taps into the silence between breaths, sensing the life in leaves, stone, and iron—and learns to cut steel.",
    quote: "To cut nothing is to cut everything.",
    technique: "Ittoryu Iai: Shishi Sonson (Lion's Song)",
  },
  {
    id: "enies-lobby",
    saga: "Water 7",
    kanji: "司法の島",
    title: "The Demon God — Asura",
    milestone: "Facing CP9 agent Kaku, Zoro's sheer spiritual pressure materializes a three-headed, six-armed demon god phantom wielding nine blades.",
    quote: "Suffering is good on the path of slaughter.",
    technique: "Kyutoryu: Asura Ichibugin (Nine-Sword Style)",
  },
  {
    id: "thriller-bark",
    saga: "Thriller Bark",
    kanji: "魔の海域",
    title: "The Legendary Samurai Ryuma",
    milestone: "Zoro defeats the zombie of Wano's legendary Sword God Ryuma on the laboratory rooftop, earning the national treasure black blade Shusui.",
    quote: "I accept this sword as your legacy.",
    technique: "Black Blade Shusui Acquired",
  },
  {
    id: "3d2y",
    saga: "Kuraigana",
    kanji: "二年の修業",
    title: "3D2Y — The Great Humbling",
    milestone: "Realizing his captain needs him stronger, Zoro swallows his fierce pride and begs Dracule Mihawk to train him. He returns with a scarred eye and Busoshoku Haki mastery.",
    quote: "When I surpass you, it will be by your own teachings.",
    technique: "Busoshoku (Armament) Haki Infusion",
  },
  {
    id: "dressrosa",
    saga: "Dressrosa",
    kanji: "愛と情熱",
    title: "Cleaving the Colossus Pica",
    milestone: "Zoro is propelled through the skies by Orlumbus, slicing a city-sized moving mountain of stone into clean halves with coated Haki.",
    quote: "Over the nine mountains and eight seas... there is nothing I cannot cut.",
    technique: "Santoryu Ogi: Sanzen Sekai (Three Thousand Worlds)",
  },
  {
    id: "wano",
    saga: "Wano Country",
    kanji: "ワノ国",
    title: "The Awakening of Enma",
    milestone: "In the land of samurai, Zoro reclaims his ancestral lineage to Shimotsuki Ushimaru and Kozaburo. He masters Enma and unleashes Advanced Conqueror's Haki.",
    quote: "I'll become the King of Hell.",
    technique: "Haoshoku Infusion · King of Hell Three-Sword Style",
  },
];

export default function GrandLineTimeline() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = ROUTE_STOPS[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    soundEngine?.triggerSwish(0.4);
  };

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-neutral-300/50">
      {/* Chapter Title */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-emerald-800 font-bold bg-emerald-950/10 px-2.5 py-1 rounded-[2px]">
            CHAPTER 06
          </span>
          <span className="w-8 h-[1px] bg-neutral-400" />
          <span className="text-sm font-serif font-bold text-neutral-600 tracking-widest">
            航路の記録
          </span>
        </div>

        <h2
          className="text-4xl md:text-6xl text-[#1a1714] tracking-tight mb-3"
          style={{ fontFamily: '"Avatar Airbender", serif' }}
        >
          The Grand Line Chronicle
        </h2>

        <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase max-w-xl">
          An illustrated sea-chart of Zoro&apos;s defining duels and spiritual milestones
        </p>
      </div>

      {/* Double-page Open Sketchbook Layout */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Desk Map Card */}
        <div className="relative w-full max-w-5xl p-3 sm:p-5 bg-[#fbf8f2] rounded-[2px] shadow-[0_25px_60px_-15px_rgba(45,35,25,0.35)]">
          {/* Top Tape */}
          <WashiTape className="absolute -top-3.5 left-16 z-20" angle={-2} />
          <WashiTape className="absolute -top-3.5 right-16 z-20" angle={3} />

          {/* Sketchbook Map Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1px] bg-[#ebe2d0]">
            <img
              src="/zoro-pic/06-grand-line.jpg"
              alt="Grand Line Japanese sketchbook nautical chart"
              className="w-full h-full object-cover filter contrast-[1.03]"
              loading="lazy"
            />

            {/* Subtle Map Overlay with Interactive Station Dots */}
            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16 pointer-events-none">
              {ROUTE_STOPS.map((stop, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <button
                    key={stop.id}
                    onClick={() => handleSelect(idx)}
                    className={`pointer-events-auto relative group flex flex-col items-center cursor-pointer transition-transform duration-300 ${
                      isSelected ? "scale-125 z-20" : "scale-100 hover:scale-110"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 md:w-5 md:h-5 rounded-full border-2 transition-all duration-300 ${
                        isSelected
                          ? "bg-red-700 border-white shadow-[0_0_12px_rgba(185,28,28,0.8)]"
                          : "bg-[#433526]/80 border-[#f5efe2] group-hover:bg-red-800"
                      }`}
                    />
                    <span className="hidden md:block font-mono text-[9px] uppercase tracking-wider text-[#241f1a] font-bold mt-1 bg-white/75 px-1 py-0.5 rounded-[1px] shadow-sm">
                      {stop.saga}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 px-1 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>CHART 06 · EXPEDITION JOURNAL OF THE STRAW HAT SWORDSMAN</span>
            <span className="text-emerald-800 font-semibold">SELECT MILESTONE BELOW</span>
          </div>
        </div>

        {/* Milestone Navigation Bar */}
        <div className="w-full max-w-5xl mt-6 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 min-w-max">
            {ROUTE_STOPS.map((stop, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={stop.id}
                  onClick={() => handleSelect(idx)}
                  className={`px-3.5 py-2 rounded-[2px] font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#25201b] text-neutral-100 shadow-md font-bold"
                      : "bg-[#ede4d2] text-neutral-700 hover:bg-[#e4dac5] hover:text-neutral-950"
                  }`}
                >
                  <span className="opacity-60 mr-1.5">{idx + 1}.</span>
                  <span>{stop.saga}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Detail Dossier */}
        <div className="w-full max-w-5xl mt-6 p-6 sm:p-8 bg-[#fdfcf9] rounded-[2px] border border-neutral-300/80 shadow-[0_12px_30px_-10px_rgba(45,35,25,0.18)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-200">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-emerald-800 font-bold block mb-1">
                JOURNAL ENTRY {selectedIdx + 1} OF {ROUTE_STOPS.length} · {current.saga}
              </span>
              <h3
                className="text-2xl sm:text-3xl text-neutral-900"
                style={{ fontFamily: '"Avatar Airbender", serif' }}
              >
                {current.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-xl font-serif font-black text-neutral-700"
                style={{ fontFamily: '"Noto Serif JP", serif' }}
              >
                {current.kanji}
              </span>
              <HankoStamp text={current.kanji} size="sm" rotation={-2} />
            </div>
          </div>

          <p className="font-serif text-base sm:text-lg text-neutral-800 leading-relaxed mb-6">
            {current.milestone}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
            <div className="p-3 bg-neutral-100/80 border-l-2 border-red-700 rounded-r-[2px]">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-500 mb-1">
                DECLARATION:
              </span>
              <p
                className="font-serif italic text-xs sm:text-sm text-neutral-900"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                &ldquo;{current.quote}&rdquo;
              </p>
            </div>

            <div className="p-3 bg-neutral-100/80 border-l-2 border-emerald-700 rounded-r-[2px]">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-500 mb-1">
                MARTIAL MASTERY:
              </span>
              <p className="font-mono text-xs sm:text-sm text-emerald-900 font-bold">
                {current.technique}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

