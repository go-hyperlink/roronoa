"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HandDrawnArrow, HankoStamp, WashiTape, SumiSplatter } from "./HandDrawnElements";
import { soundEngine } from "@/lib/audio";

export interface StoryChapterData {
  id: string;
  chapterNumber: string;
  kanji: string;
  title: string;
  subtitle: string;
  prose: string;
  quote?: string;
  quoteAuthor?: string;
  imageSrc: string;
  imageAlt: string;
  hankoText?: string;
  hankoSubText?: string;
  annotations?: Array<{
    note: string;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    arrowDirection?: "left" | "right" | "curve-down" | "curve-up" | "down";
  }>;
  tiltAngle?: number;
  reverse?: boolean; // image on left or right
}

export default function StorySection({
  chapter,
  onImageClick,
}: {
  chapter: StoryChapterData;
  onImageClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleInteract = () => {
    soundEngine?.triggerBladeRing(0.3);
    if (onImageClick) onImageClick();
  };

  const {
    chapterNumber,
    kanji,
    title,
    subtitle,
    prose,
    quote,
    quoteAuthor,
    imageSrc,
    imageAlt,
    hankoText,
    hankoSubText,
    annotations = [],
    tiltAngle = -1.5,
    reverse = false,
  } = chapter;

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      {/* Chapter Watermark Kanji in background */}
      <div
        className="absolute top-10 right-8 md:right-16 text-[18vw] md:text-[14vw] font-serif font-black text-black/[0.035] leading-none pointer-events-none select-none z-0"
        style={{
          fontFamily: '"Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP", serif',
        }}
      >
        {kanji}
      </div>

      <div
        className={`relative z-10 flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-12 lg:gap-20`}
      >
        {/* Text Editorial Column */}
        <div className="w-full lg:w-5/12 flex flex-col">
          {/* Chapter Stamp & Index */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-emerald-800 font-bold bg-emerald-950/10 px-2.5 py-1 rounded-[2px]">
              {chapterNumber}
            </span>
            <span className="w-8 h-[1px] bg-neutral-400" />
            <span
              className="text-sm font-serif font-bold text-neutral-600 tracking-widest"
              style={{
                fontFamily: '"Noto Serif JP", "Yu Mincho", serif',
              }}
            >
              {kanji}
            </span>
          </div>

          {/* Chapter Title */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-[#1a1714] font-normal tracking-tight leading-[1.08] mb-3 select-none"
            style={{ fontFamily: '"Avatar Airbender", serif' }}
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase mb-6">
            {subtitle}
          </p>

          {/* Concise Story Prose */}
          <div className="text-base md:text-lg text-[#322c26] leading-relaxed font-serif mb-8 max-w-lg">
            {prose}
          </div>

          {/* Poetic Quote if present */}
          {quote && (
            <div className="relative pl-6 py-2 border-l-2 border-emerald-700/60 mb-8 bg-neutral-900/[0.02]">
              <p
                className="font-serif italic text-sm md:text-base text-[#201c18] leading-relaxed"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              >
                &ldquo;{quote}&rdquo;
              </p>
              {quoteAuthor && (
                <span className="block mt-2 font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                  — {quoteAuthor}
                </span>
              )}
            </div>
          )}

          {/* Hanko Inkan Red Seal */}
          {hankoText && (
            <div className="mt-2">
              <HankoStamp
                text={hankoText}
                subText={hankoSubText}
                size="md"
                rotation={-3}
              />
            </div>
          )}
        </div>

        {/* Desk-Placed Illustration Column */}
        <div className="w-full lg:w-7/12 relative flex items-center justify-center">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleInteract}
            className="group relative cursor-pointer select-none transition-all duration-500 ease-out"
            style={{
              transform: `rotate(${isHovered ? 0 : tiltAngle}deg) scale(${
                isHovered ? 1.02 : 1
              })`,
            }}
          >
            {/* Washi Masking Tape on Top Corners */}
            <WashiTape
              className="absolute -top-3.5 left-8 z-30"
              angle={-4}
              color="#e6dcce"
            />
            <WashiTape
              className="absolute -top-3.5 right-8 z-30"
              angle={5}
              color="#dfd4c4"
            />

            {/* Sumi-e Splatters in Margin */}
            <SumiSplatter
              variant={1}
              className="absolute -bottom-6 -left-6 w-16 h-16 opacity-60 z-0"
            />
            <SumiSplatter
              variant={2}
              className="absolute -top-8 -right-8 w-20 h-20 opacity-50 z-0"
            />

            {/* Photo Paper Mount Frame with Authentic Drop Shadow */}
            <div
              className="relative p-2.5 sm:p-3.5 bg-[#fbf8f2] rounded-[2px] overflow-hidden"
              style={{
                boxShadow:
                  "0 20px 40px -15px rgba(45, 35, 25, 0.35), 0 3px 12px -2px rgba(45, 35, 25, 0.2), 0 0 1px rgba(0,0,0,0.4)",
              }}
            >
              {/* Inner Illustration */}
              <div className="relative overflow-hidden rounded-[1px] aspect-[4/3] w-full max-w-[620px] bg-[#ebe2d0]">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.99] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Subtle paper texture overlay on illustration */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.4'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Caption Margin at bottom of photo card */}
              <div className="pt-2 px-1 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                <span>SKETCHBOOK ARCHIVE · {chapterNumber}</span>
                <span className="text-neutral-400">PENCIL & SUMI-E</span>
              </div>
            </div>

            {/* Hand-drawn Margin Annotations around image */}
            {annotations.map((ann, i) => {
              const posClasses = {
                "top-left": "-top-10 -left-6 sm:-left-12",
                "top-right": "-top-10 -right-6 sm:-right-12",
                "bottom-left": "-bottom-10 -left-6 sm:-left-12",
                "bottom-right": "-bottom-10 -right-6 sm:-right-12",
              }[ann.position];

              return (
                <div
                  key={i}
                  className={`absolute ${posClasses} z-30 pointer-events-none flex items-center gap-1 max-w-[200px] sm:max-w-[240px]`}
                >
                  <span
                    className="text-sm sm:text-base text-neutral-800 font-bold leading-tight"
                    style={{
                      fontFamily: '"Caveat", cursive, sans-serif',
                      textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                    }}
                  >
                    {ann.note}
                  </span>
                  {ann.arrowDirection && (
                    <HandDrawnArrow
                      direction={ann.arrowDirection}
                      className="w-10 h-6 shrink-0 text-neutral-700"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

