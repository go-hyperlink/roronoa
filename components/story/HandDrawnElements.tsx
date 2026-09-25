"use client";

import React from "react";

/**
 * Hand-drawn SVG Arrow with authentic jitter and charcoal/ink texture
 */
export function HandDrawnArrow({
  className = "",
  direction = "right",
  color = "#2c2621",
}: {
  className?: string;
  direction?: "left" | "right" | "down" | "up" | "curve-down" | "curve-up";
  color?: string;
}) {
  if (direction === "curve-down") {
    return (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none pointer-events-none ${className}`}
      >
        <path
          d="M10 15 C 45 8, 85 18, 98 48 M 98 48 L 84 40 M 98 48 L 108 34"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />
      </svg>
    );
  }

  if (direction === "curve-up") {
    return (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none pointer-events-none ${className}`}
      >
        <path
          d="M12 55 C 40 50, 75 42, 102 18 M 102 18 L 88 16 M 102 18 L 98 32"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />
      </svg>
    );
  }

  if (direction === "down") {
    return (
      <svg
        viewBox="0 0 50 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none pointer-events-none ${className}`}
      >
        <path
          d="M24 8 C 23 28, 26 50, 25 70 M 25 70 L 14 56 M 25 70 L 36 58"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Default right arrow
  return (
    <svg
      viewBox="0 0 90 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
    >
      <path
        d="M8 20 C 30 18, 55 22, 78 19 M 78 19 L 64 10 M 78 19 L 65 29"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn rough double circle for editorial highlights
 */
export function HandDrawnCircle({
  className = "",
  color = "#b91c1c",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full select-none pointer-events-none ${className}`}
    >
      <path
        d="M22 42 C 18 20, 52 10, 88 12 C 128 14, 150 25, 146 48 C 142 66, 108 72, 64 70 C 26 68, 12 55, 16 38 C 20 22, 60 14, 104 15 C 138 16, 152 32, 144 46"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="300"
        strokeDashoffset="0"
        className="opacity-85"
      />
    </svg>
  );
}

/**
 * Authentic Japanese Hanko / Inkan Red Ink Stamp
 */
export function HankoStamp({
  text = "海賊狩り",
  subText,
  size = "md",
  className = "",
  rotation = -4,
}: {
  text?: string;
  subText?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  rotation?: number;
}) {
  const sizeClasses = {
    sm: "w-14 h-14 text-sm",
    md: "w-20 h-20 text-lg",
    lg: "w-24 h-24 text-2xl",
  }[size];

  return (
    <div
      className={`inline-flex flex-col items-center justify-center border-2 border-red-700/80 rounded-sm p-1 text-red-700/85 font-black select-none pointer-events-none transition-transform duration-300 ${sizeClasses} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        fontFamily: '"Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP", serif',
        boxShadow: "inset 0 0 8px rgba(185, 28, 28, 0.25), 0 1px 3px rgba(0,0,0,0.12)",
        backgroundColor: "rgba(220, 38, 38, 0.04)",
      }}
    >
      <div className="border border-red-700/60 w-full h-full flex flex-col items-center justify-center p-0.5 relative overflow-hidden">
        {/* Weathered stamp texture simulation */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-700/10 to-transparent mix-blend-multiply opacity-50" />
        <span className="tracking-widest leading-none text-center font-serif whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
          {text}
        </span>
        {subText && (
          <span className="text-[8px] font-mono tracking-tighter opacity-75 mt-0.5">
            {subText}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Masking / Washi Tape Strip
 */
export function WashiTape({
  className = "",
  angle = -2,
  color = "#e5ddcb",
  width = "w-24 md:w-32",
}: {
  className?: string;
  angle?: number;
  color?: string;
  width?: string;
}) {
  return (
    <div
      className={`h-6 ${width} rounded-[1px] select-none pointer-events-none opacity-80 backdrop-blur-[1px] shadow-[0_1px_4px_rgba(0,0,0,0.15)] ${className}`}
      style={{
        backgroundColor: color,
        transform: `rotate(${angle}deg)`,
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)",
      }}
    />
  );
}

/**
 * Brass Sketchbook Pin
 */
export function BrassPin({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_2px_4px_rgba(0,0,0,0.35)] border border-amber-200/60 select-none pointer-events-none ${className}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-amber-100/80 m-0.5" />
    </div>
  );
}

/**
 * Sumi-e Ink Splatters (Vector drops)
 */
export function SumiSplatter({
  className = "",
  variant = 1,
}: {
  className?: string;
  variant?: 1 | 2 | 3;
}) {
  if (variant === 2) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        className={`inline-block pointer-events-none select-none text-neutral-900/70 ${className}`}
      >
        <circle cx="50" cy="50" r="14" />
        <circle cx="72" cy="38" r="5" />
        <circle cx="32" cy="68" r="4" />
        <circle cx="78" cy="65" r="3" />
        <circle cx="25" cy="32" r="6" />
        <circle cx="62" cy="74" r="2.5" />
        <path d="M50 40 Q 56 22 62 25 Q 58 35 50 40 Z" />
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="currentColor"
        className={`inline-block pointer-events-none select-none text-neutral-900/65 ${className}`}
      >
        <circle cx="60" cy="60" r="18" />
        <circle cx="88" cy="45" r="7" />
        <circle cx="35" cy="80" r="6" />
        <circle cx="95" cy="82" r="4" />
        <circle cx="28" cy="40" r="8" />
        <circle cx="45" cy="20" r="3" />
        <circle cx="78" cy="98" r="5" />
        <circle cx="15" cy="65" r="2.5" />
        <path d="M60 45 Q 68 25 76 28 Q 70 42 60 45 Z" />
      </svg>
    );
  }

  // Variant 1
  return (
    <svg
      viewBox="0 0 80 80"
      fill="currentColor"
      className={`inline-block pointer-events-none select-none text-neutral-900/75 ${className}`}
    >
      <circle cx="40" cy="40" r="10" />
      <circle cx="56" cy="30" r="4" />
      <circle cx="26" cy="52" r="3.5" />
      <circle cx="60" cy="52" r="2" />
      <circle cx="22" cy="28" r="5" />
    </svg>
  );
}

/**
 * Finely cut, deformed, continuous painted washi paper edge transition
 */
export function PaintedCutEdge({
  className = "",
  fill = "#f5efe2",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 1440 70"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 md:h-16 lg:h-20 block filter drop-shadow-[0_-4px_10px_rgba(0,0,0,0.35)]"
      >
        <path
          d="M0,70 L0,45.67 C2.0,45.8 8.0,46.2 12,46.15 C16.0,46.1 20.0,45.8 24,45.64 C28.0,45.4 32.0,45.1 36,44.95 C40.0,44.8 44.0,44.7 48,44.67 C52.0,44.6 56.0,44.7 60,44.62 C64.0,44.5 68.0,44.4 72,44.07 C76.0,43.7 80.0,43.1 84,42.47 C88.0,41.8 92.0,40.9 96,40.12 C100.0,39.4 104.0,38.5 108,38.02 C112.0,37.5 116.0,37.2 120,37.23 C124.0,37.2 128.0,37.6 132,37.97 C136.0,38.3 140.0,39.0 144,39.49 C148.0,39.9 152.0,40.4 156,40.63 C160.0,40.8 164.0,40.8 168,40.74 C172.0,40.7 176.0,40.3 180,40.09 C184.0,39.9 188.0,39.6 192,39.49 C196.0,39.4 200.0,39.4 204,39.52 C208.0,39.6 212.0,39.9 216,40.01 C220.0,40.1 224.0,40.3 228,40.19 C232.0,40.1 236.0,39.8 240,39.52 C244.0,39.2 248.0,38.6 252,38.24 C256.0,37.9 260.0,37.4 264,37.32 C268.0,37.2 272.0,37.3 276,37.71 C280.0,38.1 284.0,38.8 288,39.54 C292.0,40.2 296.0,41.2 300,41.95 C304.0,42.7 308.0,43.4 312,43.76 C316.0,44.2 320.0,44.3 324,44.31 C328.0,44.3 332.0,44.0 336,43.89 C340.0,43.7 344.0,43.4 348,43.35 C352.0,43.3 356.0,43.3 360,43.3 C364.0,43.3 368.0,43.6 372,43.58 C376.0,43.6 380.0,43.7 384,43.46 C388.0,43.3 392.0,42.9 396,42.43 C400.0,42.0 404.0,41.3 408,40.77 C412.0,40.3 416.0,39.7 420,39.48 C424.0,39.3 428.0,39.3 432,39.48 C436.0,39.7 440.0,40.3 444,40.85 C448.0,41.4 452.0,42.2 456,42.74 C460.0,43.3 464.0,43.8 468,43.97 C472.0,44.2 476.0,44.1 480,43.97 C484.0,43.8 488.0,43.4 492,43.08 C496.0,42.8 500.0,42.4 504,42.24 C508.0,42.1 512.0,42.0 516,42.08 C520.0,42.1 524.0,42.4 528,42.46 C532.0,42.6 536.0,42.7 540,42.66 C544.0,42.6 548.0,42.4 552,42.19 C556.0,42.0 560.0,41.5 564,41.32 C568.0,41.1 572.0,40.9 576,40.97 C580.0,41.1 584.0,41.4 588,42.0 C592.0,42.6 596.0,43.5 600,44.39 C604.0,45.3 608.0,46.4 612,47.21 C616.0,48.0 620.0,48.8 624,49.25 C628.0,49.7 632.0,49.9 636,49.91 C640.0,50.0 644.0,49.7 648,49.56 C652.0,49.4 656.0,49.2 660,49.13 C664.0,49.1 668.0,49.1 672,49.25 C676.0,49.4 680.0,49.6 684,49.73 C688.0,49.8 692.0,50.0 696,49.85 C700.0,49.7 704.0,49.4 708,49.08 C712.0,48.7 716.0,48.1 720,47.69 C724.0,47.3 728.0,46.8 732,46.58 C736.0,46.4 740.0,46.4 744,46.53 C748.0,46.7 752.0,47.2 756,47.49 C760.0,47.8 764.0,48.4 768,48.52 C772.0,48.7 776.0,48.7 780,48.44 C784.0,48.1 788.0,47.5 792,46.75 C796.0,46.0 800.0,44.9 804,43.93 C808.0,43.0 812.0,41.9 816,40.99 C820.0,40.1 824.0,39.3 828,38.64 C832.0,37.9 836.0,37.4 840,36.76 C844.0,36.1 848.0,35.5 852,34.68 C856.0,33.9 860.0,32.9 864,31.92 C868.0,30.9 872.0,29.7 876,28.79 C880.0,27.8 884.0,26.8 888,26.21 C892.0,25.6 896.0,25.2 900,24.96 C904.0,24.8 908.0,24.9 912,24.98 C916.0,25.0 920.0,25.3 924,25.3 C928.0,25.3 932.0,25.2 936,24.8 C940.0,24.4 944.0,23.7 948,23.03 C952.0,22.3 956.0,21.3 960,20.54 C964.0,19.8 968.0,18.9 972,18.36 C976.0,17.8 980.0,17.4 984,17.18 C988.0,16.9 992.0,16.9 996,16.85 C1000.0,16.8 1004.0,16.8 1008,16.65 C1012.0,16.5 1016.0,16.3 1020,16.05 C1024.0,15.8 1028.0,15.4 1032,15.29 C1036.0,15.1 1040.0,15.0 1044,15.2 C1048.0,15.4 1052.0,15.8 1056,16.45 C1060.0,17.1 1064.0,18.0 1068,18.87 C1072.0,19.7 1076.0,20.7 1080,21.41 C1084.0,22.1 1088.0,22.7 1092,22.94 C1096.0,23.2 1100.0,23.1 1104,23.0 C1108.0,22.9 1112.0,22.4 1116,22.16 C1120.0,21.9 1124.0,21.6 1128,21.47 C1132.0,21.4 1136.0,21.4 1140,21.59 C1144.0,21.7 1148.0,22.1 1152,22.33 C1156.0,22.6 1160.0,22.9 1164,22.96 C1168.0,23.1 1172.0,23.0 1176,22.92 C1180.0,22.8 1184.0,22.5 1188,22.45 C1192.0,22.4 1196.0,22.2 1200,22.36 C1204.0,22.5 1208.0,22.9 1212,23.31 C1216.0,23.8 1220.0,24.5 1224,25.11 C1228.0,25.7 1232.0,26.4 1236,26.76 C1240.0,27.1 1244.0,27.3 1248,27.17 C1252.0,27.0 1256.0,26.6 1260,26.02 C1264.0,25.5 1268.0,24.6 1272,23.98 C1276.0,23.3 1280.0,22.6 1284,22.16 C1288.0,21.7 1292.0,21.5 1296,21.29 C1300.0,21.1 1304.0,21.2 1308,21.19 C1312.0,21.2 1316.0,21.2 1320,21.11 C1324.0,21.0 1328.0,20.8 1332,20.54 C1336.0,20.3 1340.0,19.9 1344,19.7 C1348.0,19.5 1352.0,19.3 1356,19.39 C1360.0,19.5 1364.0,19.8 1368,20.22 C1372.0,20.7 1376.0,21.4 1380,21.98 C1384.0,22.6 1388.0,23.3 1392,23.64 C1396.0,24.0 1400.0,24.2 1404,24.16 C1408.0,24.1 1412.0,23.7 1416,23.24 C1420.0,22.8 1424.0,22.1 1428,21.59 C1432.0,21.1 1438.0,20.5 1440,20.33 L1440,70 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
