import * as React from "react";

/**
 * Hand-drawn flowing organic vector connector lines and subtle pastel doodle accents
 * connecting the four corners of the editorial hero canvas.
 */
export function ConnectingRibbons({
  className
}) {
  return <svg viewBox="0 0 1440 860" fill="none" xmlns="http://www.w3.org/2000/svg" className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className ?? ""}`} preserveAspectRatio="xMidYMid meet">
      {/* 1. Left flowing organic connector line looping from top-left around to bottom-left and across the bottom */}
      <path d="M260 90 C160 140, 50 250, 58 400 C65 520, 85 610, 60 700 C45 770, 85 810, 190 825 C320 840, 500 815, 640 810 C780 805, 960 840, 1100 845 C1220 850, 1340 810, 1400 770" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" />

      {/* 2. Right flowing top loop connecting the offer celebration and profile */}
      <path d="M1180 160 C1110 120, 1070 200, 1090 280 C1105 340, 1170 380, 1200 440 C1220 480, 1210 540, 1170 590" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-75" />

      {/* 3. Pastel Star Accents (#D889A8 Dusty Pink, #216F70 Teal, #DCEEEF Light Teal) */}
      <g className="animate-pulse" style={{
      animationDuration: "4s"
    }}>
        {/* Center-Top Left Dusty Pink Star */}
        <path d="M340 180 L344 187 L352 187 L346 192 L348 200 L340 195 L332 200 L334 192 L328 187 L336 187 Z" stroke="#D889A8" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* Center-Top Right Teal Sparkle */}
        <path d="M1060 140 L1064 146 L1071 146 L1066 150 L1068 157 L1060 152 L1052 157 L1054 150 L1049 146 L1056 146 Z" stroke="#216F70" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* Bottom Center-Left Pastel Dots */}
        <circle cx="540" cy="780" r="3.5" fill="#D889A8" fillOpacity="0.6" />
        <circle cx="640" cy="820" r="4.5" fill="#DCEEEF" stroke="#216F70" strokeWidth="1.2" />
        <circle cx="920" cy="815" r="3.5" fill="#D889A8" fillOpacity="0.7" />

        {/* Bottom Right Dusty Pink Star */}
        <path d="M1360 490 L1364 496 L1371 496 L1366 500 L1368 507 L1360 502 L1352 507 L1354 500 L1349 496 L1356 496 Z" stroke="#D889A8" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </g>
    </svg>;
}