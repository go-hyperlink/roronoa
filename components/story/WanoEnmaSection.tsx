"use client";

import React, { useState } from "react";
import { HandDrawnArrow, HankoStamp, WashiTape, SumiSplatter } from "./HandDrawnElements";
import { soundEngine } from "@/lib/audio";

export default function WanoEnmaSection() {
  const [isAwakened, setIsAwakened] = useState(false);

  const handleToggleAwakening = () => {
    setIsAwakened((prev) => !prev);
    soundEngine?.triggerBladeRing(1.0);
    soundEngine?.triggerSwish(0.8);
  };

  return (
    <section className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-neutral-400/40">
      {/* Background Emerald Dragon Flame Wash */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isAwakened ? "opacity-30" : "opacity-15"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.15) 45%, transparent 75%)",
        }}
      />

      {/* Chapter Indicator */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-emerald-900 font-bold bg-emerald-950/15 px-2.5 py-1 rounded-[2px]">
            CHAPTER 09
          </span>
          <span className="w-8 h-[1px] bg-neutral-400" />
          <span className="text-sm font-serif font-bold text-neutral-700 tracking-widest">
            閻魔と血統
          </span>
        </div>

        <h2
          className="text-4xl md:text-6xl text-[#141d17] tracking-tight mb-3"
          style={{ fontFamily: '"Avatar Airbender", serif' }}
        >
          Wano Country & The Dragon&apos;s Blade
        </h2>

        <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-600 uppercase max-w-xl">
          Ancestral Shimotsuki lineage · The taming of Enma · King of Hell Three-Sword Style
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Illustration with green flame aura */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            onClick={handleToggleAwakening}
            className="group relative cursor-pointer max-w-[640px] w-full p-3 sm:p-5 bg-[#fbf8f2] rounded-[2px] transition-all duration-500 hover:scale-[1.01]"
            style={{
              boxShadow: isAwakened
                ? "0 30px 60px -15px rgba(5, 150, 105, 0.45), 0 0 30px rgba(16, 185, 129, 0.3)"
                : "0 25px 50px -15px rgba(45, 35, 25, 0.35)",
            }}
          >
            {/* Washi Tape */}
            <WashiTape className="absolute -top-3.5 left-12 z-20" angle={-3} color="#d4e4d8" />
            <WashiTape className="absolute -top-3.5 right-12 z-20" angle={4} color="#d9e6dc" />

            {/* Sumi Splatters */}
            <SumiSplatter
              variant={3}
              className="absolute -bottom-8 -right-8 w-24 h-24 text-emerald-950/60 z-20"
            />

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-[#1a2820]">
              <img
                src="/zoro-pic/09-wano-enma.jpg"
                alt="Zoro wielding Enma with Conqueror's Haki dragon aura in Wano"
                className="w-full h-full object-cover filter contrast-[1.04]"
                loading="lazy"
              />

              {/* Reactive Green Conqueror's Glow */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-emerald-500/20 via-transparent to-emerald-400/10 ${
                  isAwakened ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            <div className="pt-2 px-1 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              <span>PLATE 09 · ENMA UNLEASHED IN ONIGASHIMA</span>
              <span className="text-emerald-800 font-bold">
                {isAwakened ? "⚡ HAOSHOKU INFUSED" : "CLICK TO UNLEASH HAKI"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-center max-w-lg">
            <span
              className="text-base text-neutral-800 font-bold"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              &ldquo;Why would I ever hold back? If you want to swallow my Haki, swallow it all!&rdquo;
            </span>
          </div>
        </div>

        {/* Right: Narrative & Swordsmith Lore */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-emerald-800 font-bold">
              THE SHIMOTSUKI LEGACY
            </span>
            <span className="w-6 h-[1px] bg-neutral-400" />
            <span className="font-mono text-xs text-neutral-500">霜月牛丸の血</span>
          </div>

          <h3
            className="text-3xl sm:text-4xl text-neutral-900 mb-4"
            style={{ fontFamily: '"Avatar Airbender", serif' }}
          >
            Becoming The King of Hell
          </h3>

          <p className="font-serif text-base sm:text-lg text-neutral-800 leading-relaxed mb-6">
            In the skies above Onigashima against the Lunarian survivor King, Zoro understood the truth whispered in Shimotsuki Village decades ago. A cursed sword has no malice—it only seeks a wielder strong enough to let it fulfill its nature.
          </p>

          <p className="font-serif text-sm sm:text-base text-neutral-700 leading-relaxed mb-8">
            Rather than fight Enma&apos;s ravenous drain, Zoro surrendered his entire reservoir of Conqueror&apos;s Haki, cloaking all three blades in green dragon flame and black lightning.
          </p>

          <div className="p-4 bg-emerald-950/[0.05] border-l-3 border-emerald-700 rounded-r-[2px] mb-8">
            <p
              className="font-serif italic text-base text-emerald-950 font-semibold leading-relaxed"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              &ldquo;I have a promise to keep with my captain and my friend. If that means crawling out of the grave, I will become the King of Hell!&rdquo;
            </p>
            <span className="block mt-2 font-mono text-[10px] tracking-widest uppercase text-emerald-800">
              — Roronoa Zoro vs. King the Conflagration
            </span>
          </div>

          <div className="flex items-center gap-4">
            <HankoStamp text={"閻王\n三刀"} subText="KING OF HELL" size="md" rotation={-2} />
            <HankoStamp text={"霜月\n一門"} subText="SHIMOTSUKI" size="md" rotation={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

