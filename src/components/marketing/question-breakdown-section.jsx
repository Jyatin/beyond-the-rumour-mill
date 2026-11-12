import Link from "next/link";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { DoodleUnderline } from "./doodles";

const TOPIC_FREQUENCIES = [
  {
    topic: "DSA",
    percentage: 84,
    description: "84% of reported interviews",
    examples: "Arrays, Trees, Graphs, DP, Sliding Window",
    color: "bg-[#111016] dark:bg-white"
  },
  {
    topic: "DBMS",
    percentage: 61,
    description: "61% of reported interviews",
    examples: "Indexing, B+ Trees, ACID, Normalization, Sharding",
    color: "bg-[#557D70]"
  },
  {
    topic: "OOP",
    percentage: 58,
    description: "58% of reported interviews",
    examples: "Design Patterns, Polymorphism, SOLID, Class Hierarchy",
    color: "bg-[#AA654E]"
  },
  {
    topic: "System Design",
    percentage: 42,
    description: "42% of reported interviews",
    examples: "Rate Limiters, URL Shortener, Caching, Load Balancers",
    color: "bg-[#8D6BB3]"
  }
];

export function QuestionBreakdownSection() {
  return (
    <section className="border-b border-[var(--hairline-soft)] bg-[var(--paper-tint)] py-20 md:py-26 transition-colors duration-500">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-3">
              <BarChart3 className="size-4.5 text-[var(--brand)]" />
              <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold font-mono">
                INTERVIEW INTELLIGENCE
              </p>
            </div>
            <h2 className="type-display text-[34px] sm:text-[46px] lg:text-[50px] leading-[1.06] text-[var(--ink)]">
              WHAT ARE COMPANIES <br />
              <span className="relative inline-block text-[var(--brand)] italic">
                ACTUALLY ASKING?
                <DoodleUnderline className="absolute -bottom-2 left-0 w-full text-[var(--brand)] pointer-events-none" />
              </span>
            </h2>
            <p className="type-body text-[15.5px] text-[var(--ink-muted)] mt-3 leading-relaxed">
              Synthesized from 45+ verified candidate question signals across the 2026 hiring season.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOPIC_FREQUENCIES.map((item, idx) => (
            <Reveal key={item.topic} delay={idx}>
              <div className="h-full border border-[var(--border)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-6 rounded-sm shadow-xs hover:shadow-md hover:border-[var(--brand)] transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="type-display text-[22px] font-bold text-[var(--ink)]">
                      {item.topic}
                    </h3>
                    <span className="type-display text-[28px] font-bold text-[var(--brand-bright)] font-mono">
                      {item.percentage}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-[var(--border)]/40 h-2 rounded-full overflow-hidden my-3">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <p className="type-data text-[12.5px] text-[var(--brand-bright)] font-semibold font-mono">
                    {item.description}
                  </p>
                  <p className="type-caption text-[12px] text-[var(--ink-muted)] mt-2 leading-relaxed">
                    Key concepts: {item.examples}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-8 hover:scale-[1.02] transition-all shadow-xs"
            asChild
          >
            <Link href="/questions" className="inline-flex items-center gap-2">
              Explore question signals <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
