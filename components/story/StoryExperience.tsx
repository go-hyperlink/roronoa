"use client";

import React from "react";
import PaperBackground from "./PaperBackground";
import StorySection, { StoryChapterData } from "./StorySection";
import SantoryuDiagram from "./SantoryuDiagram";
import GrandLineTimeline from "./GrandLineTimeline";
import NothingHappenedSection from "./NothingHappenedSection";
import MihawkHumilitySection from "./MihawkHumilitySection";
import WanoEnmaSection from "./WanoEnmaSection";
import StoryClosing from "./StoryClosing";
import { PaintedCutEdge } from "./HandDrawnElements";

// Chapter 1, 2, 4, 5 data
const CHAPTER_1: StoryChapterData = {
  id: "shimotsuki",
  chapterNumber: "CHAPTER 01",
  kanji: "霜月村",
  title: "Shimotsuki Village",
  subtitle: "The Boy with Wooden Swords · Isshin Dojo",
  prose:
    "In a sleepy village in the East Blue, an orphaned boy with green hair walked into the Isshin Dojo, challenging every student he could find. He possessed no pedigree and no formal style—only an unruly spirit, boundless stamina, and a stubborn refusal to stay down.",
  quote: "I'll train twice as hard as anyone else. No—ten times as hard!",
  quoteAuthor: "Child Zoro",
  imageSrc: "/zoro-pic/01-shimotsuki.jpg",
  imageAlt: "Young Zoro training with shinai in Shimotsuki Village dojo",
  hankoText: "一心\n道場",
  hankoSubText: "ISSHIN DOJO",
  tiltAngle: -2,
  reverse: false,
  annotations: [
    {
      note: "Two thousand swings before dawn.",
      position: "top-right",
      arrowDirection: "curve-down",
    },
    {
      note: "Isshin Dojo wooden shinai.",
      position: "bottom-left",
      arrowDirection: "curve-up",
    },
  ],
};

const CHAPTER_2: StoryChapterData = {
  id: "kuina",
  chapterNumber: "CHAPTER 02",
  kanji: "誓い",
  title: "Kuina & The Unbroken Promise",
  subtitle: "Two Thousand Defeats · Inheritance of Wado Ichimonji",
  prose:
    "Two thousand and one matches. Two thousand and one defeats. Kuina was the wall Zoro could never scale—and his greatest friend. When tragedy stole her life the following morning, Zoro took her white katana, clutched it to his chest, and made an oath that would bind his soul forever.",
  quote:
    "I'll become the world's greatest swordsman! My name will become so famous it will reach heaven itself!",
  quoteAuthor: "Roronoa Zoro's Oath to Kuina",
  imageSrc: "/zoro-pic/02-kuina.jpg",
  imageAlt: "Zoro and Kuina under the night sky holding Wado Ichimonji",
  hankoText: "和道\n一文字",
  hankoSubText: "PROMISE",
  tiltAngle: 2,
  reverse: true,
  annotations: [
    {
      note: "Wado Ichimonji — The white soul.",
      position: "top-left",
      arrowDirection: "right",
    },
    {
      note: "A vow carried to the stars.",
      position: "bottom-right",
      arrowDirection: "curve-up",
    },
  ],
};

const CHAPTER_4: StoryChapterData = {
  id: "pirate-hunter",
  chapterNumber: "CHAPTER 04",
  kanji: "賞金稼ぎ",
  title: "The Wandering Hunter",
  subtitle: "Lost at Sea · The Name 'Pirate Hunter' Born",
  prose:
    "He never intended to be a bounty hunter. He simply went out to sea in search of Dracule Mihawk, lost his way, and had to hunt pirate bounties just to buy food and pay for sword repairs. Before long, the name 'Pirate Hunter Zoro' became a terrifying whisper across the four blues.",
  quote: "I'm not interested in fame. I just need enough cash for sake and a sharpening stone.",
  quoteAuthor: "Zoro to East Blue merchants",
  imageSrc: "/zoro-pic/04-pirate-hunter.jpg",
  imageAlt: "Pirate Hunter Zoro standing on coastal cliff with wanted poster",
  hankoText: "海賊\n狩り",
  hankoSubText: "EAST BLUE",
  tiltAngle: -2.5,
  reverse: false,
  annotations: [
    {
      note: "No internal compass. Permanently lost.",
      position: "top-right",
      arrowDirection: "curve-down",
    },
    {
      note: "The signature black bandana.",
      position: "bottom-left",
      arrowDirection: "curve-up",
    },
  ],
};

const CHAPTER_5: StoryChapterData = {
  id: "luffy-oath",
  chapterNumber: "CHAPTER 05",
  kanji: "盟友",
  title: "Luffy & The Crucifixion Oath",
  subtitle: "Shells Town Marine Base · The First Straw Hat",
  prose:
    "Tied to a wooden cross in the blazing sun of Shells Town, Zoro was nine days into a starved sentence to protect a village girl. A grinning boy in a straw hat walked up, kicked open the Marine armory, retrieved his three swords, and gave him a choice: die here, or become the first crewmate of the future King of the Pirates.",
  quote:
    "If you make me abandon my ambition, you'll be the one apologizing to me with your life! Any objections, Pirate King?",
  quoteAuthor: "Zoro joining Monkey D. Luffy",
  imageSrc: "/zoro-pic/05-luffy-oath.jpg",
  imageAlt: "Luffy handing three swords to Zoro tied to the post in Shells Town",
  hankoText: "麦わら\n一味",
  hankoSubText: "FIRST MATE",
  tiltAngle: 2,
  reverse: true,
  annotations: [
    {
      note: "Helmeppo's execution cross.",
      position: "top-left",
      arrowDirection: "right",
    },
    {
      note: "The handshake that changed the Grand Line.",
      position: "bottom-right",
      arrowDirection: "curve-up",
    },
  ],
};

export default function StoryExperience({
  onReturnToTop,
}: {
  onReturnToTop?: () => void;
}) {
  return (
    <div id="story-experience" className="relative w-full select-none z-20">
      {/* Finely cut, deformed, continuous painted washi paper edge transition */}
      <div className="relative -mt-1 z-30 pointer-events-none select-none">
        <PaintedCutEdge fill="#f5efe2" />
      </div>

      <PaperBackground className="overflow-hidden">
        {/* Story Intro Callout */}
        <div className="pt-16 md:pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
          <span className="font-mono text-xs tracking-[0.4em] uppercase text-emerald-800 font-bold bg-emerald-950/10 px-3 py-1 rounded-[2px]">
            THE CHRONICLES OF RORONOA ZORO
          </span>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-[#1a1714] mt-4 mb-3 tracking-tight font-normal"
            style={{ fontFamily: '"Avatar Airbender", serif' }}
          >
            The Way of the Demon Swordsman
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            From a stubborn boy in Shimotsuki Village to the King of Hell—an illustrated chronicle of oaths, blood, and the ten thousand cuts that forged a legend.
          </p>

          <div className="w-16 h-[2px] bg-neutral-300 mx-auto mt-6" />
        </div>

        {/* Chapter 01: Shimotsuki Village */}
        <StorySection chapter={CHAPTER_1} />

        {/* Chapter 02: Kuina & The Promise */}
        <StorySection chapter={CHAPTER_2} />

        {/* Chapter 03: The Three Swords — Santoryu Diagram */}
        <SantoryuDiagram />

        {/* Chapter 04: The Wandering Swordsman */}
        <StorySection chapter={CHAPTER_4} />

        {/* Chapter 05: Luffy & The Oath */}
        <StorySection chapter={CHAPTER_5} />

        {/* Chapter 06: The Grand Line Route */}
        <GrandLineTimeline />

        {/* Chapter 07: The Sacrifice — Nothing Happened */}
        <NothingHappenedSection />

        {/* Chapter 08: Mihawk — Humility Before Strength */}
        <MihawkHumilitySection />

        {/* Chapter 09: Wano Country & Enma */}
        <WanoEnmaSection />

        {/* Chapter 10: Zoro Today & Epilogue */}
        <StoryClosing onReturnToTop={onReturnToTop} />
      </PaperBackground>
    </div>
  );
}

