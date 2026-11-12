import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { DoodleSparkle } from "./doodles";

const RECENT_EXPERIENCES = [
  {
    id: "exp-amazon-sde-intern",
    company: "Amazon",
    role: "SDE Intern",
    year: "2026",
    roundsCount: 4,
    difficulty: "Medium-Hard",
    flow: ["OA", "DSA", "System Design", "HR"],
    keyTopics: ["Graphs", "DP", "Leadership Principles", "LRU Cache"],
    summary: "Online assessment had 2 coding questions + work style assessment. Tech round 1 was graph BFS and DP on trees. Tech round 2 focused on low-level object-oriented design and Amazon LP scenarios."
  },
  {
    id: "exp-microsoft-swe-intern",
    company: "Microsoft",
    role: "SWE Intern",
    year: "2026",
    roundsCount: 3,
    difficulty: "Medium",
    flow: ["OA", "OOP", "Technical", "HR"],
    keyTopics: ["Trees", "Trie", "OOP Design", "Concurrency"],
    summary: "Codility OA with 3 questions. Round 1 covered Tree traversal and Trie prefix matching. Round 2 went deep into OOP design patterns and past distributed systems projects."
  },
  {
    id: "exp-google-swe",
    company: "Google",
    role: "Software Engineer",
    year: "2026",
    roundsCount: 5,
    difficulty: "Hard",
    flow: ["OA", "DSA 1", "DSA 2", "System Design", "Googlyness"],
    keyTopics: ["Segment Tree", "Graph Dijkstra", "Rate Limiter", "Googlyness"],
    summary: "Intense algorithmic interviews. First DSA round covered interval graphs and segment trees. Second DSA was shortest path with state transitions. Final rounds tested system design and cultural alignment."
  },
  {
    id: "exp-atlassian-grad",
    company: "Atlassian",
    role: "Grad Engineer",
    year: "2026",
    roundsCount: 4,
    difficulty: "Medium-Hard",
    flow: ["OA", "Coding", "System Design", "Values"],
    keyTopics: ["Data Structures", "Clean Code", "API Design", "Atlassian Values"],
    summary: "HackerRank OA followed by a live paired coding session emphasizing clean, testable code. Architecture round focused on notification service design."
  }
];

export function RecentExperiencesFeed() {
  return (
    <section className="border-b border-[var(--hairline-soft)] bg-[#FFFFFF] dark:bg-[var(--background)] py-20 md:py-26 transition-colors duration-500">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <DoodleSparkle className="size-4.5 text-[var(--brand)]" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold font-mono">
                  LIVE FIELD REPORTS
                </p>
              </div>
              <h2 className="type-display text-[34px] sm:text-[44px] text-[var(--ink)] leading-tight">
                RECENT INTERVIEW EXPERIENCES
              </h2>
            </div>
            <Link
              href="/experiences"
              className="type-data text-[13.5px] font-semibold text-[var(--brand-bright)] hover:underline inline-flex items-center gap-1.5"
            >
              Browse all reports <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="space-y-5">
          {RECENT_EXPERIENCES.map((exp, idx) => (
            <Reveal key={exp.id} delay={idx}>
              <div className="group relative border border-[var(--border)] bg-[#FAFAFA] dark:bg-[var(--surface-elevated)] p-6 sm:p-7 rounded-sm shadow-2xs hover:shadow-md hover:border-[var(--brand)] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--hairline-soft)]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <span className="type-display text-[22px] sm:text-[24px] font-bold text-[var(--ink)]">
                        {exp.company}
                      </span>
                      <span className="text-[var(--muted)]">·</span>
                      <span className="type-body text-[16px] font-semibold text-[var(--brand-bright)]">
                        {exp.role}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 type-data text-[12px] font-mono text-[var(--ink-muted)]">
                      <span>{exp.year}</span>
                      <span>·</span>
                      <span>{exp.roundsCount} rounds</span>
                      <span>·</span>
                      <span className="px-2 py-0.5 rounded-xs bg-[var(--brand-soft)] text-[var(--brand-bright)] font-semibold">
                        {exp.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Flow Steps: OA -> DSA -> System Design -> HR */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[12px] bg-[#FFFFFF] dark:bg-[var(--surface)] px-4 py-2 rounded-full border border-[var(--border)]">
                    {exp.flow.map((step, sIdx) => (
                      <span key={step} className="flex items-center gap-1.5 text-[var(--ink)]">
                        <span className="font-semibold text-[var(--brand-bright)]">{step}</span>
                        {sIdx < exp.flow.length - 1 && (
                          <span className="text-[var(--muted)] font-normal">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="type-body text-[14px] leading-relaxed text-[var(--ink-muted)] max-w-[85ch]">
                    {exp.summary}
                  </p>
                  <Link
                    href={`/experiences`}
                    className="shrink-0 type-data text-[13px] font-semibold text-[var(--ink)] group-hover:text-[var(--brand)] inline-flex items-center gap-1 transition-colors"
                  >
                    View dossier <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
