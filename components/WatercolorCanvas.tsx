"use client";

import React, { useEffect, useRef } from "react";
import { SequencePreloader, getSequencePreloader } from "@/lib/imageSequence";
import { TOTAL_FRAMES } from "@/lib/constants";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  isHaki: boolean;
  angle: number;
  spin: number;
}

interface WatercolorCanvasProps {
  progress: number;
  velocity: number;
  reducedMotion: boolean;
  onFrameChange?: (frame: number) => void;
}

export default function WatercolorCanvas({
  progress,
  velocity,
  reducedMotion,
  onFrameChange,
}: WatercolorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const preloaderRef = useRef<SequencePreloader | null>(null);

  // Smooth lerped state refs
  const smoothProgressRef = useRef(progress);
  const currentFrameRef = useRef(0);
  const mousePosRef = useRef({ x: 0.5, y: 0.5, currentX: 0.5, currentY: 0.5 });
  const particlesRef = useRef<Particle[]>([]);
  const paperPatternRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize preloader
  useEffect(() => {
    preloaderRef.current = getSequencePreloader();
  }, []);

  // Initialize procedural paper grain pattern once
  useEffect(() => {
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 256;
    patternCanvas.height = 256;
    const pCtx = patternCanvas.getContext("2d");
    if (pCtx) {
      const imgData = pCtx.createImageData(256, 256);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Subtle organic washi paper grain
        const noise = Math.random() * 26;
        data[i] = 18 + noise;
        data[i + 1] = 24 + noise * 1.1;
        data[i + 2] = 22 + noise * 0.9;
        data[i + 3] = Math.random() < 0.12 ? 32 : 14;
      }
      pCtx.putImageData(imgData, 0, 0);

      // Add soft ink fiber strokes
      pCtx.strokeStyle = "rgba(0, 0, 0, 0.08)";
      pCtx.lineWidth = 1;
      for (let j = 0; j < 12; j++) {
        pCtx.beginPath();
        const startX = Math.random() * 256;
        const startY = Math.random() * 256;
        pCtx.moveTo(startX, startY);
        pCtx.bezierCurveTo(
          startX + (Math.random() - 0.5) * 40,
          startY + (Math.random() - 0.5) * 40,
          startX + (Math.random() - 0.5) * 60,
          startY + (Math.random() - 0.5) * 60,
          startX + (Math.random() - 0.5) * 80,
          startY + (Math.random() - 0.5) * 80
        );
        pCtx.stroke();
      }
      paperPatternRef.current = patternCanvas;
    }
  }, []);

  // Initialize particle pool (Enma green haki embers + charcoal ink dust)
  useEffect(() => {
    const particles: Particle[] = [];
    const count = reducedMotion ? 18 : 65;
    const hakiColors = [
      "rgba(43, 248, 160, ",
      "rgba(16, 185, 129, ",
      "rgba(110, 231, 183, ",
      "rgba(5, 150, 105, ",
    ];

    for (let i = 0; i < count; i++) {
      const isHaki = Math.random() < 0.65;
      const baseAlpha = isHaki ? 0.25 + Math.random() * 0.55 : 0.15 + Math.random() * 0.25;
      const baseSize = isHaki ? 1.5 + Math.random() * 3.5 : 1.0 + Math.random() * 2.0;

      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: isHaki ? -(0.0008 + Math.random() * 0.0018) : -(0.0002 + Math.random() * 0.0008),
        size: baseSize,
        baseSize,
        alpha: baseAlpha,
        baseAlpha,
        color: isHaki
          ? hakiColors[Math.floor(Math.random() * hakiColors.length)]
          : "rgba(18, 26, 23, ",
        isHaki,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
      });
    }
    particlesRef.current = particles;
  }, [reducedMotion]);

  // Track mouse coordinates for subtle parallax and particle interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX / window.innerWidth;
      mousePosRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(64, time - lastTime);
      lastTime = time;

      // Handle canvas resolution & DPR
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== Math.floor(displayWidth * dpr) || canvas.height !== Math.floor(displayHeight * dpr)) {
        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Smooth progress interpolation
      const lerpFactor = reducedMotion ? 0.35 : 0.14;
      smoothProgressRef.current += (progress - smoothProgressRef.current) * lerpFactor;
      const currentProg = smoothProgressRef.current;

      // Calculate active frame
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProg * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        onFrameChange?.(frameIndex + 1);
      }

      // Smooth mouse coordinates
      mousePosRef.current.currentX += (mousePosRef.current.x - mousePosRef.current.currentX) * 0.06;
      mousePosRef.current.currentY += (mousePosRef.current.y - mousePosRef.current.currentY) * 0.06;
      const mouseRelX = (mousePosRef.current.currentX - 0.5) * 2;
      const mouseRelY = (mousePosRef.current.currentY - 0.5) * 2;

      // Camera dynamics: subtle zoom during climax (progress 0.65 - 0.85)
      const climaxIntensity = Math.exp(-Math.pow((currentProg - 0.74) / 0.12, 2));
      const baseScale = reducedMotion ? 1.0 : 1.0 + climaxIntensity * 0.045;
      const tilt = reducedMotion ? 0 : Math.max(-0.015, Math.min(0.015, velocity * 0.003));

      // Clear with dark atmospheric sumi-e ink background
      ctx.fillStyle = "#070b09";
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Transform context for camera
      ctx.save();
      ctx.translate(displayWidth / 2, displayHeight / 2);
      ctx.rotate(tilt);
      ctx.scale(baseScale, baseScale);
      ctx.translate(-displayWidth / 2, -displayHeight / 2);

      // Subtle parallax offset
      const parallaxX = reducedMotion ? 0 : mouseRelX * 6;
      const parallaxY = reducedMotion ? 0 : mouseRelY * 4;

      // Draw the anime frame
      const preloader = preloaderRef.current;
      const img = preloader ? preloader.getNearestLoadedImage(frameIndex) : null;

      if (img && img.complete && img.naturalWidth > 0) {
        // Calculate 16:9 Cover
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const viewAspect = displayWidth / displayHeight;

        let drawW = displayWidth;
        let drawH = displayHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (viewAspect > imgAspect) {
          drawW = displayWidth;
          drawH = displayWidth / imgAspect;
          offsetY = (displayHeight - drawH) / 2;
        } else {
          drawH = displayHeight;
          drawW = displayHeight * imgAspect;
          offsetX = (displayWidth - drawW) / 2;
        }

        const finalX = offsetX + parallaxX;
        const finalY = offsetY + parallaxY;

        // High-energy chromatic aberration during strike sequence (frames 180 to 225)
        const isStrikeSequence = frameIndex >= 175 && frameIndex <= 228;
        if (isStrikeSequence && !reducedMotion) {
          const strikeEnergy = 1 - Math.abs(frameIndex - 210) / 35;
          const chromaShift = Math.max(1, strikeEnergy * 6);

          // Red channel offset
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.drawImage(img, finalX - chromaShift, finalY, drawW, drawH);
          ctx.restore();

          // Green/Cyan channel offset
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.globalCompositeOperation = "screen";
          ctx.drawImage(img, finalX + chromaShift, finalY, drawW, drawH);
          ctx.restore();
        } else {
          // Standard pristine frame rendering
          ctx.drawImage(img, finalX, finalY, drawW, drawH);
        }

        // White Flash / Impact Frame (frame 223 - 226)
        if (frameIndex >= 222 && frameIndex <= 226) {
          const flashAlpha = 1 - Math.abs(frameIndex - 224) / 3;
          ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.85})`;
          ctx.fillRect(0, 0, displayWidth, displayHeight);
        }
      }

      ctx.restore(); // Restore camera transform

      // Layer: Paper Grain & Fiber Texture
      if (paperPatternRef.current) {
        ctx.save();
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = 0.18;
        const pattern = ctx.createPattern(paperPatternRef.current, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, displayWidth, displayHeight);
        }
        ctx.restore();
      }

      // Layer: Dynamic Sumi-e Ink Bleed Vignette
      const bleedVelocityBoost = Math.min(0.25, Math.abs(velocity) * 0.15);
      const vignetteGrad = ctx.createRadialGradient(
        displayWidth / 2,
        displayHeight / 2,
        Math.min(displayWidth, displayHeight) * 0.28,
        displayWidth / 2,
        displayHeight / 2,
        Math.max(displayWidth, displayHeight) * 0.72
      );
      vignetteGrad.addColorStop(0, "rgba(7, 11, 9, 0)");
      vignetteGrad.addColorStop(0.55, "rgba(7, 11, 9, 0.25)");
      vignetteGrad.addColorStop(1, `rgba(5, 8, 7, ${0.82 + bleedVelocityBoost})`);

      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Layer: Green Enma Haki and Ink Particles Simulation
      ctx.save();
      const particles = particlesRef.current;
      const speedMultiplier = 1 + Math.abs(velocity) * 4 + climaxIntensity * 3;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Particle physics update
        p.x += p.vx * speedMultiplier * (dt / 16);
        p.y += p.vy * speedMultiplier * (dt / 16);
        p.angle += p.spin;

        // Subtle wobble
        p.x += Math.sin(p.angle) * 0.0003;

        // Screen wrap
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        } else if (p.y > 1.05) {
          p.y = -0.05;
          p.x = Math.random();
        }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        // Render particle
        const px = p.x * displayWidth;
        const py = p.y * displayHeight;
        const renderSize = p.baseSize * (1 + climaxIntensity * 0.6);
        const currentAlpha = Math.min(1, p.baseAlpha * (0.8 + climaxIntensity * 0.8));

        if (p.isHaki) {
          // Glowing green spirit ember
          ctx.globalCompositeOperation = "screen";

          // Halo
          const haloGrad = ctx.createRadialGradient(px, py, 0, px, py, renderSize * 4);
          haloGrad.addColorStop(0, `${p.color}${currentAlpha * 0.8})`);
          haloGrad.addColorStop(0.4, `${p.color}${currentAlpha * 0.3})`);
          haloGrad.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(px, py, renderSize * 4, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(px, py, renderSize * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Floating ink/charcoal speck
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, renderSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      ctx.restore(); // Restore DPR scale
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [progress, velocity, reducedMotion, onFrameChange]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none block"
      style={{ touchAction: "none" }}
    />
  );
}

