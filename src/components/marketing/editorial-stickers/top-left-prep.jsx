import * as React from "react";

/**
 * Top-Left Editorial Sticker:
 * Student preparing for interviews with laptop, books, coffee mug,
 * floating lightbulb idea bubble, browser wireframe card with </> and checklist.
 */
export function TopLeftPrepSticker({
  className
}) {
  return <div className={`relative select-none pointer-events-none ${className ?? ""}`}>
      <svg viewBox="0 0 380 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm">
        {/* Floating Lightbulb Thought Bubble */}
        <g className="animate-bounce" style={{
        animationDuration: "4s"
      }}>
          {/* Thought bubbles */}
          <circle cx="95" cy="95" r="4.5" fill="#171717" />
          <circle cx="106" cy="78" r="6" fill="#171717" />
          {/* Cloud bubble */}
          <path d="M110 50 C100 50, 95 35, 110 25 C120 10, 145 10, 155 25 C170 15, 185 30, 175 45 C185 55, 175 70, 160 68 C150 78, 125 78, 115 65 C105 65, 100 55, 110 50 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Lightbulb inside */}
          <path d="M138 28 C131 28, 126 33, 126 40 C126 44, 128 47, 131 50 L131 54 L145 54 L145 50 C148 47, 150 44, 150 40 C150 33, 145 28, 138 28 Z" fill="#FFF5C2" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M133 54 L143 54 M134 57 L142 57" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M138 34 L138 42 M134 38 L142 38" stroke="#E5C85C" strokeWidth="1.5" strokeLinecap="round" />
          {/* Sparkle rays */}
          <path d="M120 22 L115 17 M138 18 L138 11 M156 22 L161 17" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* Browser Wireframe Card with </> and checklist */}
        <g transform="translate(180, 50)">
          {/* Card outline */}
          <rect x="0" y="0" width="140" height="115" rx="8" fill="#FFFFFF" stroke="#171717" strokeWidth="2" />
          {/* Card header */}
          <line x1="0" y1="22" x2="140" y2="22" stroke="#171717" strokeWidth="1.6" />
          <circle cx="10" cy="11" r="2.5" fill="#D889A8" />
          <circle cx="18" cy="11" r="2.5" fill="#E5C85C" />
          <circle cx="26" cy="11" r="2.5" fill="#216F70" />

          {/* Left code symbol box */}
          <rect x="12" y="32" width="46" height="68" rx="4" fill="#F4FAF9" stroke="#171717" strokeWidth="1.6" />
          <text x="23" y="72" fontFamily="monospace" fontSize="20" fontWeight="bold" fill="#216F70">
            &lt;/&gt;
          </text>

          {/* Right Checklist */}
          <rect x="68" y="36" width="10" height="10" rx="2" fill="#DCEEEF" stroke="#171717" strokeWidth="1.4" />
          <line x1="84" y1="41" x2="126" y2="41" stroke="#171717" strokeWidth="2" strokeLinecap="round" />

          <rect x="68" y="56" width="10" height="10" rx="2" fill="#FFFFFF" stroke="#171717" strokeWidth="1.4" />
          <line x1="84" y1="61" x2="122" y2="61" stroke="#171717" strokeWidth="2" strokeLinecap="round" />

          <rect x="68" y="76" width="10" height="10" rx="2" fill="#FFFFFF" stroke="#171717" strokeWidth="1.4" />
          <line x1="84" y1="81" x2="116" y2="81" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Student Boy Preparing at Desk */}
        <g transform="translate(10, 110)">
          {/* Student Character */}
          {/* Hair */}
          <path d="M100 35 C88 20, 120 0, 142 12 C154 5, 172 15, 168 32 C178 35, 175 52, 165 58 C160 62, 155 58, 152 50 C140 50, 130 55, 120 48 Z" fill="#171717" />
          {/* Face */}
          <path d="M115 38 C115 38, 120 62, 134 68 C148 68, 155 55, 155 40" fill="#FFEEDD" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
          {/* Eye, eyebrow, smile */}
          <ellipse cx="140" cy="46" rx="2" ry="3" fill="#171717" />
          <path d="M135 40 Q141 38 146 41" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M136 56 Q142 60 148 55" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="146" cy="52" r="3.5" fill="#D889A8" fillOpacity="0.4" />

          {/* Hand on Chin in Thought */}
          <path d="M130 68 C128 75, 122 88, 115 95 L110 88 C118 78, 122 70, 125 65" fill="#FFEEDD" stroke="#171717" strokeWidth="2" strokeLinecap="round" />

          {/* Hoodie Body (White/Cream with Dark Ink Outlines) */}
          <path d="M95 105 C102 78, 122 72, 140 72 C160 72, 180 78, 188 105 L182 135 L98 135 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M125 78 L122 105 M148 78 L151 105" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />

          {/* Desk Surface */}
          <path d="M10 135 L330 135" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />

          {/* Stack of Books on Desk */}
          <rect x="25" y="112" width="60" height="10" rx="2" fill="#216F70" stroke="#171717" strokeWidth="1.8" />
          <rect x="22" y="122" width="66" height="12" rx="2" fill="#DCEEEF" stroke="#171717" strokeWidth="1.8" />

          {/* Open Laptop on Desk */}
          <path d="M105 135 L120 95 L175 95 L185 135 Z" fill="#FFFFFF" stroke="#171717" strokeWidth="2" strokeLinejoin="round" />
          <line x1="95" y1="135" x2="195" y2="135" stroke="#171717" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="147" cy="112" r="3" fill="#216F70" />

          {/* Coffee Mug on Desk */}
          <rect x="205" y="110" width="22" height="25" rx="4" fill="#DCEEEF" stroke="#171717" strokeWidth="1.8" />
          <path d="M227 115 C233 115, 235 125, 227 128" stroke="#171717" strokeWidth="1.8" fill="none" />
          {/* Steam curls */}
          <path d="M212 104 Q216 98 212 92 M218 105 Q222 99 218 93" stroke="#216F70" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* Decorative Pastel Stars */}
        <g className="animate-pulse" style={{
        animationDuration: "3s"
      }}>
          <path d="M30 60 L33 66 L40 66 L34 71 L36 78 L30 73 L24 78 L26 71 L20 66 L27 66 Z" stroke="#D889A8" strokeWidth="1.5" fill="none" />
          <path d="M340 140 L343 145 L349 145 L344 149 L346 155 L340 151 L334 155 L336 149 L331 145 L337 145 Z" stroke="#216F70" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>;
}