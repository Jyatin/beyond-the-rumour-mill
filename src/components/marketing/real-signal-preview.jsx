import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, Cpu, Code2, Database } from "lucide-react";
import { Reveal } from "./reveal";
import { DoodleSparkle, DoodleTape } from "./doodles";

export function RealSignalPreview() {
  const sampleRounds = [
    { name: "Round 1: OA", detail: "2 DSA Coding Problems + 15 MCQs (OS, DBMS)", icon: Code2 },
    { name: "Round 2: Technical", detail: "Binary Trees, BFS/DFS Graphs & Time Complexity", icon: Layers },
    { name: "Round 3: Core CS", detail: "Database Normalization, Indexing & Concurrency", icon: Database },
    { name: "Round 4: Managerial", detail: "Resume Deep-dive, Past Projects & Behavioral", icon: Cpu },
  ];

  return (
    <section className="relative border-b border-[var(--hairline-soft)] bg-[var(--paper-tint)] py-16 md:py-24 overflow-hidden transition-colors duration-500">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-[620px] mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <DoodleSparkle className="size-5 text-[var(--brand)]" />
              <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold font-mono">
                REAL INTERVIEW SIGNAL
              </p>
            </div>
            <h2 className="type-display text-[32px] sm:text-[42px] leading-[1.1] text-[var(--ink)]">
              What candidates <span className="text-[var(--brand)] italic">actually encountered.</span>
            </h2>
            <p className="type-body text-[15.5px] text-[var(--ink-muted)] mt-3">
              Structured rounds, verified questions, and aggregated evidence from candidates who recently sat for the process.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="relative max-w-3xl mx-auto border border-[var(--border)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-7 sm:p-9 rounded-xl shadow-card">
            <DoodleTape className="absolute -top-3 right-12" />

            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="type-data text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-xs bg-[#4A7768]/10 text-[#4A7768] font-bold border border-[#4A7768]/25 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> 7 Verified Reports
                  </span>
                  <span className="type-data text-[11.5px] font-mono text-[var(--ink-muted)]">
                    Batch 2026
                  </span>
                </div>
                <h3 className="type-display text-[26px] font-bold text-[var(--ink)]">
                  Google · Software Engineer
                </h3>
                <p className="type-body text-[13.5px] text-[var(--brand-bright)] font-medium">
                  On-Campus Placement / Full-Time L3 SWE
                </p>
              </div>

              <Link
                href="/companies/google"
                className="inline-flex items-center justify-center rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-5 py-2.5 text-[13px] font-semibold hover:scale-[1.02] transition-all shadow-xs shrink-0 gap-1.5"
              >
                Explore Google <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Rounds List Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {sampleRounds.map((round) => {
                const Icon = round.icon;
                return (
                  <div
                    key={round.name}
                    className="p-3.5 rounded-md border border-[var(--border)] bg-[#FAFAFA] dark:bg-[var(--surface-elevated)] flex items-start gap-3"
                  >
                    <Icon className="size-4 text-[var(--brand)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="type-data text-[12.5px] font-bold text-[var(--ink)] font-mono">
                        {round.name}
                      </h4>
                      <p className="type-body text-[13px] text-[var(--ink-muted)] mt-0.5 leading-snug">
                        {round.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary Strip */}
            <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono text-[var(--muted)]">
              <span>● Consistency score: 94% verified alignment</span>
              <span className="text-[var(--brand-bright)] font-medium">Updated for 2026/27 hiring cycle</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
