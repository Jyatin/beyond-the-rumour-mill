"use client";

import * as React from "react";
import { SignUpEditorialArtwork } from "./auth-illustrations";
import { DoodleSparkle, DoodleStar, DoodleTape } from "@/components/marketing/doodles";

const STEPS = [
  {
    num: "1",
    action: "Create",
    desc: "a verified campus profile with your target roles.",
  },
  {
    num: "2",
    action: "Unlock",
    desc: "authentic interview dossiers and round-by-round intel.",
  },
  {
    num: "3",
    action: "Connect",
    desc: "directly with placed alumni for 1-on-1 placement guidance.",
  },
];

const COMPANIES = [
  { name: "Google", color: "#4285F4" },
  { name: "Microsoft", color: "#00A4EF" },
  { name: "Amazon", color: "#FF9900" },
  { name: "Uber", color: "#000000" },
  { name: "Atlassian", color: "#0052CC" },
  { name: "Goldman Sachs", color: "#1D5C8A" },
];

export function SignUpIllustrationColumn() {
  return (
    <div className="relative flex flex-col justify-between h-full w-full py-2 lg:py-6 lg:pr-10 select-none animate-fade-in">
      {/* 1. Top Section: Multi-Element Editorial Artwork & Banner */}
      <div>
        <div className="relative mx-auto w-full max-w-[540px]">
          {/* Subtle floating glow backdrop */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--brand-soft)]/20 via-transparent to-[#F0EAF7]/30 rounded-3xl blur-2xl pointer-events-none" />

          {/* Master Staggered Artwork Container */}
          <div className="relative">
            {/* Main Hand-drawn Team & Banner Canvas */}
            <div className="animate-hero-hanging origin-top-center">
              <SignUpEditorialArtwork className="w-full h-auto drop-shadow-sm" />
            </div>

            {/* Floating Paper Memo: "People helping people move forward" */}
            <div
              className="absolute -top-3 -right-2 sm:right-2 bg-[var(--surface-elevated)] border border-[#111016]/15 px-3 py-1.5 rounded-lg shadow-sm rotate-2 animate-float-gentle"
              style={{ animationDuration: "6.5s" }}
            >
              <DoodleTape className="absolute -top-2 left-6 animate-sway-slow" />
              <div className="flex items-center gap-2">
                <DoodleSparkle className="size-3.5 text-[#E5C85C]" />
                <span className="type-mono text-[10.5px] font-semibold text-[#557D70]">
                  PEOPLE HELPING PEOPLE MOVE FORWARD
                </span>
              </div>
            </div>

            {/* Floating Dialogue Bubble Sticker (Left) */}
            <div
              className="absolute bottom-6 -left-3 sm:-left-6 bg-[#FFFFFF] border border-[#111016]/15 px-3 py-2 rounded-lg shadow-card -rotate-2 animate-paper-float max-w-[190px] hidden sm:block"
            >
              <DoodleTape className="absolute -top-2.5 right-4 animate-sway-slow" />
              <p className="type-display text-[12px] font-bold text-[var(--foreground)]">
                “Ask what really happened”
              </p>
              <p className="type-caption text-[10px] text-[#AA654E] mt-0.5">
                4 rounds + Bar Raiser intel
              </p>
            </div>

            {/* Floating Star Dings */}
            <div className="absolute top-12 left-4 pointer-events-none animate-spin-slow">
              <DoodleStar className="size-4 text-[#8D6BB3]" />
            </div>
            <div className="absolute bottom-16 right-4 pointer-events-none animate-star-twinkle">
              <DoodleSparkle className="size-5 text-[#E5C85C]" />
            </div>
          </div>
        </div>

        {/* 2. Editorial Supporting Copy under artwork */}
        <div className="mt-7 text-left max-w-[500px]">
          <h2 className="type-display text-[26px] sm:text-[32px] leading-[1.1] text-[var(--foreground)] tracking-tight">
            Connecting placed alumni with{" "}
            <em className="italic text-[#8D6BB3] font-normal">
              tomorrow&apos;s talent.
            </em>
          </h2>
          <p className="type-body mt-2.5 text-[14.5px] text-[var(--muted)] leading-relaxed">
            Share what you learned. Help someone prepare for what&apos;s next, or unlock verified interview breakdowns free of campus rumour.
          </p>
        </div>

        {/* 3. Stepped Process Pathway (User Interviews inspired 1-2-3 sequence) */}
        <div className="mt-7 space-y-3.5 max-w-[480px]">
          {STEPS.map((step, idx) => (
            <div key={step.num} className="flex items-start gap-3.5 group">
              {/* Hand-drawn circular number badge */}
              <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-[#111016]/20 bg-[var(--surface-elevated)] text-[12px] font-semibold text-[#8D6BB3] shadow-2xs group-hover:border-[#8D6BB3] group-hover:bg-[#E5D9F1]/40 transition-colors">
                <span className="font-mono">{step.num}</span>
                {idx < STEPS.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-0.5 h-3.5 -translate-x-1/2 border-l border-dashed border-[#111016]/25" />
                )}
              </div>
              <div className="pt-0.5">
                <p className="type-body text-[13.5px] leading-snug text-[var(--foreground)]">
                  <strong className="font-semibold text-[var(--foreground)]">{step.action}</strong>{" "}
                  <span className="text-[var(--muted)]">{step.desc}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Trust Strip: Company Badges */}
      <div className="mt-8 pt-5 border-t border-[#111016]/10">
        <p className="type-mono text-[10px] uppercase tracking-widest text-[var(--muted)] font-semibold mb-2.5">
          STUDENTS PLACED & CONNECTING ACROSS
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          {COMPANIES.map((company) => (
            <span
              key={company.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#111016]/10 bg-[var(--surface-elevated)] px-3 py-1 text-[12px] font-medium text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:border-[#111016]/25 transition-colors shadow-2xs"
            >
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: company.color }}
              />
              {company.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
