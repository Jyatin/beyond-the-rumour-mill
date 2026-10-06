import * as React from "react";

/**
 * Bottom-Right Editorial Sticker:
 * Student sitting at desk typing on laptop, stack of books, potted plant,
 * floating graduation cap, speech bubble, and doodle arrow.
 */
export function BottomRightDeskSticker({
  className
}) {
  return <div className={`relative select-none pointer-events-none ${className ?? ""}`}>
      <svg viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm">
        {/* Floating Graduation Cap Doodle on Left */}
        <g transform="translate(10, 140)" className="animate-bounce" style={{
        animationDuration: "4s"
      }}>
          {/* Cap Diamond */}
          <polygon points="35,5 65,20 35,35 5,20" fill="#216F70" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
          {/* Cap Skull Base */}
          <path d="M18 27 C18 42, 52 42, 52 27" fill="#164e4f" stroke="#171717" strokeWidth="1.8" strokeLinejoin="round" />
          {/* Tassel */}
          <path d="M35 20 C35 30, 18 32, 16 48" stroke="#E5C85C" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="16" cy="48" r="2.5" fill="#E5C85C" />
        </g>

        {/* Doodle Arrow Pointing Up-Right */}
        <g transform="translate(65, 80)">
          <path d="M5 45 Q15 25 35 10 M35 10 L20 10 M35 10 L33 25" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Small Speech Bubble */}
        <g transform="translate(85, 30)" className="animate-pulse" style={{
        animationDuration: "3s"
      }}>
          <rect x="0" y="0" width="48" height="32" rx="6" fill="#FFFFFF" stroke="#171717" strokeWidth="1.8" />
          <polygon points="10,32 14,38 20,32" fill="#FFFFFF" stroke="#171717" strokeWidth="1.8" strokeLinejoin="round" />
          <line x1="10" y1="32" x2="20" y2="32" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="14" cy="16" r="2" fill="#171717" />
          <circle cx="24" cy="16" r="2" fill="#171717" />
          <circle cx="34" cy="16" r="2" fill="#171717" />
        </g>

        {/* Student at Desk with Laptop & Books */}
        <g transform="translate(80, 50)">
          {/* Head & Hair */}
          <path d="M95 38 C85 25, 110 12, 130 18 C140 12, 155 22, 152 38 C160 42, 156 58, 146 62 C142 66, 136 62, 134 55 C122 56, 114 60, 105 52 Z" fill="#171717" />
          {/* Face Profile (Facing Left towards laptop) */}
          <path d="M102 42 C102 42, 94 56, 106 65 C118 68, 126 55, 126 42" fill="#FFEEDD" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="102" cy="48" rx="2" ry="3" fill="#171717" />
          <path d="M104 42 Q108 40 113 43" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M102 58 Q108 62 114 58" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="110" cy="54" r="3.5" fill="#D889A8" fillOpacity="0.4" />

          {/* Hoodie Body (White/Cream with Dark Ink Lines) */}
          <path d="M85 105 C92 78, 112 72, 125 72 C145 72, 165 78, 172 105 L166 145 L90 145 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2.2" strokeLinejoin="round" />

          {/* Hands Typing on Laptop */}
          <path d="M98 100 C85 105, 68 115, 52 125 L45 120 C58 110, 78 98, 92 95 Z" fill="#FFEEDD" stroke="#171717" strokeWidth="1.8" />

          {/* Laptop Screen & Keyboard */}
          <path d="M5 130 L22 80 L78 80 L65 130 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
          <line x1="-5" y1="130" x2="80" y2="130" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="48" cy="105" r="3" fill="#216F70" />

          {/* Stack of Books */}
          <rect x="155" y="105" width="70" height="12" rx="2" fill="#216F70" stroke="#171717" strokeWidth="1.8" />
          <rect x="158" y="117" width="68" height="13" rx="2" fill="#DCEEEF" stroke="#171717" strokeWidth="1.8" />

          {/* Potted Leafy Plant */}
          <g transform="translate(190, 35)">
            {/* Leaves */}
            <path d="M12 25 C12 10, -5 8, 2 0 C8 -8, 22 5, 18 20" fill="#216F70" stroke="#171717" strokeWidth="1.6" />
            <path d="M18 25 C18 10, 35 8, 28 0 C22 -8, 8 5, 12 20" fill="#8AC4BE" stroke="#171717" strokeWidth="1.6" />
            <path d="M15 25 C15 5, 15 -10, 15 -10 C15 -10, 28 -5, 20 15" fill="#216F70" stroke="#171717" strokeWidth="1.6" />
            {/* Stem */}
            <line x1="15" y1="25" x2="15" y2="40" stroke="#171717" strokeWidth="2" />
            {/* Pot */}
            <polygon points="4,40 26,40 22,65 8,65" fill="#FFFFFF" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
            <line x1="2" y1="40" x2="28" y2="40" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
          </g>

          {/* Desk Line */}
          <line x1="-15" y1="130" x2="250" y2="130" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* Decorative Pastel Stars */}
        <g className="animate-pulse" style={{
        animationDuration: "3.5s"
      }}>
          <path d="M75 190 L78 196 L85 196 L80 200 L82 207 L75 202 L68 207 L70 200 L65 196 L72 196 Z" stroke="#D889A8" strokeWidth="1.5" fill="none" />
          <circle cx="270" cy="18" r="3.5" fill="#D889A8" fillOpacity="0.6" />
          <circle cx="18" cy="95" r="3.5" fill="#216F70" fillOpacity="0.5" />
        </g>
      </svg>
    </div>;
}