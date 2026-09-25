"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import WatercolorCanvas from "./WatercolorCanvas";
import StoryOverlay from "./StoryOverlay";
import Navigation from "./Navigation";
import ScrubberTimeline from "./ScrubberTimeline";
import Loader from "./Loader";
import CustomCursor from "./CustomCursor";
import Blaze from "./Blaze";
import StoryExperience from "./story/StoryExperience";
import { Chapter } from "@/lib/constants";
import { soundEngine } from "@/lib/audio";

export default function ScrollExperience() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const velocityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      setReducedMotion(true);
    }
  }, []);

  // Handle Scroll Progress & Velocity
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const currentY = window.scrollY;
    const p = Math.max(0, Math.min(1, currentY / maxScroll));
    setProgress(p);

    const pastHero = currentY > maxScroll + 30;
    setIsPastHero(pastHero);

    // Calculate velocity
    const now = Date.now();
    const dt = Math.max(1, now - lastScrollTimeRef.current);
    const dy = currentY - lastScrollYRef.current;
    const v = (dy / dt) * 16; // Normalized pixels per frame (~60fps)

    setVelocity(v);
    lastScrollYRef.current = currentY;
    lastScrollTimeRef.current = now;

    // Audio triggers based on scroll momentum
    if (soundEngine && Math.abs(v) > 4) {
      soundEngine.triggerSwish(Math.min(1, Math.abs(v) / 18));
      if (Math.abs(v) > 14) {
        soundEngine.triggerBladeRing(Math.min(1, Math.abs(v) / 25));
      }
      soundEngine.updateAtmosphere(p);
    }

    // Reset velocity when scroll stops
    if (velocityTimeoutRef.current) {
      clearTimeout(velocityTimeoutRef.current);
    }
    velocityTimeoutRef.current = setTimeout(() => {
      setVelocity(0);
    }, 120);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (velocityTimeoutRef.current) clearTimeout(velocityTimeoutRef.current);
    };
  }, [handleScroll]);

  // Jump to Chapter Helper
  const handleJumpToChapter = (chapter: Chapter) => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    const targetY = chapter.startProgress * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
    soundEngine?.triggerBladeRing(0.8);
  };

  // Timeline Scrubber Jump Helper
  const handleScrub = (targetProgress: number) => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    const targetY = targetProgress * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: "instant",
    });
    setProgress(targetProgress);
  };

  // Smooth scroll into Life Story Chronicles
  const handleEnterChronicles = () => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: maxScroll + window.innerHeight * 0.15,
      behavior: "smooth",
    });
    soundEngine?.triggerBladeRing(0.6);
  };

  // Golden Blaze parameters (distortion >= 0.85, up to 1.25)
  const blazeOptions = useMemo(() => {
    const climaxIntensity = Math.exp(-Math.pow((progress - 0.74) / 0.12, 2));
    const velocityBoost = Math.min(0.6, Math.abs(velocity) * 0.035);

    return {
      sparkColor: [1.0, 0.42, 0.08] as [number, number, number],
      smokeColor: [1.0, 0.43, 0.1] as [number, number, number],
      height: 0.85 + climaxIntensity * 0.12,
      sparks: 0.6 + climaxIntensity * 0.35,
      sparkDensity: 1.6,
      smoke: 0.45 + climaxIntensity * 0.25,
      glow: 1.6 + climaxIntensity * 0.6,
      distortion: 0.85 + climaxIntensity * 0.38,
      speed: 1.0 + velocityBoost,
    };
  }, [progress, velocity]);

  // Keyboard navigation for precision scrubbing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        window.scrollBy({ top: 80, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        window.scrollBy({ top: -80, behavior: "smooth" });
      } else if (e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" });
      } else if (e.key === "PageUp") {
        e.preventDefault();
        window.scrollBy({ top: -window.innerHeight * 0.7, behavior: "smooth" });
      } else if (e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        window.scrollTo({ top: maxScroll, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full bg-[#070b09] text-zinc-100 select-none overflow-x-hidden">
      {/* Preloader Gate */}
      {!isLoaded && <Loader onReady={() => setIsLoaded(true)} />}

      {/* Atmospheric Custom Calligraphy Cursor */}
      <CustomCursor />

      {/* Persistent Top Navigation — Audio, FX, Chapters, and Chronicles */}
      <Navigation
        progress={progress}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        onJumpToChapter={handleJumpToChapter}
        isPastHero={isPastHero}
        onJumpToStory={handleEnterChronicles}
      />

      {/* Hero Scroll Canvas Container (650vh pin) */}
      <div
        ref={containerRef}
        className="relative w-full bg-[#070b09] text-zinc-100 select-none overflow-x-hidden"
        style={{ height: "650vh" }}
      >
        {/* Fullscreen Interactive Watercolor Canvas (Base Artwork & Paper Bleed) */}
        <div
          className={`transition-opacity duration-500 ${
            isPastHero ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <WatercolorCanvas
            progress={progress}
            velocity={velocity}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Canvas UI Blaze WebGL Golden Fire, Sparks, Smoke Overlay */}
        <div
          className={`fixed inset-0 pointer-events-none z-15 transition-opacity duration-500 ${
            isPastHero ? "opacity-0" : "opacity-100"
          }`}
        >
          <Blaze
            className="w-full h-full"
            height={blazeOptions.height}
            sparks={reducedMotion ? 0.2 : blazeOptions.sparks}
            sparkDensity={blazeOptions.sparkDensity}
            sparkSize={1.1}
            layers={reducedMotion ? 2 : 4}
            smoke={reducedMotion ? 0.15 : blazeOptions.smoke}
            glow={blazeOptions.glow}
            distortion={reducedMotion ? 0 : blazeOptions.distortion}
            distortionScale={0.5}
            speed={blazeOptions.speed}
            sparkColor={blazeOptions.sparkColor}
            smokeColor={blazeOptions.smokeColor}
          />
        </div>

        {/* Narrative Story Typography Overlay */}
        <div
          className={`transition-opacity duration-300 ${
            isPastHero ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <StoryOverlay
            progress={progress}
            onJumpToChapter={handleJumpToChapter}
            onEnterChronicles={handleEnterChronicles}
          />
        </div>

        {/* Bottom Timeline Scrubber */}
        <div
          className={`transition-opacity duration-300 ${
            isPastHero ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <ScrubberTimeline
            progress={progress}
            onScrub={handleScrub}
            onJumpToChapter={handleJumpToChapter}
          />
        </div>
      </div>

      {/* Interactive 10-Chapter Sketchbook Life Story */}
      <StoryExperience
        onReturnToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
