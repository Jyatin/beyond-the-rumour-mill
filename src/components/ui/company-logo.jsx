"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ==========================================
// VECTOR BRAND SVG DEFINITIONS
// ==========================================

function GoogleLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Google logo">
      <path
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
        fill="#4285F4"
      />
      <path
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
        fill="#34A853"
      />
      <path
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
        fill="#EA4335"
      />
    </svg>
  );
}

function MicrosoftLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Microsoft logo">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" rx="1" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" rx="1" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" rx="1" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" rx="1" />
    </svg>
  );
}

function AmazonLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Amazon logo">
      {/* Sleek Amazon Smile / Arrow mark */}
      <path
        d="M13.9 14.1c-2.3 0-4.2-.6-6.1-1.7-.3-.2-.4-.2-.6 0-.2.2-.2.5 0 .7 2.2 1.4 4.5 2 7.1 2 2.3 0 4.6-.5 6.7-1.6.4-.2.4-.6.2-.8-.2-.3-.6-.3-.9-.1-1.9 1-4.2 1.5-6.4 1.5z"
        fill="#FF9900"
      />
      <path
        d="M21.5 12.3c-.3-.4-1.8-.4-2.8-.2-.3.1-.4.3-.2.5.8 1 2.3 1 2.6.7.3-.2.7-.6.4-1z"
        fill="#FF9900"
      />
      <path
        d="M10.8 5.2c-2.8 0-4.7 1.9-4.7 4.5 0 2.4 1.6 3.9 3.8 3.9 1.4 0 2.5-.7 3.1-1.7v1.4h2.2V5.5h-2.2v1.3c-.7-.9-1.6-1.6-2.2-1.6zm.5 6.4c-1.4 0-2.4-1.1-2.4-2.6 0-1.6 1-2.7 2.4-2.7 1.4 0 2.4 1.1 2.4 2.7 0 1.5-1 2.6-2.4 2.6z"
        fill="#111111"
      />
    </svg>
  );
}

function AdobeLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Adobe logo">
      <rect width="24" height="24" rx="4" fill="#FA0F00" />
      <path
        d="M14.6 4H20v16h-3.9l-2.4-6.2h-4.8l2.5 6.2H4V4h5.4l5.2 12z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function AtlassianLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Atlassian logo">
      <defs>
        <linearGradient id="atl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0052CC" />
          <stop offset="100%" stopColor="#2684FF" />
        </linearGradient>
      </defs>
      <path
        d="M11.5 3.3c-.3-.5-.9-.5-1.2 0L4.1 14.8c-.4.6 0 1.4.8 1.4h5.8c.4 0 .7-.3.7-.7V3.3z"
        fill="url(#atl-grad)"
      />
      <path
        d="M12.5 12.3v7.9c0 .4.3.7.7.7h5.8c.7 0 1.2-.8.8-1.4l-6.1-7.2c-.3-.4-.9-.4-1.2 0z"
        fill="#2684FF"
      />
    </svg>
  );
}

function UberLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Uber logo">
      <rect width="24" height="24" rx="5" fill="#000000" />
      <text
        x="12"
        y="16"
        fill="#FFFFFF"
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="-0.5px"
      >
        Uber
      </text>
    </svg>
  );
}

function GoldmanSachsLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Goldman Sachs logo">
      <rect width="24" height="24" rx="4" fill="#7399C6" />
      <text
        x="12"
        y="14"
        fill="#FFFFFF"
        fontSize="7.5"
        fontWeight="bold"
        fontFamily="serif"
        textAnchor="middle"
      >
        GS
      </text>
      <line x1="6" y1="16.5" x2="18" y2="16.5" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
    </svg>
  );
}

function PhilipsLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Philips logo">
      <rect width="24" height="24" rx="5" fill="#0B5ED7" />
      <circle cx="12" cy="12" r="8" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Sound / Light waves */}
      <path
        d="M7 12c1.5-3 3-3 5 0s3.5 3 5 0"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Stars */}
      <polygon points="12,5.5 12.8,7.2 14.5,7.2 13.1,8.3 13.6,10 12,9 10.4,10 10.9,8.3 9.5,7.2 11.2,7.2" fill="#FFFFFF" transform="scale(0.5) translate(12, 1)" />
      <polygon points="12,17.5 12.8,19.2 14.5,19.2 13.1,20.3 13.6,22 12,21 10.4,22 10.9,20.3 9.5,19.2 11.2,19.2" fill="#FFFFFF" transform="scale(0.5) translate(12, 11)" />
    </svg>
  );
}

function WissenLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Wissen Technology logo">
      <rect width="24" height="24" rx="5" fill="#0B2545" />
      <path
        d="M5 7l3.2 10 3.8-8 3.8 8L19 7"
        stroke="#00A3E0"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="6" r="1.5" fill="#FFB81C" />
    </svg>
  );
}

function AppleLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Apple logo">
      <path
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.81.93-2.87-.9.04-2 .6-2.64 1.36-.56.65-1.06 1.71-.93 2.74 1.01.08 2.01-.48 2.64-1.23z"
        fill="#111111"
      />
    </svg>
  );
}

function MetaLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Meta logo">
      <path
        d="M12 7.2c-2.3-3.6-5.4-3.6-7.3-1.9C2.6 7.2 2 9.7 2 12c0 3.2 1.6 5.8 4 6.7 1.8.7 3.8.3 5.4-1.8 1.4-1.9 2.5-4.5 3.9-6.3 1.1-1.4 2.1-2.1 3.2-2.1 1.7 0 2.8 1.4 2.8 3.5 0 2.7-1.5 5.5-3.8 5.5-1.1 0-2-.6-2.6-1.5l-1.6 1.3c1 1.5 2.5 2.4 4.2 2.4 3.7 0 6-3.8 6-7.7 0-3.5-2.1-5.7-5-5.7-2 0-3.6 1.2-4.9 3.1-1.3 1.9-2.5 4.4-3.8 6.1-.9 1.1-1.8 1.7-2.7 1.7-1.5 0-2.4-1.8-2.4-4.5 0-1.8.5-3.6 1.7-4.6 1.2-1 3.1-1.2 4.8 1.2l1.5-1.5z"
        fill="#0668E1"
      />
    </svg>
  );
}

// ==========================================
// CANONICAL BRAND REGISTRY & RESOLVER
// ==========================================

const KNOWN_BRANDS = {
  google: {
    Component: GoogleLogo,
    domain: "google.com",
    bg: "bg-white",
    border: "border-[#ECEAE5]",
  },
  microsoft: {
    Component: MicrosoftLogo,
    domain: "microsoft.com",
    bg: "bg-white",
    border: "border-[#ECEAE5]",
  },
  amazon: {
    Component: AmazonLogo,
    domain: "amazon.com",
    bg: "bg-[#FAFAFA]",
    border: "border-[#ECEAE5]",
  },
  adobe: {
    Component: AdobeLogo,
    domain: "adobe.com",
    bg: "bg-[#FA0F00]/5",
    border: "border-[#FA0F00]/20",
  },
  atlassian: {
    Component: AtlassianLogo,
    domain: "atlassian.com",
    bg: "bg-[#0052CC]/5",
    border: "border-[#0052CC]/20",
  },
  uber: {
    Component: UberLogo,
    domain: "uber.com",
    bg: "bg-black/5",
    border: "border-black/20",
  },
  goldmansachs: {
    Component: GoldmanSachsLogo,
    domain: "goldmansachs.com",
    bg: "bg-[#7399C6]/10",
    border: "border-[#7399C6]/30",
  },
  philips: {
    Component: PhilipsLogo,
    domain: "philips.com",
    bg: "bg-[#0B5ED7]/5",
    border: "border-[#0B5ED7]/25",
  },
  wissen: {
    Component: WissenLogo,
    domain: "wissen.com",
    bg: "bg-[#0B2545]/10",
    border: "border-[#00A3E0]/30",
  },
  apple: {
    Component: AppleLogo,
    domain: "apple.com",
    bg: "bg-white",
    border: "border-[#ECEAE5]",
  },
  meta: {
    Component: MetaLogo,
    domain: "meta.com",
    bg: "bg-[#0668E1]/5",
    border: "border-[#0668E1]/20",
  },
};

// Size presets for cohesive visual hierarchy
const SIZE_MAP = {
  xs: {
    container: "size-6 rounded-lg p-0.5",
    icon: "size-4",
    text: "text-[10px]",
  },
  sm: {
    container: "size-8 rounded-xl p-1",
    icon: "size-5",
    text: "text-xs",
  },
  md: {
    container: "size-12 rounded-2xl p-2",
    icon: "size-7",
    text: "text-base font-bold",
  },
  lg: {
    container: "size-16 sm:size-20 rounded-2xl sm:rounded-3xl p-3",
    icon: "size-10 sm:size-12",
    text: "text-2xl sm:text-3xl font-bold",
  },
  xl: {
    container: "size-24 rounded-3xl p-4",
    icon: "size-14",
    text: "text-4xl font-bold",
  },
};

// Generates consistent elegant editorial hue for custom companies
const MONOGRAM_PALETTES = [
  { bg: "bg-[#F7FAF9]", text: "text-[#1B635C]", border: "border-[#8AC4BE]/50" },
  { bg: "bg-[#FAF7F3]", text: "text-[#9E601C]", border: "border-[#E8CFA8]/60" },
  { bg: "bg-[#F4F6FB]", text: "text-[#2B52BA]", border: "border-[#BACDF7]/60" },
  { bg: "bg-[#F9F5F8]", text: "text-[#7B357D]", border: "border-[#DFBCD8]/60" },
  { bg: "bg-[#F3F7FA]", text: "text-[#1D6385]", border: "border-[#A0D0E8]/60" },
  { bg: "bg-[#FAF5F5]", text: "text-[#A83232]", border: "border-[#EAA8A8]/60" },
];

function getMonogramPalette(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % MONOGRAM_PALETTES.length;
  return MONOGRAM_PALETTES[index];
}

/**
 * High-End Company Logo Component.
 * Automatically resolves SVG brandmarks, high-res CDN logos, or rich editorial monograms.
 */
export function CompanyLogo({
  name = "",
  domain = "",
  size = "md",
  className = "",
  showBorder = true,
}) {
  const [imgError, setImgError] = React.useState(false);
  const cleanKey = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Match known brand
  let brand = null;
  for (const [key, b] of Object.entries(KNOWN_BRANDS)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      brand = b;
      break;
    }
  }

  const sizePreset = SIZE_MAP[size] || SIZE_MAP.md;
  const palette = getMonogramPalette(name);

  // If known vector brand exists, render crisp SVG
  if (brand && brand.Component) {
    const Component = brand.Component;
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200 select-none",
          brand.bg,
          showBorder ? brand.border : "border-transparent",
          "border",
          sizePreset.container,
          className
        )}
        title={name}
      >
        <Component className={sizePreset.icon} />
      </div>
    );
  }

  // If a domain is provided or inferrable, attempt high-res CDN favicon
  const targetDomain = domain || (name ? `${cleanKey}.com` : "");
  if (targetDomain && !imgError) {
    const cdnUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${targetDomain}&size=128`;
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200 bg-white border border-[#ECEAE5] select-none overflow-hidden",
          sizePreset.container,
          className
        )}
        title={name}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cdnUrl}
          alt={`${name} logo`}
          className={cn("object-contain rounded-sm", sizePreset.icon)}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback: Editorial Monogram with typography
  const letter = (name && name.charAt(0)) ? name.charAt(0).toUpperCase() : "C";
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center shrink-0 shadow-2xs select-none font-editorial font-bold border",
        palette.bg,
        palette.text,
        palette.border,
        sizePreset.container,
        sizePreset.text,
        className
      )}
      title={name}
    >
      {letter}
    </div>
  );
}

