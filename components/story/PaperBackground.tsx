"use client";

import React from "react";

/**
 * Procedural Washi Paper Background with tactile fiber grain,
 * tea-wash vignettes, sumi-e ink bleeds, and sketchbook notebook margins.
 */
export default function PaperBackground({
  children,
  className = "",
  darker = false,
}: {
  children?: React.ReactNode;
  className?: string;
  darker?: boolean;
}) {
  return (
    <div
      className={`relative w-full text-[#241f1a] transition-colors duration-700 ${
        darker ? "bg-[#e8decb]" : "bg-[#f5efe2]"
      } ${className}`}
      style={{
        // Washi paper warm tone gradient
        backgroundImage: darker
          ? "radial-gradient(ellipse at 50% 20%, #ebe2d0 0%, #ded1b8 75%, #cfc0a3 100%)"
          : "radial-gradient(ellipse at 50% 15%, #fcf8f0 0%, #f4ede0 65%, #e8ddca 100%)",
      }}
    >
      {/* SVG Micro-Texture Paper Fiber Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Atmospheric Watercolor & Tea Wash Stains */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Top-left tea wash */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25 mix-blend-multiply blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #c7a76c 0%, #d8c499 50%, transparent 70%)",
          }}
        />

        {/* Subtle Moss Green Zoro Spirit Bleed */}
        <div
          className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full opacity-15 mix-blend-multiply blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #2d5a3c 0%, #4a7c59 40%, transparent 70%)",
          }}
        />

        {/* Lower center aged amber pool */}
        <div
          className="absolute bottom-1/4 -left-20 w-[28rem] h-[28rem] rounded-full opacity-20 mix-blend-multiply blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #b89860 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Sketchbook outer book edge drop-shadow & vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0 select-none"
        style={{
          boxShadow:
            "inset 0 0 60px rgba(78, 62, 45, 0.08), inset 0 0 16px rgba(50, 38, 26, 0.06)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

