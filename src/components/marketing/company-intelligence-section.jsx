import Link from "next/link";
import { ArrowRight, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";

const TOP_COMPANIES = [
  {
    name: "Amazon",
    reportsCount: 32,
    hiringRoles: "SDE-1, SDE Intern, Support Engineer",
    primaryFocus: "Graphs, DP, Leadership Principles",
    tagColor: "bg-[#FF9900]/10 text-[#B87000] border-[#FF9900]/30"
  },
  {
    name: "Microsoft",
    reportsCount: 21,
    hiringRoles: "SWE, SWE Intern, Cloud Solution Architect",
    primaryFocus: "Trees, Tries, OOP Design, Concurrency",
    tagColor: "bg-[#00A4EF]/10 text-[#0078D7] border-[#00A4EF]/30"
  },
  {
    name: "Google",
    reportsCount: 11,
    hiringRoles: "Software Engineer, Silicon, Cloud Eng",
    primaryFocus: "Segment Trees, Shortest Path, Low-Level Opt",
    tagColor: "bg-[#4285F4]/10 text-[#1A73E8] border-[#4285F4]/30"
  },
  {
    name: "Atlassian",
    reportsCount: 8,
    hiringRoles: "Grad Engineer, Frontend Eng, SRE",
    primaryFocus: "Pair Programming, Clean Code, Values",
    tagColor: "bg-[#0052CC]/10 text-[#0747A6] border-[#0052CC]/30"
  }
];

export function CompanyIntelligenceSection() {
  return (
    <section className="border-b border-[var(--hairline-soft)] bg-[#FFFFFF] dark:bg-[var(--background)] py-20 md:py-26 transition-colors duration-500">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Building2 className="size-4.5 text-[var(--brand)]" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold font-mono">
                  ENTERPRISE DOSSIERS
                </p>
              </div>
              <h2 className="type-display text-[34px] sm:text-[44px] text-[var(--ink)] leading-tight">
                COMPANY INTELLIGENCE
              </h2>
            </div>
            <Link
              href="/companies"
              className="type-data text-[13.5px] font-semibold text-[var(--brand-bright)] hover:underline inline-flex items-center gap-1.5"
            >
              All companies <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOP_COMPANIES.map((comp, idx) => (
            <Reveal key={comp.name} delay={idx}>
              <Link
                href="/companies"
                className="group block h-full border border-[var(--border)] bg-[#FAFAFA] dark:bg-[var(--surface)] p-6 rounded-sm shadow-xs hover:shadow-md hover:border-[var(--brand)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="type-display text-[24px] font-bold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors">
                    {comp.name}
                  </h3>
                  <span className="type-data text-[12px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#111016] text-white dark:bg-white dark:text-[#111016]">
                    {comp.reportsCount} reports
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <span className="type-caption text-[11px] uppercase tracking-wider text-[var(--ink-muted)] block font-mono">
                      Roles
                    </span>
                    <p className="type-body text-[13.5px] text-[var(--ink)] font-medium">
                      {comp.hiringRoles}
                    </p>
                  </div>

                  <div>
                    <span className="type-caption text-[11px] uppercase tracking-wider text-[var(--ink-muted)] block font-mono">
                      Evaluation Focus
                    </span>
                    <p className="type-caption text-[12.5px] text-[var(--brand-bright)] font-mono">
                      {comp.primaryFocus}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[12px] font-semibold text-[var(--brand-bright)]">
                  <span>View dossier</span>
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-[var(--hairline-strong)] hover:border-[var(--brand)] px-8 hover:scale-[1.02] transition-all"
            asChild
          >
            <Link href="/companies" className="inline-flex items-center gap-2">
              View company dossiers <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
