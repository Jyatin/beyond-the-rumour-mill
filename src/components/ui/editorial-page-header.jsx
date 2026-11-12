"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/marketing/reveal";

/**
 * Editorial Page Header for Beyond the Rumour Mill inner pages.
 * Bridges the homepage's high-contrast editorial identity to all inner routes.
 */
export function EditorialPageHeader({
  eyebrow = "CAMPUS ARCHIVE",
  title,
  subtitle,
  illustration,
  action,
  badges = [],
  className,
}) {
  return (
    <section className={cn("relative w-full border-b border-[#ECEAE5] bg-white pt-8 pb-10 sm:pt-10 sm:pb-12 overflow-hidden", className)}>
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content Column */}
            <div className="max-w-2xl space-y-3.5">
              {/* Eyebrow Callout Pill */}
              <div className="inline-flex items-center gap-2">
                <div className="border border-[#1A191D]/20 bg-[#F7FAF9] rounded-full px-3 py-0.5 text-[11px] font-mono uppercase tracking-[0.1em] font-semibold text-[#111111] inline-flex items-center gap-1.5 shadow-2xs">
                  <span className="size-2 rounded-full bg-[#1B635C] inline-block animate-pulse" />
                  <span>{eyebrow}</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.08] tracking-[-0.018em] text-[#111111]">
                {title}
              </h1>

              {/* Supporting Subtitle */}
              {subtitle && (
                <p className="type-body text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#4A4752] max-w-xl">
                  {subtitle}
                </p>
              )}

              {/* Optional Badges / Quick Stats */}
              {badges.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11.5px] font-mono px-2.5 py-1 rounded-full bg-[#FAF7F3] border border-[#EBE4D8] text-[#1A191D]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Optional Inline Action for mobile/desktop */}
              {action && <div className="pt-2">{action}</div>}
            </div>

            {/* Right Contextual Illustration Vignette (if provided) */}
            {illustration && (
              <div className="shrink-0 hidden md:flex items-center justify-center lg:justify-end">
                {illustration}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

