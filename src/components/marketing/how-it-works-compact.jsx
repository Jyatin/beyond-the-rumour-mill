import { Search, MessageSquare, Award, ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { DoodleSparkle } from "./doodles";

export function HowItWorksCompact() {
  const steps = [
    {
      num: "01",
      action: "DISCOVER",
      title: "Find who's been there",
      description: "Search verified experiences and authentic round descriptions from your target companies and roles.",
      icon: Search,
      accent: "text-[#155A38] bg-[#EAF4EE] border-[#155A38]/25",
    },
    {
      num: "02",
      action: "ASK",
      title: "Ask targeted questions",
      description: "Get relevant insights from community members and learn from first-hand interview experiences.",
      icon: MessageSquare,
      accent: "text-[#1B2540] bg-[#EEF1F8] border-[#1B2540]/25",
    },
    {
      num: "03",
      action: "PREPARE",
      title: "Prepare with confidence",
      description: "Review interview patterns, identify important topics, and develop a focused preparation strategy.",
      icon: Award,
      accent: "text-[#155A38] bg-[#EAF4EE] border-[#155A38]/25",
    },
  ];

  return (
    <section className="relative border-b border-[var(--hairline-soft)] bg-[var(--background)] py-16 md:py-24 overflow-hidden transition-colors duration-500">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-[620px] mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <DoodleSparkle className="size-5 text-[var(--brand)]" />
              <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold font-mono">
                HOW IT WORKS
              </p>
            </div>
            <h2 className="type-display text-[32px] sm:text-[42px] leading-[1.1] text-[var(--ink)]">
              Three steps from rumour to <span className="text-[var(--brand)] italic">actionable plan.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.num} delay={idx} className="h-full">
                <div className="h-full border border-[var(--border)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-7 rounded-sm shadow-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5 border-b border-[var(--border)] pb-3">
                      <span className="type-display text-[26px] font-bold text-[var(--ink)]">
                        {step.num}
                      </span>
                      <span className={`type-data text-[11px] uppercase font-mono px-2.5 py-0.5 rounded-full font-bold border ${step.accent}`}>
                        {step.action}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2.5">
                      <Icon className="size-5 text-[var(--brand-bright)]" />
                      <h3 className="type-display text-[20px] font-semibold text-[var(--ink)]">
                        {step.title}
                      </h3>
                    </div>

                    <p className="type-body text-[14.5px] leading-relaxed text-[var(--ink-muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
