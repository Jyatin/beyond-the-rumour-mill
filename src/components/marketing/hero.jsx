"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Editorial Hero Section for "Beyond the Rumour Mill"
 * Exact 100% pixel-level alignment to the master reference composition.
 */
export function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden border-b border-[#ECEAE5]">
      {/* Container with exact aspect ratio on desktop matching master reference artwork (1024:524) */}
      <div className="relative mx-auto w-full max-w-[1360px] md:aspect-[1024/524] min-h-[560px] md:min-h-0 flex flex-col items-center pt-6 sm:pt-8 md:pt-6 lg:pt-8 xl:pt-9 px-4 sm:px-6 md:px-8">
        {/* 1. LAYER: Master Hand-Drawn Artwork Canvas Background (Crisp 4x Retina) */}
        <div className="absolute inset-0 pointer-events-none select-none hidden md:flex items-center justify-center">
          <img
            src="/assets/hero-master-crisp-4x.png"
            alt="Students and alumni career preparation network"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 2. LAYER: Central Interactive Editorial Content (Upper-Centered Position) */}
        <div className="relative z-10 w-full max-w-[640px] px-4 sm:px-6 flex flex-col items-center text-center">
          {/* Top Announcement Pill */}
          <Reveal>
            <Link
              href="/alumni"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1 rounded-full border border-[#8AC4BE] bg-[#F7FAF9] hover:bg-[#EEF6F5] text-[12px] sm:text-[12.5px] md:text-[13px] font-medium text-[#111111] transition-all mb-3.5 sm:mb-4 cursor-pointer shadow-2xs"
            >
              <span className="text-[13px] sm:text-[14px] leading-none">🎓</span>
              <span>Meet the people behind the placements.</span>
              <span className="text-[#1B635C] group-hover:underline underline-offset-2 font-medium inline-flex items-center gap-0.5 ml-0.5">
                Learn more{" "}
                <ArrowRight className="size-3 sm:size-3.5 inline-block transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          {/* Central Large High-Contrast Editorial Serif Headline (Strict 3 Lines) */}
          <Reveal delay={1}>
            <h1 className="font-serif text-[30px] sm:text-[36px] md:text-[40px] lg:text-[46px] xl:text-[48px] leading-[1.09] tracking-[-0.016em] text-[#111111] font-normal">
              <span className="block">We connect</span>
              <span className="block">students with the people</span>
              <span className="block">who already made it.</span>
            </h1>
          </Reveal>

          {/* Supporting Copy */}
          <Reveal delay={2}>
            <p className="type-body text-[13.5px] sm:text-[14px] md:text-[14.5px] lg:text-[15.5px] leading-[1.5] text-[#4a4752] max-w-[530px] mt-3 sm:mt-3.5">
              Go beyond placement rumours. Learn directly from alumni about interviews, preparation, internships, and the decisions that actually shaped their careers.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={3}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-4 sm:mt-5">
              {/* Primary CTA */}
              <Link
                href="/alumni"
                className="inline-flex items-center justify-center rounded-full bg-[#1B635C] hover:bg-[#154d48] text-white px-5.5 py-2.5 sm:px-6.5 sm:py-2.5 text-[13.5px] sm:text-[14px] font-medium shadow-xs hover:shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Find your alumni
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/experiences/new"
                className="inline-flex items-center justify-center rounded-full border border-[#1B635C] bg-white hover:bg-[#1B635C]/5 text-[#1B635C] px-5.5 py-2.5 sm:px-6.5 sm:py-2.5 text-[13.5px] sm:text-[14px] font-medium transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Share your experience
              </Link>
            </div>
          </Reveal>

          {/* Mobile Fallback Illustration & Highlights (Below md screens only) */}
          <div className="mt-8 w-full grid grid-cols-2 gap-3 md:hidden max-w-[420px]">
            <div className="rounded-2xl border border-[#eceae5] p-3.5 bg-[#faf9f6] text-left">
              <div className="text-xl mb-1">💻</div>
              <p className="text-[13px] font-semibold text-[#111111]">Real Round Intel</p>
              <p className="text-[11.5px] text-[#63606b]">OAs, coding rounds & checklists</p>
            </div>
            <div className="rounded-2xl border border-[#eceae5] p-3.5 bg-[#faf9f6] text-left">
              <div className="text-xl mb-1">🎉</div>
              <p className="text-[13px] font-semibold text-[#111111]">Verified Offers</p>
              <p className="text-[11.5px] text-[#63606b]">Direct 1-on-1 alumni mentorship</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}