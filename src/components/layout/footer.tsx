"use client";
 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DoodleStar } from "@/components/marketing/doodles";

export function SiteFooter() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signup" || pathname === "/login";

  if (isAuthPage) {
    return (
      <footer className="border-t border-[var(--hairline-soft)] py-6 px-5 text-center bg-[var(--background)]">
        <p className="type-caption text-[12px] text-[var(--muted)]">
          © 2026 Beyond the Rumour Mill · Verified placement intelligence & authentic peer connections · Free for campus students
        </p>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[#111016]/20 bg-[#09284A] text-white selection:bg-[#9B7BC4] selection:text-white">
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
                <li><Link href="/connect" className="hover:text-white transition-colors text-[#E9B9B7] font-semibold">Connect with Alumni</Link></li>
                <li><Link href="/experiences" className="hover:text-white transition-colors">All Experiences</Link></li>
                <li><Link href="/companies" className="hover:text-white transition-colors">Company Dossiers</Link></li>
                <li><Link href="/questions" className="hover:text-white transition-colors">Question Signal</Link></li>
                <li><Link href="/saved" className="hover:text-white transition-colors">Saved Notes</Link></li>
              </ul>
            </div>

            <div>
              <p className="type-data text-[11px] uppercase tracking-widest text-[#B9CFC5] mb-4 font-semibold">
                Contribute
              </p>
              <ul className="space-y-3 type-body text-[14px] text-white/75">
                <li><Link href="/experiences/share" className="hover:text-white transition-colors">Share Experience</Link></li>
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Verification Rules</Link></li>
                <li><Link href="/moderation" className="hover:text-white transition-colors">Editorial Standard</Link></li>
                <li><Link href="/anonymous" className="hover:text-white transition-colors">Privacy Model</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="type-data text-[11px] uppercase tracking-widest text-[#E5C85C] mb-4 font-semibold">
                Initiative
              </p>
              <ul className="space-y-3 type-body text-[14px] text-white/75">
                <li><Link href="/login" className="hover:text-white transition-colors text-[#E5C85C] font-medium">Sign In / Join</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Project</Link></li>
                <li><Link href="/manifesto" className="hover:text-white transition-colors">The Manifesto</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact / Lead</Link></li>
                <li><Link href="/profile" className="hover:text-white transition-colors">Student Profile</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
          <p className="type-caption text-[12.5px] text-white/50">
            © 2026 Beyond the Rumour Mill. Handcrafted for students entering placement season.
          </p>
          <div className="flex items-center gap-4 text-white/50 text-[12.5px]">
            <DoodleStar className="size-4 text-[#E5C85C]" />
            <span>Human-verified & zero corporate PR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
