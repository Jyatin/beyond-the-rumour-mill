"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Building2,
  FileText,
  Target,
  HelpCircle,
} from "lucide-react";

/**
 * Editorial contextual illustrations for Beyond the Rumour Mill inner pages.
 * Crafted to match the hand-drawn, ink-and-paper aesthetic of the homepage.
 */

// 1. Alumni & Mentorship Illustration (for /alumni & connect)
export function AlumniIllustration({ className }) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-[#F7FAF9] border border-[#8AC4BE]/40 p-4 flex flex-col justify-between overflow-hidden shadow-2xs">
        {/* Subtle decorative background ring */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#1B635C]/5 pointer-events-none" />
        
        {/* Mini header sticker */}
        <div className="flex items-center justify-between z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#1B635C]/20 text-[10px] font-mono uppercase tracking-wider text-[#1B635C] font-semibold">
            <span className="size-1.5 rounded-full bg-[#1B635C]" />
            <span>Alumni Network</span>
          </div>
          <GraduationCap className="size-4 text-[#1B635C]" />
        </div>

        {/* Hand-drawn style connection nodes */}
        <svg viewBox="0 0 200 80" fill="none" className="w-full my-auto z-10" aria-hidden="true">
          <line x1="30" y1="40" x2="100" y2="25" stroke="#1B635C" strokeWidth="1.8" strokeDasharray="3 3" />
          <line x1="100" y1="25" x2="170" y2="45" stroke="#1B635C" strokeWidth="1.8" strokeDasharray="3 3" />
          
          {/* Node 1: Student */}
          <circle cx="30" cy="40" r="16" fill="#FFFFFF" stroke="#1B635C" strokeWidth="2" />
          <circle cx="30" cy="36" r="5" fill="#1B635C" />
          <path d="M22 47 C22 42, 38 42, 38 47" stroke="#1B635C" strokeWidth="1.5" fill="none" />
          
          {/* Node 2: Verified Alumni Mentor */}
          <circle cx="100" cy="25" r="20" fill="#1B635C" stroke="#154D48" strokeWidth="2" />
          <polygon points="100,16 103,22 109,23 105,27 106,33 100,30 94,33 95,27 91,23 97,22" fill="#FFFFFF" />
          
          {/* Node 3: Recruiter / Company */}
          <circle cx="170" cy="45" r="16" fill="#FFFFFF" stroke="#1B635C" strokeWidth="2" />
          <rect x="163" y="38" width="14" height="13" rx="1.5" stroke="#1B635C" strokeWidth="1.6" fill="none" />
          <rect x="166" y="42" width="2.5" height="3" fill="#1B635C" />
          <rect x="171" y="42" width="2.5" height="3" fill="#1B635C" />
        </svg>

        {/* Footer info pill */}
        <div className="bg-white/90 border border-[#ECEAE5] rounded-lg p-2 text-center z-10">
          <p className="text-[11px] font-medium text-[#111111]">1-on-1 Guidance &amp; Mock Sessions</p>
          <p className="text-[9.5px] text-[#63606B]">Direct advice from recent campus offers</p>
        </div>
      </div>
    </div>
  );
}

// 2. Experience & Round Intelligence Illustration (for /experiences)
export function ExperienceIllustration({ className }) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-[#FAF7F3] border border-[#EBE4D8] p-4 flex flex-col justify-between overflow-hidden shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#1A191D]/20 text-[10px] font-mono uppercase tracking-wider text-[#1A191D] font-semibold">
            <span className="size-1.5 rounded-full bg-[#155A38]" />
            <span>Round Intel</span>
          </div>
          <FileText className="size-4 text-[#155A38]" />
        </div>

        {/* Interview steps visual card */}
        <div className="space-y-1.5 my-auto">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#ECEAE5] text-xs">
            <span className="font-medium text-[#111111]">Round 1: OA &amp; DSA</span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#D4E8DC] text-[#17563F]">PASSED</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#ECEAE5] text-xs">
            <span className="font-medium text-[#111111]">Round 2: System Design</span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#D4E8DC] text-[#17563F]">PASSED</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#ECEAE5] text-xs">
            <span className="font-medium text-[#111111]">Round 3: Techno-HR</span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#D8E2F2] text-[#1B2540]">OFFER ACCEPTED</span>
          </div>
        </div>

        <p className="text-[10px] text-[#63606B] text-center">Verified consensus from 100+ candidates</p>
      </div>
    </div>
  );
}

// 3. Preparation Command Center Illustration (for /prepare)
export function PreparationIllustration({ className }) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-[#EEF1F8] border border-[#D8E2F2] p-4 flex flex-col justify-between overflow-hidden shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#1B2540]/20 text-[10px] font-mono uppercase tracking-wider text-[#1B2540] font-semibold">
            <span className="size-1.5 rounded-full bg-[#1B2540]" />
            <span>Readiness Index</span>
          </div>
          <Target className="size-4 text-[#1B2540]" />
        </div>

        {/* Readiness Meter visual */}
        <div className="my-auto p-3 bg-white rounded-xl border border-[#D8E2F2] space-y-2">
          <div className="flex items-end justify-between">
            <span className="text-xs font-semibold text-[#111111]">Interview Preparedness</span>
            <span className="text-sm font-bold font-mono text-[#1B635C]">84%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
            <div className="h-full bg-[#1B635C] rounded-full transition-all" style={{ width: "84%" }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#63606B] font-mono">
            <span>Core DSA: 100%</span>
            <span>Mocks: Done</span>
          </div>
        </div>

        <p className="text-[10px] text-[#63606B] text-center">Tailored to upcoming campus drive rounds</p>
      </div>
    </div>
  );
}

// 4. Questions & Placement Discussions Illustration (for /questions)
export function QuestionsIllustration({ className }) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-[#FAF9F6] border border-[#ECEAE5] p-4 flex flex-col justify-between overflow-hidden shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#1A191D]/20 text-[10px] font-mono uppercase tracking-wider text-[#1A191D] font-semibold">
            <span className="size-1.5 rounded-full bg-[#247B72]" />
            <span>Q&amp;A Consensus</span>
          </div>
          <HelpCircle className="size-4 text-[#247B72]" />
        </div>

        <div className="my-auto space-y-2">
          <div className="p-2.5 rounded-xl bg-white border border-[#ECEAE5] shadow-2xs">
            <p className="text-[11.5px] font-semibold text-[#111111] line-clamp-1">
              &quot;What tree algorithms were asked in Round 2?&quot;
            </p>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-[#63606B]">
              <span className="text-[#1B635C] font-medium">✓ 3 Verified Answers</span>
              <span>• 18 Asks</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[#63606B] text-center">No speculation. First-hand answers only.</p>
      </div>
    </div>
  );
}

// 5. Companies & Hiring Directory Illustration (for /companies)
export function CompaniesIllustration({ className }) {
  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl bg-[#F7FAF9] border border-[#8AC4BE]/40 p-4 flex flex-col justify-between overflow-hidden shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#1B635C]/20 text-[10px] font-mono uppercase tracking-wider text-[#1B635C] font-semibold">
            <span className="size-1.5 rounded-full bg-[#1B635C]" />
            <span>Hiring Directory</span>
          </div>
          <Building2 className="size-4 text-[#1B635C]" />
        </div>

        <div className="my-auto grid grid-cols-2 gap-2">
          <div className="p-2 bg-white rounded-lg border border-[#ECEAE5] text-center">
            <span className="text-xs font-bold text-[#111111] block">Active Drives</span>
            <span className="text-lg font-editorial font-bold text-[#1B635C]">12</span>
          </div>
          <div className="p-2 bg-white rounded-lg border border-[#ECEAE5] text-center">
            <span className="text-xs font-bold text-[#111111] block">Companies</span>
            <span className="text-lg font-editorial font-bold text-[#1B635C]">45+</span>
          </div>
        </div>

        <p className="text-[10px] text-[#63606B] text-center">Eligibility, compensation &amp; rounds</p>
      </div>
    </div>
  );
}

// 6. Generic Editorial Empty State with custom SVG artwork
export function EmptyStateEditorial({
  title = "No records found",
  description = "There are currently no items matching your criteria in this archive.",
  actionLabel,
  onAction,
  actionHref,
  className,
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-dashed border-[#EBE4D8] bg-[#FAF7F3]/70", className)}>
      {/* Hand-drawn style empty folder/notebook SVG */}
      <svg viewBox="0 0 80 80" fill="none" className="size-16 mb-4 text-[#1B635C]" aria-hidden="true">
        <rect x="14" y="22" width="52" height="42" rx="4" fill="#FFFFFF" stroke="#1A191D" strokeWidth="1.8" />
        <path d="M14 30h52" stroke="#ECEAE5" strokeWidth="1.5" />
        <circle cx="24" cy="46" r="3" fill="#1B635C" />
        <line x1="32" y1="46" x2="56" y2="46" stroke="#1A191D" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="24" cy="54" r="3" fill="#8AC4BE" />
        <line x1="32" y1="54" x2="48" y2="54" stroke="#63606B" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <h3 className="font-editorial text-lg font-bold text-[#111111] mb-1">{title}</h3>
      <p className="text-xs text-[#63606B] max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && (
        actionHref ? (
          <a
            href={actionHref}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1B635C] text-white text-xs font-semibold hover:bg-[#154D48] transition-colors shadow-2xs"
          >
            {actionLabel}
          </a>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1B635C] text-white text-xs font-semibold hover:bg-[#154D48] transition-colors shadow-2xs cursor-pointer"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}

