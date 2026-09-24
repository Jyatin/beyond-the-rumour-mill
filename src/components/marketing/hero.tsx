import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoodleUnderline } from "./doodles";
import { Reveal } from "./reveal";
import { HeroIllustrationInteractive } from "./hero-illustration-interactive";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-glow border-b border-[var(--border)]">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8 pt-10 md:pt-14 pb-14 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
          <div className="relative z-10 max-w-[580px]">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="size-2 rounded-full bg-[var(--brand)] animate-ping" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                  Placement intelligence / 01 · The Connection
                </p>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="type-display text-[46px] sm:text-[60px] lg:text-[68px] xl:text-[76px] leading-[0.96] tracking-tight text-[var(--ink)]">
                Connecting{" "}
                <span className="relative inline-block text-[var(--brand)] italic">
                  placed alumni
                  <DoodleUnderline className="absolute -bottom-2 left-0 w-full text-[var(--brand)] pointer-events-none" />
                </span>{" "}
                with <br className="hidden sm:inline" />
                <span className="relative inline-block text-[var(--brand-bright)] italic">
                  tomorrow&apos;s talent.
                  <DoodleUnderline className="absolute -bottom-2.5 left-0 w-full text-[var(--brand-bright)] pointer-events-none" />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="type-body-lg mt-8 max-w-[44ch] text-[16.5px] md:text-[18px] leading-relaxed text-[var(--ink-muted)]">
                Learn from people who have already walked the placement path. Ask what really happened, understand the process, and connect with the people who can help you prepare for what&apos;s next.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button
                  size="lg"
                  className="rounded-full bg-[var(--brand-bright)] hover:bg-[var(--brand)] text-white px-7 py-3.5 h-auto font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  asChild
                >
                  <a href="#alumni-directory" className="inline-flex items-center gap-2">
                    Find an alumni <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Link
                  href="/experiences/share"
                  className="type-body text-[14.5px] font-medium text-[var(--ink)] hover:text-[var(--brand)] transition-colors border-b border-[var(--hairline-strong)] pb-0.5 hover:border-[var(--brand)]"
                >
                  Share your experience
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="relative w-full flex items-center justify-center lg:justify-end">
            <HeroIllustrationInteractive />
          </div>
        </div>
      </div>
    </section>
  );
}
