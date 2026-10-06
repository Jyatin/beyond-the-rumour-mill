"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { experiences, questions } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  DoodleCircleCheck,
  DoodleSparkle,
  DoodleStar,
  DoodleSwoosh,
  DoodleTape,
  DoodleUnderline,
} from "./doodles";
import { Reveal } from "./reveal";
import { DocumentingExperienceScene, PeopleSharingScene } from "./illustrations";

export function DiscoverySection() {
  return (
    <section className="border-b border-[var(--hairline-soft)] bg-[var(--paper-raised)] py-20 md:py-28 overflow-hidden transition-colors duration-700">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                Experience Discovery / 04 · Live Field Notes
              </p>
              <h2 className="type-display text-[38px] sm:text-[50px] lg:text-[58px] leading-[1.02] text-[var(--ink)]">
                Find the story <br />
                behind the{" "}
                <span className="relative inline-block text-[var(--brand)] italic">
                  outcome.
                  <DoodleUnderline className="absolute -bottom-2.5 left-0 w-full text-[var(--brand)] pointer-events-none" />
                </span>
              </h2>
              <p className="type-body-lg text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-muted)] max-w-[42ch]">
                Search by company, role, year, or question topic. Read the specific round structures and evaluation criteria that usually disappear between campus rumours and your interview slot.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-6 transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <Link href="/experiences" className="inline-flex items-center gap-2">
                    Browse the archive <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Link
                  href="/companies"
                  className="type-body text-[14px] font-medium text-[var(--ink)] hover:text-[var(--brand)] transition-colors inline-flex items-center gap-1"
                >
                  View company dossiers <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Layered Documenting Desk Scene Illustration */}
          <Reveal delay={2} className="relative flex justify-center">
            <div className="relative w-full max-w-[540px] border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-6 rounded-sm shadow-card rotate-[-1deg] hover:rotate-0 transition-transform duration-500 animate-paper-float">
              <DoodleTape className="absolute -top-3 left-10" />
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
                <span className="type-data text-[11px] uppercase tracking-wider text-[var(--brand)] font-semibold font-mono">
                  FIG 04. INTERVIEW RECONSTRUCTION
                </span>
                <span className="type-data text-[11px] font-mono text-[var(--muted)]">CAMPUS 2026</span>
              </div>

              <DocumentingExperienceScene className="w-full h-auto" />

              <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="type-data text-[11px] text-[var(--brand-bright)] font-mono">
                  ● ROUNDS & TIMELINES CAPTURED
                </span>
                <span className="type-data text-[11px] text-[var(--muted)] font-mono">
                  94% SIGNAL ACCURACY
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function EvidenceSection() {
  return (
    <section className="border-b border-[var(--hairline-soft)] bg-[var(--paper-tint)] py-20 md:py-28 overflow-hidden transition-colors duration-700">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DoodleSparkle className="size-5 text-[var(--brand)]" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                  Field Notes / 05 · Recent Archive
                </p>
              </div>
              <h2 className="type-display max-w-[16ch] text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.02] text-[var(--ink)]">
                Real experiences. <br />
                <span className="relative inline-block text-[var(--brand)] italic">
                  Not rumours.
                  <DoodleUnderline className="absolute -bottom-2.5 left-0 w-full text-[var(--brand)] pointer-events-none" />
                </span>
              </h2>
            </div>
            <div className="max-w-[38ch]">
              <p className="type-body text-[16px] leading-relaxed text-[var(--ink-muted)]">
                Every verified record keeps the authentic texture, question breakdowns, and timelines of the person who lived it.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Physical Paper Collage Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {experiences.map((experience, index) => {
            const rotations = ["rotate-[-1.5deg]", "rotate-[1deg]", "rotate-[-0.8deg]"];
            const paperTints = [
              "bg-[#FFFFFF] dark:bg-[var(--surface)]",
              "bg-[#FAFAFA] dark:bg-[var(--surface-elevated)]",
              "bg-[#FFFFFF] dark:bg-[var(--surface)]",
            ];

            return (
              <Reveal key={experience.id} delay={(index + 1) as 1 | 2 | 3}>
                <Link
                  href={`/experiences/${experience.id}`}
                  className={`group relative flex flex-col justify-between h-full border border-[var(--hairline-strong)] ${paperTints[index % 3]
                    } p-7 rounded-sm shadow-card transition-all duration-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:rotate-0 ${rotations[index % 3]
                    }`}
                >
                  <DoodleTape className="absolute -top-2.5 right-10" />

                  <div>
                    {/* Header with verified badge */}
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-5">
                      <span className="type-data text-[11px] uppercase tracking-wider text-[var(--brand-bright)] font-semibold">
                        {experience.companyName} · {experience.year}
                      </span>
                      {experience.verificationStatus === "verified" ? (
                        <span className="type-data text-[10.5px] text-[#557D70] font-mono inline-flex items-center gap-1 font-semibold">
                          ● REVIEWED
                        </span>
                      ) : (
                        <span className="type-data text-[10.5px] text-[#AA654E] font-mono">
                          ○ COMMUNITY
                        </span>
                      )}
                    </div>

                    {/* Role Title */}
                    <h3 className="type-display text-[25px] sm:text-[27px] text-[var(--ink)] leading-snug group-hover:text-[var(--brand)] transition-colors">
                      {experience.companyName} / <br />
                      <span className="font-normal">{experience.role}</span>
                    </h3>

                    {/* Summary */}
                    <p className="type-body mt-4 text-[14.5px] leading-relaxed text-[var(--ink-muted)]">
                      {experience.summary}
                    </p>
                  </div>

                  {/* Metrics Footer */}
                  <div className="mt-8 grid grid-cols-3 border-t border-[var(--border)] pt-4 text-center">
                    <div>
                      <span className="type-data text-[14px] font-bold text-[var(--brand-bright)] block">
                        {experience.rounds}
                      </span>
                      <span className="type-caption text-[10px] uppercase tracking-wider">ROUNDS</span>
                    </div>
                    <div>
                      <span className="type-data text-[14px] font-bold text-[var(--ink)] block">
                        {experience.difficulty}
                      </span>
                      <span className="type-caption text-[10px] uppercase tracking-wider">DIFFICULTY</span>
                    </div>
                    <div>
                      <span className="type-data text-[14px] font-bold text-[var(--brand)] block">
                        {experience.helpfulCount}
                      </span>
                      <span className="type-caption text-[10px] uppercase tracking-wider">HELPFUL</span>
                    </div>
                  </div>

                  <ArrowUpRight className="absolute right-5 top-5 size-4 text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-[var(--brand)]" />
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-[var(--hairline-strong)] hover:border-[var(--brand)] px-7 transition-all hover:scale-[1.02]"
            asChild
          >
            <Link href="/experiences" className="inline-flex items-center gap-2">
              Explore all 64 experiences <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function MetricsSection() {
  const metrics = [
    { value: "64", label: "Documented Experiences", sub: "Rounds & questions intact" },
    { value: "3", label: "Enterprise Dossiers", sub: "Amazon, Microsoft, Google" },
    { value: "45", label: "Reported Question Signals", sub: "Logged from live rounds" },
    { value: "2026", label: "Current Season Intel", sub: "Updated this recruitment cycle" },
  ];

  return (
    <section className="border-y border-[var(--hairline-strong)] bg-[#FAFAFA] dark:bg-[var(--surface-elevated)] transition-colors duration-500">
      <div className="mx-auto grid max-w-[1360px] divide-y divide-[var(--hairline-strong)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 px-5 md:px-8">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={(index % 4) as 0 | 1 | 2 | 3}>
            <div className="px-6 py-10 md:py-12 group hover:bg-white/40 dark:hover:bg-black/20 transition-colors duration-300">
              <p className="type-display text-[46px] sm:text-[54px] text-[var(--brand-bright)] font-semibold leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
                {metric.value}
              </p>
              <p className="type-display text-[16px] text-[var(--ink)] mt-2 font-medium">
                {metric.label}
              </p>
              <p className="type-caption text-[12px] text-[var(--ink-muted)] mt-1 font-mono">
                {metric.sub}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function QuestionsSection() {
  return (
    <section className="border-b border-[var(--hairline-soft)] bg-[var(--background)] py-20 md:py-28 overflow-hidden transition-colors duration-700">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
          <Reveal>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <DoodleCircleCheck className="size-5" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                  Question Archive / 06 · Interview Signals
                </p>
              </div>
              <h2 className="type-display text-[38px] sm:text-[50px] lg:text-[58px] leading-[1.02] text-[var(--ink)]">
                What were they <br />
                <span className="relative inline-block text-[var(--brand)] italic">
                  actually asked?
                  <DoodleUnderline className="absolute -bottom-2.5 left-0 w-full text-[var(--brand)] pointer-events-none" />
                </span>
              </h2>
              <p className="type-body-lg text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-muted)] max-w-[40ch]">
                Patterns become visible when the exact question is logged, tagged by topic, and correlated across interviewers.
              </p>

              {/* Sticky handwritten note with micro float */}
              <div className="mt-8 relative inline-block border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface-elevated)] p-5 rounded-xs shadow-card rotate-[-2deg] animate-paper-float">
                <DoodleTape className="absolute -top-3 left-6 animate-sway-slow" />
                <p className="type-display text-[15px] italic text-[var(--ink)]">
                  “68% of candidates reported System Design fundamentals in SDE-1 rounds for 2026.”
                </p>
                <span className="type-data text-[10px] uppercase text-[var(--brand)] font-mono block mt-2">
                  CAMPUS SIGNAL TREND
                </span>
              </div>
            </div>
          </Reveal>

          {/* Question Exam/Memo Sheets */}
          <div className="space-y-4">
            {questions.map((question, index) => (
              <Reveal key={question.id} delay={(index + 1) as 1 | 2 | 3}>
                <Link
                  href={`/questions#${question.id}`}
                  className="group block border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-6 rounded-sm shadow-xs transition-all duration-300 hover:border-[var(--brand)] hover:shadow-md hover:translate-x-1.5"
                >
                  <div className="flex items-start gap-4">
                    <span className="type-data text-[13px] font-bold text-[var(--brand-bright)] font-mono mt-0.5">
                      0{index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="type-display text-[19px] sm:text-[21px] text-[var(--ink)] leading-snug group-hover:text-[var(--brand)] transition-colors">
                        {question.text}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="type-data text-[11px] uppercase tracking-wide bg-[var(--brand-soft)]/60 text-[var(--brand-bright)] px-2 py-0.5 rounded-xs font-mono">
                          {question.topic}
                        </span>
                        <span className="type-data text-[11px] text-[var(--muted)] font-mono">
                          • {question.reportedIn} verified reports
                        </span>
                        <span className="type-data text-[11px] text-[var(--ink-muted)] font-mono">
                          • Difficulty: {question.difficulty}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--brand)]" />
                  </div>
                </Link>
              </Reveal>
            ))}

            <div className="pt-2 text-right">
              <Link
                href="/questions"
                className="type-small text-[13.5px] font-medium text-[var(--brand-bright)] hover:underline inline-flex items-center gap-1.5"
              >
                View all interview questions <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section className="relative border-b border-[var(--hairline-soft)] bg-[var(--paper-blue)] py-20 md:py-28 overflow-hidden transition-colors duration-700">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-[920px] text-center">
            <DoodleSwoosh className="absolute -left-12 top-0 hidden w-24 text-[var(--brand)] md:block" />
            <div className="inline-flex items-center gap-2 mb-4">
              <DoodleStar className="size-4 text-[var(--brand)]" />
              <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                From the Community / 07 · Voices & Shared Knowledge
              </p>
            </div>
            <blockquote className="type-display text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.1] text-[var(--ink)]">
              “The useful part was not just knowing the answer. It was knowing what the room would{" "}
              <span className="relative inline-block text-[var(--brand)] italic">
                ask next.
                <DoodleUnderline className="absolute -bottom-2 left-0 w-full text-[var(--brand)] pointer-events-none" />
              </span>
              ”
            </blockquote>
            <DoodleStar className="absolute -right-8 bottom-4 hidden size-7 text-[var(--brand)] md:block" />
            <p className="type-data mt-6 text-[13px] font-mono text-[var(--ink-muted)] tracking-wide uppercase">
              Jyatin Singh · SDE Intern @ Amazon (2026 Batch)
            </p>
          </div>
        </Reveal>

        {/* Hand-drawn People Sharing Illustration Scene */}
        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-[640px] border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-6 rounded-sm shadow-card rotate-[0.5deg] hover:rotate-0 transition-transform duration-500 animate-paper-float">
            <PeopleSharingScene className="w-full h-auto" />
            <p className="type-caption mt-2 text-center text-[12px] text-[var(--ink-muted)] font-mono">
              REAL PEOPLE • REAL CONTEXT • REAL PEER VERIFICATION
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-[var(--hairline-strong)]/80 pt-10 md:grid-cols-2">
          <Reveal delay={1}>
            <div className="border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-6 rounded-xs shadow-xs rotate-[-0.5deg] hover:rotate-0 transition-transform duration-300">
              <p className="type-display text-[22px] text-[var(--ink)] leading-snug">
                A verified record is more generous than a rumour.
              </p>
              <p className="type-body mt-3 text-[14.5px] leading-relaxed text-[var(--ink-muted)]">
                Every contribution gives the next candidate a little more context, a little less anxiety, and a genuine question to bring into the interview.
              </p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="border border-[var(--hairline-strong)] bg-[#FAFAFA] dark:bg-[var(--surface)] p-6 rounded-xs shadow-xs rotate-[0.5deg] hover:rotate-0 transition-transform duration-300">
              <p className="type-display text-[22px] text-[var(--ink)] leading-snug">
                Zero gatekeeping, zero corporate marketing spin.
              </p>
              <p className="type-body mt-3 text-[14.5px] leading-relaxed text-[var(--ink-muted)]">
                All entries are submitted anonymously or under verified student handles, vetted by peers who went through the exact same placement season.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
