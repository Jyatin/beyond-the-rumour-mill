import * as React from "react";

/**
 * Clean vector SVG logos for Social Auth buttons (Google & LinkedIn)
 */
export function GoogleIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28M7.86 18.5V10.13H5.07V18.5h2.79z" />
    </svg>
  );
}

/**
 * SIGNUP EDITORIAL SCENE
 * Hand-drawn paper-and-ink illustration inspired by the User Interviews banner & team artwork.
 * Shows placed alumni and tomorrow's talent holding a collaborative banner with stars,
 * dossier badges, and authentic connection lines.
 */
export function SignUpEditorialArtwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 420" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="ink-signup" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
        </filter>
      </defs>

      <g filter="url(#ink-signup)">
        {/* Soft paper backdrop aura */}
        <ellipse cx="300" cy="210" rx="260" ry="180" fill="#F0EAF7" fillOpacity="0.45" />

        {/* 1. Large Hand-Drawn Banner Held High */}
        <g transform="translate(130 35) rotate(-1)">
          {/* Banner Poles */}
          <path d="M15 110 L15 10" stroke="#111016" strokeWidth="3" strokeLinecap="round" />
          <path d="M325 110 L325 10" stroke="#111016" strokeWidth="3" strokeLinecap="round" />

          {/* Banner Cloth */}
          <path
            d="M15 20 C90 10 250 12 325 20 L315 90 C240 82 85 84 15 90 Z"
            fill="#FFFFFF"
            stroke="#111016"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Small 4-dots brand symbol on banner */}
          <circle cx="170" cy="42" r="3.5" fill="#111016" />
          <circle cx="178" cy="42" r="3.5" fill="#111016" />
          <circle cx="170" cy="50" r="3.5" fill="#111016" />
          <circle cx="178" cy="50" r="3.5" fill="#111016" />

          <text
            x="170"
            y="72"
            textAnchor="middle"
            fill="#111016"
            fontFamily="var(--font-display)"
            fontSize="15"
            fontWeight="bold"
            letterSpacing="0.5"
          >
            beyond the rumour mill
          </text>
        </g>

        {/* 2. Group of Connected People (Team / Community) */}

        {/* Character 1 (Left: Placed Alumni - SDE) */}
        <g transform="translate(120 120)">
          {/* Body */}
          <path
            d="M30 115 C10 135 0 165 5 215 L85 215 C90 165 80 135 65 115 Z"
            fill="#557D70"
            stroke="#111016"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Arm holding left pole */}
          <path d="M25 125 C15 80 20 40 25 25" stroke="#111016" strokeWidth="3" strokeLinecap="round" />
          {/* Head & Hair */}
          <circle cx="48" cy="65" r="28" fill="#FFFFFF" stroke="#111016" strokeWidth="2.6" />
          <path d="M22 55 C22 28 52 18 72 25 C82 32 80 48 72 58 C58 46 38 48 24 56 Z" fill="#111016" />
          {/* Face */}
          <circle cx="40" cy="68" r="2.5" fill="#111016" />
          <circle cx="56" cy="68" r="2.5" fill="#111016" />
          <path d="M42 80 C48 85 54 85 58 80" stroke="#111016" strokeWidth="2" strokeLinecap="round" />

          {/* Badge: SDE Placed */}
          <g transform="translate(-10 140) rotate(-6)">
            <rect x="0" y="0" width="76" height="24" rx="3" fill="#FFFFFF" stroke="#111016" strokeWidth="1.8" />
            <text x="6" y="16" fill="#111016" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">
              ✓ SDE-1
            </text>
          </g>
        </g>

        {/* Character 2 (Center-Left: Placed Mentor with Offer Dossier) */}
        <g transform="translate(210 130)">
          <path
            d="M30 115 C12 135 5 165 10 205 L80 205 C85 165 78 135 60 115 Z"
            fill="#E5D9F1"
            stroke="#111016"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="45" cy="65" r="27" fill="#FFFFFF" stroke="#111016" strokeWidth="2.6" />
          <path d="M22 55 C25 30 65 20 74 32 C80 40 76 54 68 60 C54 48 35 50 24 58 Z" fill="#111016" />
          <circle cx="38" cy="68" r="2.5" fill="#111016" />
          <circle cx="54" cy="68" r="2.5" fill="#111016" />
          <path d="M40 80 C46 86 52 86 56 80" stroke="#111016" strokeWidth="2" strokeLinecap="round" />

          {/* Central Logo Stamp on Shirt */}
          <circle cx="42" cy="145" r="2.5" fill="#111016" />
          <circle cx="48" cy="145" r="2.5" fill="#111016" />
          <circle cx="42" cy="151" r="2.5" fill="#111016" />
          <circle cx="48" cy="151" r="2.5" fill="#111016" />
        </g>

        {/* Character 3 (Center-Right: Tomorrow's Candidate with Laptop) */}
        <g transform="translate(300 130)">
          <path
            d="M25 115 C8 135 2 165 8 205 L78 205 C84 165 76 135 58 115 Z"
            fill="#B9CFC5"
            stroke="#111016"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="43" cy="65" r="27" fill="#FFFFFF" stroke="#111016" strokeWidth="2.6" />
          <path d="M20 52 C22 25 58 18 72 28 C80 35 76 52 66 60 C52 48 34 50 22 58 Z" fill="#111016" />
          <circle cx="36" cy="68" r="2.5" fill="#111016" />
          <circle cx="52" cy="68" r="2.5" fill="#111016" />
          <path d="M38 80 C44 86 50 86 54 80" stroke="#111016" strokeWidth="2" strokeLinecap="round" />

          {/* Laptop open in hands */}
          <path d="M15 160 L30 130 L70 130 L85 160 Z" fill="#FFFFFF" stroke="#111016" strokeWidth="2" strokeLinejoin="round" />
          <path d="M10 160 L90 160 L85 170 L15 170 Z" fill="#F7F6FB" stroke="#111016" strokeWidth="2" strokeLinejoin="round" />
        </g>

        {/* Character 4 (Right: Placed Alumni holding right pole) */}
        <g transform="translate(390 120)">
          <path
            d="M30 115 C10 135 0 165 5 215 L85 215 C90 165 80 135 65 115 Z"
            fill="#E9B9B7"
            stroke="#111016"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Arm holding right pole */}
          <path d="M65 125 C75 80 70 40 65 25" stroke="#111016" strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="65" r="28" fill="#FFFFFF" stroke="#111016" strokeWidth="2.6" />
          <path d="M24 55 C26 28 65 18 78 28 C85 36 82 52 74 60 C60 48 40 50 26 58 Z" fill="#111016" />
          <circle cx="42" cy="68" r="2.5" fill="#111016" />
          <circle cx="58" cy="68" r="2.5" fill="#111016" />
          <path d="M46 80 C52 86 58 86 62 80" stroke="#111016" strokeWidth="2" strokeLinecap="round" />

          {/* Badge: Product Analyst */}
          <g transform="translate(35 140) rotate(5)">
            <rect x="0" y="0" width="85" height="24" rx="3" fill="#FFFFFF" stroke="#111016" strokeWidth="1.8" />
            <text x="6" y="16" fill="#735196" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">
              ✓ ANALYST
            </text>
          </g>
        </g>

        {/* Ground Baseline */}
        <path d="M80 335 C220 330 380 330 520 335" stroke="#111016" strokeWidth="2.8" strokeLinecap="round" />

        {/* Floating Sparkles, Stars and Hand-Drawn Doodles */}
        <path d="M80 70 L84 80 L94 84 L84 88 L80 98 L76 88 L66 84 L76 80 Z" fill="#E5C85C" stroke="#111016" strokeWidth="1.6" />
        <path d="M510 80 L514 90 L524 94 L514 98 L510 108 L506 98 L496 94 L506 90 Z" fill="#9B7BC4" stroke="#111016" strokeWidth="1.6" />
        <path d="M300 20 L303 27 L310 29 L303 31 L300 38 L297 31 L290 29 L297 27 Z" fill="#E9B9B7" stroke="#111016" strokeWidth="1.4" />
        
        {/* Curved connection path underneath */}
        <path d="M120 365 C220 385 380 385 480 365" stroke="#9B7BC4" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * LOGIN EDITORIAL SCENE
 * Visual metaphor: "Good conversations change what's possible."
 * Shows a placed mentor and student candidate in an engaging, authentic 1-on-1 dialogue
 * with speech bubbles, coffee mug, floating interview notes, and verified stamps.
 */
export function LoginEditorialArtwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 420" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="ink-login" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
        </filter>
      </defs>

      <g filter="url(#ink-login)">
        {/* Soft paper backdrop aura */}
        <ellipse cx="300" cy="210" rx="260" ry="180" fill="#E5D9F1" fillOpacity="0.35" />

        {/* Desk / Conversation Line */}
        <path d="M70 340 C220 335 380 335 530 340" stroke="#111016" strokeWidth="2.8" strokeLinecap="round" />

        {/* Character 1: Placed Mentor (Left - Sharing Insight) */}
        <g transform="translate(90 120)">
          {/* Body */}
          <path
            d="M35 125 C15 145 5 175 10 220 L95 220 C100 175 90 145 70 125 Z"
            fill="#557D70"
            stroke="#111016"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Arm gesturing forward */}
          <path d="M70 145 C100 135 125 145 150 135" stroke="#111016" strokeWidth="2.8" strokeLinecap="round" />
          {/* Head & Hair */}
          <circle cx="52" cy="70" r="30" fill="#FFFFFF" stroke="#111016" strokeWidth="2.6" />
          <path d="M25 60 C25 30 58 18 80 28 C90 35 88 52 80 62 C64 50 42 50 28 60 Z" fill="#111016" />
          {/* Face */}
          <circle cx="44" cy="72" r="2.5" fill="#111016" />
          <circle cx="62" cy="72" r="2.5" fill="#111016" />
          <path d="M46 86 C54 92 62 92 68 86" stroke="#111016" strokeWidth="2" strokeLinecap="round" />

          {/* Mentor Tag */}
          <g transform="translate(10 20) rotate(-6)">
            <rect x="0" y="0" width="95" height="26" rx="4" fill="#FFFFFF" stroke="#111016" strokeWidth="1.8" />
            <text x="8" y="17" fill="#557D70" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="bold">
              ✓ PLACED ALUMNI
            </text>
          </g>
        </g>

        {/* Speech Bubble 1: Alumni Advice */}
        <g transform="translate(160 45) rotate(-2)">
          <rect x="0" y="0" width="180" height="52" rx="6" fill="#FFFFFF" stroke="#111016" strokeWidth="2.2" />
          <path d="M30 52 L20 68 L45 52 Z" fill="#FFFFFF" stroke="#111016" strokeWidth="2.2" strokeLinejoin="round" />
          <text x="12" y="22" fill="#111016" fontFamily="var(--font-sans)" fontSize="11" fontWeight="bold">
            “Explain your thought process”
          </text>
          <text x="12" y="38" fill="#735196" fontFamily="var(--font-mono)" fontSize="9">
            Google L3 Interview Insight
          </text>
        </g>

        {/* Character 2: Tomorrow's Candidate (Right - Listening & Preparing) */}
        <g transform="translate(390 120)">
          {/* Body */}
          <path
            d="M30 125 C10 145 0 175 5 220 L90 220 C95 175 85 145 65 125 Z"
            fill="#E9B9B7"
            stroke="#111016"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          {/* Arm holding pen */}
          <path d="M25 145 C5 140 -10 150 -25 145" stroke="#111016" strokeWidth="2.8" strokeLinecap="round" />
          {/* Head & Hair */}
          <circle cx="48" cy="70" r="30" fill="#FFFFFF" stroke="#111016" strokeWidth="2.6" />
          <path d="M20 58 C22 28 65 18 78 30 C86 38 82 56 72 64 C58 52 38 54 22 62 Z" fill="#111016" />
          <circle cx="40" cy="72" r="2.5" fill="#111016" />
          <circle cx="58" cy="72" r="2.5" fill="#111016" />
          <path d="M44 86 C50 92 56 92 62 86" stroke="#111016" strokeWidth="2" strokeLinecap="round" />

          {/* Candidate Badge */}
          <g transform="translate(20 20) rotate(5)">
            <rect x="0" y="0" width="115" height="26" rx="4" fill="#FFFFFF" stroke="#111016" strokeWidth="1.8" />
            <text x="8" y="17" fill="#AA654E" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">
              ○ 2026 CANDIDATE
            </text>
          </g>
        </g>

        {/* Speech Bubble 2: Student Question */}
        <g transform="translate(320 40) rotate(2)">
          <rect x="0" y="0" width="180" height="52" rx="6" fill="#FFFFFF" stroke="#111016" strokeWidth="2.2" />
          <path d="M120 52 L140 68 L130 52 Z" fill="#FFFFFF" stroke="#111016" strokeWidth="2.2" strokeLinejoin="round" />
          <text x="12" y="22" fill="#111016" fontFamily="var(--font-sans)" fontSize="11" fontWeight="bold">
            “How deep did they go in OS?”
          </text>
          <text x="12" y="38" fill="#AA654E" fontFamily="var(--font-mono)" fontSize="9">
            Preparing for Systems Round
          </text>
        </g>

        {/* Coffee Mug on Table */}
        <g transform="translate(280 280)">
          <rect x="0" y="8" width="30" height="38" rx="3" fill="#FFFFFF" stroke="#111016" strokeWidth="2.2" />
          <path d="M30 16 C40 16 40 30 30 30" stroke="#111016" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M8 0 C12 -8 6 -12 10 -18" stroke="#9B7BC4" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 0 C22 -8 16 -12 20 -18" stroke="#9B7BC4" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* Floating Interview Dossier Card */}
        <g transform="translate(230 150) rotate(-4)">
          <rect x="0" y="0" width="125" height="110" rx="4" fill="#FFFFFF" stroke="#111016" strokeWidth="2.2" />
          <text x="10" y="20" fill="#111016" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">
            INTERVIEW DOSSIER
          </text>
          <path d="M10 32 H110 M10 44 H95 M10 56 H105" stroke="#DED7E8" strokeWidth="1.8" strokeLinecap="round" />
          <g transform="translate(10 68)">
            <rect x="0" y="0" width="95" height="24" rx="3" fill="#557D70" />
            <text x="8" y="16" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="bold">
              ✓ VERIFIED INTEL
            </text>
          </g>
        </g>

        {/* Floating Stars and Sparkles */}
        <path d="M90 70 L94 80 L104 84 L94 88 L90 98 L86 88 L76 84 L86 80 Z" fill="#E5C85C" stroke="#111016" strokeWidth="1.6" />
        <path d="M520 70 L524 80 L534 84 L524 88 L520 98 L516 88 L506 84 L516 80 Z" fill="#8D6BB3" stroke="#111016" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
