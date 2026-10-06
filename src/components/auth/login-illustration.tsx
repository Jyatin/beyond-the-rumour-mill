"use client";

import * as React from "react";
import { LoginEditorialArtwork } from "./auth-illustrations";
import { DoodleStar, DoodleSparkle, DoodleTape } from "@/components/marketing/doodles";
import { ShieldCheck, Sparkles, MessageSquare } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Dual-Peer Verified",
    desc: "Every interview breakdown is vetted by verified batch peers.",
    badgeColor: "#557D70",
  },
  {
    icon: MessageSquare,
    title: "1-on-1 Alumni Dialogue",
    desc: "Ask specific questions about OA patterns, system design, and Bar Raiser.",
    badgeColor: "#8D6BB3",
  },
  {
    icon: Sparkles,
    title: "Zero Campus Noise",
    desc: "Unfiltered authentic intel replacing panic-inducing group chats.",
    badgeColor: "#E5C85C",
  },
];

export function LoginIllustrationColumn() {
  return (
    <div className="relative flex flex-col justify-between h-full w-full py-2 lg:py-6 lg:pr-10 select-none animate-fade-in">
      {/* 1. Top Section: Editorial Artwork & Dialogue Scene */}
      <div>
        <div className="relative mx-auto w-full max-w-[540px]">
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#E5D9F1]/30 via-transparent to-[#F0EAF7]/30 rounded-3xl blur-2xl pointer-events-none" />

          {/* Staggered Artwork Container */}
          <div className="relative">
            {/* Animated Organic Floating Canvas */}
            <div className="animate-hero-hanging origin-top-center">
              <LoginEditorialArtwork className="w-full h-auto drop-shadow-sm" />
            </div>

            {/* Floating Paper Tag (Top Right) */}
            <div
              className="absolute -top-3 right-2 sm:right-6 bg-[var(--surface-elevated)] border border-[#111016]/15 px-3 py-1.5 rounded-lg shadow-sm rotate-2 animate-float-gentle"
              style={{ animationDuration: "6s" }}
            >
              <DoodleTape className="absolute -top-2 left-4 animate-sway-slow" />
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#557D70] animate-pulse" />
                <span className="type-mono text-[10.5px] font-semibold text-[#557D70]">
                  1,200+ VERIFIED EXPERIENCES ARCHIVED
                </span>
              </div>
            </div>

            {/* Floating Dialogue Note (Bottom Left) */}
            <div
              className="absolute bottom-4 -left-3 sm:-left-6 bg-[#FFFFFF] border border-[#111016]/15 px-3.5 py-2 rounded-lg shadow-card -rotate-3 animate-paper-float max-w-[200px] hidden sm:block"
            >
              <DoodleTape className="absolute -top-2.5 right-4 animate-sway-slow" />
              <p className="type-display text-[12.5px] font-bold text-[var(--foreground)]">
                “Trees & LCA in Round 2”
              </p>
              <span className="type-mono text-[9.5px] text-[#735196] block mt-0.5">
                ● Live 2026 Archive Signal
              </span>
            </div>

            {/* Floating Rotating Sparkles */}
            <div className="absolute top-10 left-6 pointer-events-none animate-spin-slow">
              <DoodleStar className="size-4 text-[#E5C85C]" />
            </div>
            <div className="absolute bottom-14 right-6 pointer-events-none animate-star-twinkle">
              <DoodleSparkle className="size-5 text-[#8D6BB3]" />
            </div>
          </div>
        </div>

        {/* 2. Headline near illustration */}
        <div className="mt-7 text-left max-w-[500px]">
          <h2 className="type-display text-[26px] sm:text-[32px] leading-[1.1] text-[var(--foreground)] tracking-tight">
            Good conversations change{" "}
            <em className="italic text-[#8D6BB3] font-normal">
              what&apos;s possible.
            </em>
          </h2>
          <p className="type-body mt-2.5 text-[14.5px] text-[var(--muted)] leading-relaxed">
            Step back inside the verified repository. Check current interview questions, message alumni mentors, and review verified company dossiers.
          </p>
        </div>

        {/* 3. Feature Highlight Cards */}
        <div className="mt-7 space-y-3 max-w-[480px]">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3.5 rounded-xl border border-[#111016]/10 bg-[var(--surface-elevated)] p-3 shadow-2xs hover:border-[#8D6BB3]/40 transition-colors group"
              >
                <div
                  className="flex size-7.5 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: item.badgeColor }}
                >
                  <Icon className="size-3.5" />
                </div>
                <div>
                  <h4 className="type-body text-[13.5px] font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h4>
                  <p className="type-caption mt-0.5 text-[12px] text-[var(--muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Citation Bar */}
      <div className="mt-8 pt-5 border-t border-[#111016]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DoodleStar className="size-3.5 text-[#E5C85C]" />
          <span className="type-mono text-[11px] text-[var(--muted)]">
            CAMPUS INTELLIGENCE INITIATIVE
          </span>
        </div>
        <span className="type-mono text-[11px] font-semibold text-[#557D70]">
          2026 ARCHIVE
        </span>
      </div>
    </div>
  );
}
