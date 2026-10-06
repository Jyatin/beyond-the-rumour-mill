import * as React from "react";

/**
 * Bottom-Left Editorial Sticker:
 * Video call mentorship window with girl in dark teal top talking,
 * participant bubble, speech bubble, and video camera icon.
 */
export function BottomLeftCallSticker({
  className
}) {
  return <div className={`relative select-none pointer-events-none ${className ?? ""}`}>
      <svg viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm">
        {/* Main Video Call Window Card */}
        <g transform="translate(20, 30)">
          {/* Main Window Frame */}
          <rect x="0" y="0" width="250" height="210" rx="12" fill="#FFFFFF" stroke="#171717" strokeWidth="2.2" />

          {/* Window Header Dots */}
          <circle cx="20" cy="18" r="3.5" fill="#171717" />
          <circle cx="32" cy="18" r="3.5" fill="#171717" />
          <circle cx="44" cy="18" r="3.5" fill="#171717" />

          {/* Camera Icon on Left */}
          <g transform="translate(-22, 105)">
            <rect x="0" y="0" width="28" height="20" rx="4" fill="#DCEEEF" stroke="#171717" strokeWidth="1.8" />
            <polygon points="28,4 38,-1 38,21 28,16" fill="#DCEEEF" stroke="#171717" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="14" cy="10" r="4" fill="#216F70" />
          </g>

          {/* Girl Mentor Character (Dark Teal Top) */}
          <g transform="translate(15, 30)">
            {/* Long Wavy Hair */}
            <path d="M35 50 C20 30, 45 10, 80 12 C105 10, 130 30, 125 60 C125 90, 135 125, 130 145 C120 150, 105 145, 100 135 C95 105, 95 65, 80 60 C65 65, 60 105, 45 135 C40 145, 25 150, 20 140 C15 120, 25 80, 35 50 Z" fill="#171717" />
            {/* Face */}
            <path d="M58 45 C58 45, 62 78, 80 82 C98 78, 102 45, 102 45" fill="#FFEEDD" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
            {/* Eyes & Smile */}
            <ellipse cx="70" cy="56" rx="2" ry="3" fill="#171717" />
            <ellipse cx="88" cy="56" rx="2" ry="3" fill="#171717" />
            <path d="M66 50 Q72 48 76 51" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M84 51 Q88 48 94 50" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M72 68 Q80 74 88 68" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="66" cy="62" r="3.5" fill="#D889A8" fillOpacity="0.4" />
            <circle cx="92" cy="62" r="3.5" fill="#D889A8" fillOpacity="0.4" />

            {/* Dark Teal Top / Sweater */}
            <path d="M42 120 C50 90, 70 85, 80 85 C90 85, 110 90, 118 120 L115 178 L45 178 Z" fill="#216F70" stroke="#171717" strokeWidth="2.2" strokeLinejoin="round" />

            {/* Gesturing Hand in Discussion */}
            <path d="M110 115 C125 110, 145 112, 160 105 L155 98 C142 102, 125 102, 115 106 Z" fill="#FFEEDD" stroke="#171717" strokeWidth="1.8" />
            {/* Extended fingers */}
            <path d="M158 102 C168 100, 172 104, 165 108 L154 110" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* Small Participant Video Bubble (Boy Listening) */}
          <g transform="translate(170, 110)">
            <rect x="0" y="0" width="68" height="80" rx="8" fill="#FFFFFF" stroke="#171717" strokeWidth="1.8" />
            {/* Boy character sketch */}
            <circle cx="34" cy="30" r="14" fill="#FFEEDD" stroke="#171717" strokeWidth="1.6" />
            <path d="M22 24 C22 14, 46 14, 46 24 Z" fill="#171717" />
            <ellipse cx="30" cy="30" rx="1.5" ry="2" fill="#171717" />
            <ellipse cx="38" cy="30" rx="1.5" ry="2" fill="#171717" />
            <path d="M31 36 Q34 38 37 36" stroke="#171717" strokeWidth="1.2" strokeLinecap="round" />
            {/* Boy shirt */}
            <path d="M14 74 C14 54, 54 54, 54 74 Z" fill="#DCEEEF" stroke="#171717" strokeWidth="1.6" />
          </g>
        </g>

        {/* Floating Speech Bubble */}
        <g transform="translate(250, 45)" className="animate-bounce" style={{
        animationDuration: "4.5s"
      }}>
          <rect x="0" y="0" width="56" height="38" rx="8" fill="#FFFFFF" stroke="#171717" strokeWidth="2" />
          {/* Tail */}
          <polygon points="12,38 18,48 24,38" fill="#FFFFFF" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
          <line x1="12" y1="38" x2="24" y2="38" stroke="#FFFFFF" strokeWidth="3" />
          {/* Dots ... */}
          <circle cx="16" cy="19" r="2.5" fill="#171717" />
          <circle cx="28" cy="19" r="2.5" fill="#171717" />
          <circle cx="40" cy="19" r="2.5" fill="#171717" />
        </g>

        {/* Decorative Stars */}
        <g className="animate-pulse" style={{
        animationDuration: "3s"
      }}>
          <path d="M10 250 L14 256 L21 256 L16 261 L18 268 L11 263 L4 268 L6 261 L1 256 L8 256 Z" stroke="#D889A8" strokeWidth="1.5" fill="none" />
          <path d="M340 220 L343 226 L350 226 L345 230 L347 237 L340 232 L333 237 L335 230 L330 226 L337 226 Z" stroke="#216F70" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>;
}