"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export function SiteFooter() {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/signup" || pathname === "/login" || pathname === "/reset-password";
  if (isAuthPage) {
    return <footer className="border-t border-[var(--hairline-soft)] py-6 px-5 text-center bg-[var(--background)]">
      <p className="type-caption text-[12px] text-[var(--muted)]">
        © 2026 Beyond the Rumour Mill · Verified placement intelligence & authentic peer connections · Free for campus students
      </p>
    </footer>;
  }
  return <footer className="border-t border-[#111016]/20 bg-[#09284A] text-white selection:bg-[#9B7BC4] selection:text-white">
    <div className="mx-auto max-w-[1360px] px-5 py-16 md:px-8 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#E5C85C]">
            <span>●</span>
            <span>CAMPUS ARCHIVE INITIATIVE</span>
          </div>
          <h3 className="type-display mt-5 max-w-[18ch] text-[36px] sm:text-[46px] leading-[1.04] text-white">
            Make better career decisions with <em className="italic text-[#E9B9B7]">better information.</em>
          </h3>
          <p className="type-body mt-6 max-w-[44ch] text-[15px] leading-relaxed text-white/70">
            Beyond the Rumour Mill is a student-built, community-verified intelligence record designed to replace hearsay with authentic interview experiences.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="type-data text-[11px] text-white/50">2026 ARCHIVE EDITION</span>
            <span className="text-white/30">•</span>
            <span className="type-data text-[11px] text-[#B9CFC5]">VERIFIED REPOSITORY</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="type-data text-[11px] uppercase tracking-widest text-[#E9B9B7] mb-4 font-semibold">
              Archive
            </p>
            <ul className="space-y-3 type-body text-[14px] text-white/75">
              <li><Link href="/alumni" className="hover:text-white transition-colors text-[#E9B9B7] font-semibold">Find Placed Alumni</Link></li>
              <li><Link href="/experiences" className="hover:text-white transition-colors">All Experiences</Link></li>
              <li><Link href="/questions" className="hover:text-white transition-colors">Question Signals & Q&A</Link></li>
            </ul>
          </div>

          <div>
            <p className="type-data text-[11px] uppercase tracking-widest text-[#B9CFC5] mb-4 font-semibold">
              Contribute
            </p>
            <ul className="space-y-3 type-body text-[14px] text-white/75">
              <li><Link href="/experiences/new" className="hover:text-white transition-colors">Share Interview Rounds</Link></li>
              <li><Link href="/alumni" className="hover:text-white transition-colors">Become a Mentor</Link></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="type-data text-[11px] uppercase tracking-widest text-white/50 mb-4 font-semibold">
              Intelligence
            </p>
            <ul className="space-y-3 type-body text-[14px] text-white/75">
              <li><Link href="/stats" className="hover:text-white transition-colors">Campus Metrics</Link></li>
              <li><Link href="/editorial" className="hover:text-white transition-colors">Editorial Policy</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Privacy & Shield</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About the Project</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="type-caption text-[12.5px] text-white/50">
          Open archive for university students. No sponsored rankings. No paywalled experiences.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/terms" className="type-caption text-[12.5px] text-white/50 hover:text-white transition-colors">Terms</Link>
          <Link href="/privacy" className="type-caption text-[12.5px] text-white/50 hover:text-white transition-colors">Privacy</Link>
          <Link href="/guidelines" className="type-caption text-[12.5px] text-white/50 hover:text-white transition-colors">Community Rules</Link>
        </div>
      </div>
    </div>
  </footer>;
}