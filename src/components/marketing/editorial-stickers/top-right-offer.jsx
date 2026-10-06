import * as React from "react";

/**
 * Top-Right Editorial Sticker:
 * Placed alumni celebrating with fist raised holding an "OFFER" letter,
 * floating briefcase doodle, celebratory stars, and LinkedIn profile card badge.
 */
export function TopRightOfferSticker({
  className
}) {
  return <div className={`relative select-none pointer-events-none ${className ?? ""}`}>
      <svg viewBox="0 0 380 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm">
        {/* Floating Briefcase Doodle */}
        <g transform="translate(40, 45)" className="animate-bounce" style={{
        animationDuration: "5s"
      }}>
          {/* Briefcase Handle */}
          <path d="M22 14 L22 6 C22 4, 34 4, 34 6 L34 14" stroke="#171717" strokeWidth="1.8" fill="none" />
          {/* Briefcase Body */}
          <rect x="6" y="14" width="44" height="32" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="2" />
          <line x1="6" y1="28" x2="50" y2="28" stroke="#171717" strokeWidth="1.6" />
          <rect x="25" y="25" width="6" height="6" rx="1" fill="#E5C85C" stroke="#171717" strokeWidth="1.4" />
        </g>

        {/* Celebrating Alumnus Character */}
        <g transform="translate(130, 20)">
          {/* Raised Left Fist (Fist of celebration) */}
          <path d="M5 45 C0 35, 10 10, 22 2 C30 -2, 38 6, 32 16 L28 42 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2.2" strokeLinejoin="round" />
          {/* Hand/Fist */}
          <path d="M20 2 C20 2, 22 -4, 28 -3 C34 -2, 36 6, 30 10 L25 15 Z" fill="#FFEEDD" stroke="#171717" strokeWidth="2" />

          {/* Head & Hair */}
          <path d="M80 38 C68 25, 95 10, 118 18 C128 12, 145 22, 142 38 C150 42, 146 58, 136 62 C132 66, 126 62, 124 55 C112 56, 104 60, 95 52 Z" fill="#171717" />
          {/* Face */}
          <path d="M92 40 C92 40, 96 64, 110 68 C124 68, 130 55, 130 42" fill="#FFEEDD" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
          {/* Eyes, happy brows, wide smile */}
          <ellipse cx="106" cy="48" rx="2" ry="3" fill="#171717" />
          <ellipse cx="120" cy="48" rx="2" ry="3" fill="#171717" />
          <path d="M102 42 Q107 40 112 43" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M116 43 Q121 40 126 42" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M106 58 Q114 66 122 58 Z" fill="#D889A8" stroke="#171717" strokeWidth="1.6" strokeLinejoin="round" />

          {/* Torso */}
          <path d="M75 105 C82 78, 102 72, 115 72 C135 72, 155 78, 162 105 L156 145 L80 145 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2.2" strokeLinejoin="round" />

          {/* Right Arm Holding "OFFER" Document */}
          <path d="M150 78 C165 72, 185 85, 195 100 L180 115 C170 102, 158 95, 146 95 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
          {/* Hand gripping paper */}
          <path d="M192 98 C198 94, 204 98, 202 106 L195 110 Z" fill="#FFEEDD" stroke="#171717" strokeWidth="1.8" />

          {/* The "OFFER" Letter Document */}
          <g transform="translate(180, 25)">
            <rect x="0" y="0" width="64" height="88" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="2" transform="rotate(8)" />
            {/* OFFER text */}
            <text x="8" y="26" fontFamily="sans-serif" fontSize="12" fontWeight="900" letterSpacing="0.05em" fill="#171717" transform="rotate(8)">
              OFFER
            </text>
            <line x1="8" y1="36" x2="48" y2="36" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" transform="rotate(8)" />
            <line x1="8" y1="46" x2="52" y2="46" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" transform="rotate(8)" />
            <line x1="8" y1="56" x2="44" y2="56" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" transform="rotate(8)" />
            <line x1="8" y1="66" x2="50" y2="66" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" transform="rotate(8)" />
          </g>

          {/* Celebratory Joy Rays */}
          <path d="M70 10 L62 0 M90 -5 L90 -16 M118 -5 L124 -16" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Hand-drawn LinkedIn Style Profile Card Badge */}
        <g transform="translate(85, 175)">
          <rect x="0" y="0" width="230" height="76" rx="10" fill="#FFFFFF" stroke="#171717" strokeWidth="2" transform="rotate(2)" />
          {/* Avatar circle */}
          <circle cx="34" cy="38" r="18" fill="#F4FAF9" stroke="#171717" strokeWidth="1.8" />
          {/* Avatar face sketch inside */}
          <circle cx="34" cy="32" r="7" fill="#171717" />
          <path d="M22 48 C22 40, 46 40, 46 48 Z" fill="#216F70" />

          {/* Profile Name & Title Lines */}
          <line x1="64" y1="28" x2="160" y2="28" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="64" y1="42" x2="140" y2="42" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="64" y1="54" x2="115" y2="54" stroke="#8E8C94" strokeWidth="1.6" strokeLinecap="round" />

          {/* LinkedIn 'in' Icon Badge */}
          <rect x="185" y="24" width="26" height="26" rx="4" fill="#216F70" />
          <text x="191" y="42" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#FFFFFF">
            in
          </text>
        </g>

        {/* Decorative Stars */}
        <g className="animate-pulse" style={{
        animationDuration: "3.5s"
      }}>
          <path d="M335 45 L339 52 L347 52 L341 57 L343 65 L335 60 L327 65 L329 57 L323 52 L331 52 Z" stroke="#D889A8" strokeWidth="1.6" fill="none" />
          <path d="M60 140 L63 146 L70 146 L65 150 L67 157 L60 152 L53 157 L55 150 L50 146 L57 146 Z" stroke="#216F70" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>;
}