import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { companies } from "@/lib/mock-data";
import { DoodleSparkle } from "./doodles";
import { Reveal } from "./reveal";

export function CompaniesStrip() {
  return (
    <section className="border-b border-[var(--hairline-soft)] bg-[var(--background)] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DoodleSparkle className="size-5" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                  Company Dossiers / 09 · Patterns
                </p>
              </div>
              <h2 className="type-display max-w-[15ch] text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.02] text-[var(--ink)]">
                Start with a <br />
                <em className="italic text-[var(--brand)]">company name.</em>
              </h2>
            </div>
            <div className="max-w-[36ch]">
              <p className="type-body text-[16px] leading-relaxed text-[var(--ink-muted)]">
                Every company dossier reveals question topic frequencies, round expectations, and recent changes in evaluation criteria.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Editorial Company Dossiers Grid */}
        <div className="grid gap-8 md:grid-cols-3 items-stretch">
          {companies.map((c, i) => (
            <Reveal key={c.id} delay={(i + 1) as 1 | 2 | 3}>
              <Link
                href={`/companies/${c.id}`}
                className="group relative flex flex-col justify-between h-full border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-7 rounded-sm shadow-card transition-all duration-300 hover:scale-[1.02] hover:border-[var(--brand)] hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-5">
                    <span className="type-data text-[11px] uppercase tracking-wider text-[var(--muted)] font-semibold font-mono">
                      {c.industry}
                    </span>
                    <span className="type-data text-[10.5px] uppercase font-mono px-2 py-0.5 rounded-xs bg-[var(--brand-soft)] text-[var(--brand-bright)] font-semibold">
                      {c.verificationStatus}
                    </span>
                  </div>

                  <h3 className="type-display text-[32px] sm:text-[36px] text-[var(--ink)] leading-none group-hover:text-[var(--brand)] transition-colors">
                    {c.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.roles.map((role) => (
                      <span key={role} className="type-caption text-[11.5px] border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-0.5 rounded-xs">
                        {role}
                      </span>
                    ))}
                  </div>

                  {/* Topic Frequency Bar Meters */}
                  <div className="mt-6 space-y-2.5 border-t border-[var(--border)] pt-5">
                    <p className="type-data text-[10.5px] uppercase tracking-wider text-[var(--muted)] font-mono">
                      ROUND TOPIC CONCENTRATION
                    </p>
                    {c.topTopics.slice(0, 3).map((t) => (
                      <div key={t.topic} className="space-y-1">
                        <div className="flex justify-between type-data text-[11.5px] text-[var(--ink)]">
                          <span>{t.topic}</span>
                          <span className="font-semibold text-[var(--brand-bright)]">{t.pct}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-[var(--border)] overflow-hidden">
                          <div
                            className="h-full bg-[var(--brand)] rounded-full transition-all duration-500"
                            style={{ width: `${t.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="type-data text-[12px] font-mono text-[var(--ink-muted)]">
                    {c.experienceCount} verified reports
                  </span>
                  <span className="type-data text-[12px] font-mono text-[var(--brand)] group-hover:underline inline-flex items-center gap-1 font-semibold">
                    View dossier <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/companies"
            className="type-small text-[14px] font-medium text-[var(--brand-bright)] hover:underline inline-flex items-center gap-1.5"
          >
            Explore all company archives <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
