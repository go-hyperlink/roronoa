"use client";

import React, { useState } from "react";
import { HankoStamp, SumiSplatter, WashiTape } from "./HandDrawnElements";
import { soundEngine } from "@/lib/audio";

export default function NothingHappenedSection() {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleClick = () => {
    setHasInteracted(true);
    soundEngine?.triggerBladeRing(0.9);
  };

  return (
    <section className="relative py-28 md:py-44 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-neutral-300/50">
      {/* Massive Calligraphic Kanji in Background */}
      <div
        className="absolute top-16 right-4 md:right-20 text-[22vw] font-serif font-black text-red-950/[0.04] leading-none pointer-events-none select-none z-0"
        style={{ fontFamily: '"Noto Serif JP", serif' }}
      >
        犠牲
      </div>

      {/* Chapter Indicator */}
      <div className="relative z-10 flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-red-800 font-bold bg-red-950/10 px-2.5 py-1 rounded-[2px]">
            CHAPTER 07
          </span>
          <span className="w-8 h-[1px] bg-neutral-400" />
          <span className="text-sm font-serif font-bold text-neutral-600 tracking-widest">
            何もなかった
          </span>
        </div>

        <p className="text-xs md:text-sm font-mono tracking-[0.3em] text-neutral-500 uppercase">
          Thriller Bark · Dawn After The Nightmare
        </p>
      </div>

      {/* Main Monumental Silhouette & Vast Paper Whitespace */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          onClick={handleClick}
          className="group relative cursor-pointer max-w-3xl w-full p-3 sm:p-5 bg-[#fbf8f2] rounded-[2px] shadow-[0_30px_70px_-20px_rgba(45,35,25,0.4)] transition-transform duration-500 hover:scale-[1.01]"
        >
          {/* Top Tape */}
          <WashiTape className="absolute -top-3.5 left-1/4 z-20" angle={-3} />
          <WashiTape className="absolute -top-3.5 right-1/4 z-20" angle={3} />

          {/* Deep Red Ink Splatter Accents */}
          <SumiSplatter
            variant={3}
            className="absolute -bottom-10 -left-10 w-28 h-28 text-red-900/60 z-20"
          />
          <SumiSplatter
            variant={2}
            className="absolute -top-8 -right-8 w-24 h-24 text-red-950/40 z-20"
          />

          {/* Artwork Frame */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-[#221c17]">
            <img
              src="/zoro-pic/07-nothing-happened.jpg"
              alt="Nothing Happened Zoro sacrifice on Thriller Bark"
              className="w-full h-full object-cover filter contrast-[1.05]"
              loading="lazy"
            />

            {/* In-image Blood Ink Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="pt-3 px-1 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>ACT VII · THE WEIGHT OF A CAPTAIN&apos;S LIFE</span>
            <span className="text-red-800 font-bold">CLICK TO COMMUNE</span>
          </div>
        </div>

        {/* Monumental Quote Typography — Bold, Silent, Unflinching */}
        <div className="mt-14 flex flex-col items-center text-center max-w-2xl">
          <span className="font-mono text-xs tracking-[0.4em] uppercase text-neutral-500 mb-2">
            WHEN SANJI ASKED WHAT HAPPENED:
          </span>

          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#1c1412] my-3 leading-none font-bold"
            style={{
              fontFamily: '"Avatar Airbender", serif',
              textShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            NOTHING HAPPENED.
          </h2>

          <div
            className="text-2xl sm:text-3xl font-serif text-neutral-700 tracking-widest mt-1 mb-6 font-semibold"
            style={{ fontFamily: '"Noto Serif JP", serif' }}
          >
            「……なにも、なかった……!!!」
          </div>

          <p className="font-serif text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl mb-8">
            He accepted the entirety of Luffy&apos;s agonizing pain and fatigue extracted by Bartholomew Kuma. When morning arrived over the ruins of Thriller Bark, he remained standing on his two feet, bathed in his own blood, denying his sacrifice to protect his crew&apos;s peace.
          </p>

          <div className="flex items-center gap-4">
            <HankoStamp
              text={"無事\n覚悟"}
              subText="THRILLER BARK"
              size="md"
              rotation={-3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

