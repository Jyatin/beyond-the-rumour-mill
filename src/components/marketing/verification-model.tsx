"use client";

import { Reveal } from "./reveal";
import { DoodleSparkle, DoodleUnderline } from "./doodles";
import { VerificationCompareScene } from "./illustrations";

const statuses: {
  label: string;
  desc: string;
  badge: string;
  badgeColor: string;
  sub: string;
}[] = [
  {
    label: "Official Information",
    desc: "Sourced directly from verified company portal releases and university placement cells with timestamped proof.",
    badge: "TIER 01 · OFFICIAL",
    badgeColor: "bg-[#557D70]/15 text-[#557D70] border-[#557D70]/30",
    sub: "Directly confirmed",
  },
  {
    label: "Verified Experience",
    desc: "Detailed round-by-round submission audited and confirmed by a dual-peer review with offer verification.",
    badge: "TIER 02 · VERIFIED",
    badgeColor: "bg-[var(--brand)]/15 text-[var(--brand-bright)] border-[var(--brand)]/30",
    sub: "Dual-peer reviewed",
  },
  {
    label: "Community Submitted",
    desc: "Shared by a student with full interview questions, pending independent peer confirmation.",
    badge: "TIER 03 · COMMUNITY",
    badgeColor: "bg-[#AA654E]/15 text-[#AA654E] border-[#AA654E]/30",
    sub: "Peer review pending",
  },
  {
    label: "Needs Review",
    desc: "Last verified more than twelve months ago; archived for historic context but marked for refresh.",
    badge: "TIER 04 · ARCHIVE",
    badgeColor: "bg-[var(--ink-muted)]/15 text-[var(--ink-muted)] border-[var(--ink-muted)]/30",
    sub: "Older than 12 mo",
  },
];

export function VerificationModel() {
  return (
    <section className="relative border-b border-[var(--hairline-soft)] bg-[var(--paper-tint)] dark:bg-[var(--background)] py-20 md:py-28 overflow-hidden transition-colors duration-700">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <DoodleSparkle className="size-5 text-[var(--brand)]" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                  Trust Architecture / 08 · Standard
                </p>
              </div>
              <h2 className="type-display text-[38px] sm:text-[50px] lg:text-[58px] leading-[1.02] text-[var(--ink)]">
                Evidence over <br />
                <span className="relative inline-block text-[var(--brand)] italic">
                  hearsay.
                  <DoodleUnderline className="absolute -bottom-2.5 left-0 w-full text-[var(--brand)] pointer-events-none" />
                </span>
              </h2>
              <p className="type-body-lg text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-muted)] max-w-[42ch]">
                A badge must mean something real. We assign explicit provenance to every piece of intelligence so you know exactly which claims are verified and which are community reports.
              </p>

              {/* Verified Compare Illustration with subtle floating animation */}
              <div className="pt-4">
                <div className="border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-5 rounded-sm shadow-card rotate-[-1deg] hover:rotate-0 transition-transform duration-500 animate-paper-float">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-3">
                    <span className="type-data text-[11px] font-mono text-[var(--brand-bright)] uppercase font-semibold">
                      FIG 08. CROSS-RECORD CONSENSUS
                    </span>
                    <span className="type-data text-[10px] font-mono text-[#557D70] font-bold">
                      ● DUAL-AUDITED
                    </span>
                  </div>
                  <VerificationCompareScene className="w-full h-auto" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4-Tier Verification Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {statuses.map((s, index) => (
              <Reveal key={s.label} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <div className="border border-[var(--hairline-strong)] bg-[var(--paper-raised)] p-6 rounded-sm shadow-xs flex flex-col justify-between h-full transition-all duration-300 hover:border-[var(--brand)] hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`type-data text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border ${s.badgeColor}`}>
                        {s.badge}
                      </span>
                      <span className="type-caption text-[11px] font-mono text-[var(--muted)]">
                        {s.sub}
                      </span>
                    </div>
                    <h3 className="type-display text-[19px] sm:text-[20px] text-[var(--ink)] font-semibold">
                      {s.label}
                    </h3>
                    <p className="type-body mt-2.5 text-[14px] leading-relaxed text-[var(--ink-muted)]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
