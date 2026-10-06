"use client";

import { DoodleDots, DoodleStar, DoodleUnderline } from "./doodles";
import { Reveal } from "./reveal";
import { RumourNoiseScene } from "./illustrations";
import { useInView } from "./scroll-story";

export function ProblemSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative border-b border-[var(--hairline-soft)] bg-[var(--paper-tint)] overflow-hidden transition-colors duration-700"
    >
      <DoodleStar className="absolute top-8 right-12 size-6 text-[var(--brand)] opacity-60 hidden md:block" />
      <div className="mx-auto max-w-[1360px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <Reveal>
              <div className="space-y-3 mb-6">
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                  The Thesis / 02 · Rumour & Noise
                </p>
                <div className="inline-block border border-[var(--hairline-strong)] bg-[var(--paper-raised)] px-3 py-1 text-[11px] font-mono text-[var(--ink-muted)] rounded-xs rotate-[-2deg] shadow-2xs">
                  CAMPUS INTELLIGENCE REPORT
                </div>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <DoodleDots className="mb-4 w-14 text-[var(--brand)] opacity-80" />
              <h2 className="type-display max-w-[22ch] text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.06] text-[var(--ink)]">
                Most placement prep is a story passed from{" "}
                <span className="relative inline-block text-[var(--brand-bright)] italic">
                  one person to the next.
                  <DoodleUnderline className="absolute -bottom-2.5 left-0 w-full text-[var(--brand-bright)] pointer-events-none" />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-8 grid gap-8 md:grid-cols-2 border-t border-[var(--hairline-strong)]/70 pt-8">
                <p className="type-body-lg text-[15.5px] leading-relaxed text-[var(--ink-muted)]">
                  It is rarely wrong on purpose. It is simply unverified, scattered across WhatsApp groups, and stale by the time it reaches your inbox.
                </p>
                <p className="type-body-lg text-[15.5px] leading-relaxed text-[var(--ink)] font-medium">
                  We turn that chain of forwards into an immutable, living record: who interviewed, what rounds happened, what questions were asked, and how recently anyone checked.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Hand-drawn Rumour / Noise Illustration Scene */}
          <Reveal delay={2} className="relative flex justify-center">
            <div className="w-full max-w-[500px] border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-6 rounded-sm shadow-card rotate-[1deg] hover:rotate-0 transition-all duration-500 animate-paper-float">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
                <span className="type-data text-[11px] font-mono uppercase tracking-wider text-[var(--brand-bright)] font-semibold">
                  FIG 02. CAMPUS NOISE RECONCILIATION
                </span>
                <span className="type-data text-[10.5px] font-mono text-[var(--muted)]">
                  {isInView ? "FILTERING NOISE..." : "UNCHECKED"}
                </span>
              </div>
              <RumourNoiseScene isCrossedOut={isInView} className="w-full h-auto" />
              <p className="type-caption mt-3 text-center text-[12px] text-[var(--ink-muted)] italic">
                {isInView ? "✓ 4 unverified rumours crossed out & verified." : "Scroll to verify campus hearsay."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
