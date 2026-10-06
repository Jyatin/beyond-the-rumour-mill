"use client";

import * as React from "react";
import Image from "next/image";
import { DoodleArrowCurved, DoodleSparkle, DoodleStar } from "./doodles";

/**
 * Interactive Hero Illustration with:
 * 1. Gentle organic hanging float motion (translateY 4-8px, rotate -0.4deg to +0.4deg)
 * 2. Multi-layer depth (Background glow, Base artwork, Independent floating paper notes,
 *    Twinkling stars, Hand-drawn arrow, Foreground experience card)
 * 3. Orchestrated 800-1200ms editorial reveal sequence on mount
 */
export function HeroIllustrationInteractive() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Immediate mount trigger for editorial reveal sequence
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full max-w-[680px] lg:max-w-[760px] xl:max-w-[820px] select-none">
      {/* 1. LAYER: Ambient Background Glow (2-3px vertical breathing) */}
      <div
        className={`absolute -inset-4 bg-gradient-to-tr from-[var(--brand-soft)]/20 via-transparent to-[#F0EAF7]/30 rounded-3xl blur-2xl pointer-events-none transition-opacity duration-1000 ${mounted ? "opacity-100 animate-glow-drift" : "opacity-0"
          }`}
      />

      {/* 2. LAYER: Master Hanging Physical Editorial Artwork */}
      <div
        className={`relative transition-all duration-1000 ease-out ${mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-[0.98]"
          }`}
      >
        <div className="animate-hero-hanging origin-top-center">
          {/* Main Hand-Drawn Editorial Artwork Collage */}
          <div className="relative rounded-sm overflow-hidden transition-shadow duration-700 hover:shadow-xl">
            <Image
              src="/assets/hero-editorial-illustration.png"
              alt="Editorial illustration of students analyzing verified interview experiences"
              width={820}
              height={580}
              priority
              className="w-full h-auto object-contain select-none drop-shadow-sm"
            />
          </div>

          {/* 3. LAYER: Floating Independent Paper Elements (Layered Parallax) */}
          {/* Top-Right Sparkle & Annotation */}
          <div
            className={`absolute -top-3 right-6 transition-all duration-700 ease-out delay-500 pointer-events-none ${mounted
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-3 scale-75"
              }`}
          >
            <div className="animate-star-twinkle">
              <DoodleSparkle className="size-6 text-[#E5C85C]" />
            </div>
          </div>

          {/* Left Star Note */}
          <div
            className={`absolute top-12 -left-4 transition-all duration-700 ease-out delay-600 pointer-events-none hidden sm:block ${mounted
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-x-3 scale-75"
              }`}
          >
            <div className="animate-star-twinkle delay-300">
              <DoodleStar className="size-5 text-[var(--brand)]" />
            </div>
          </div>

          {/* 4. LAYER: Subtle Ambient Sparkle / Hand-drawn Accents */}
          <div
            className={`absolute -bottom-2 left-10 transition-all duration-700 ease-out delay-700 pointer-events-none hidden md:block ${mounted ? "opacity-80" : "opacity-0"
              }`}
          >
            <DoodleArrowCurved className="w-16 text-[var(--brand)] animate-paper-float" />
          </div>
        </div>
      </div>
    </div>
  );
}
