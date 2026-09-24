"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * Hook to track whether an element is in view with custom threshold
 */
export function useInView(options: IntersectionObserverInit = { threshold: 0.25 }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

/**
 * Sticky interactive story section where sticky illustration responds to scroll steps
 */
export function StickyStorySection({
  steps,
  illustrations,
  eyebrow,
  title,
  subtitle,
}: {
  steps: { id: string; stepNumber: string; title: string; body: string; tag: string }[];
  illustrations: (activeStep: number) => ReactNode;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, index) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        { threshold: 0.6, rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [steps.length]);

  return (
    <div className="relative mx-auto max-w-[1360px] px-5 md:px-8 py-16 md:py-24">
      <div className="mb-14">
        <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold mb-2">
          {eyebrow}
        </p>
        <h2 className="type-display max-w-[18ch] text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.02] text-[var(--ink)]">
          {title}
        </h2>
        <p className="type-body text-[16px] text-[var(--ink-muted)] mt-4 max-w-[44ch]">
          {subtitle}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Sticky Visual / Illustration Side */}
        <div className="lg:sticky lg:top-28 z-10 w-full flex items-center justify-center">
          <div className="w-full transition-all duration-500">
            {illustrations(activeStep)}
          </div>
        </div>

        {/* Scrolling Narrative Steps */}
        <div className="space-y-24 py-6">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              className={`border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-8 rounded-sm shadow-card transition-all duration-500 ${
                activeStep === idx
                  ? "ring-2 ring-[var(--brand)] scale-[1.02] shadow-xl"
                  : "opacity-60 scale-95"
              }`}
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
                <span className="type-data text-[16px] font-bold text-[var(--brand-bright)] font-mono">
                  {step.stepNumber}
                </span>
                <span className="type-data text-[11px] uppercase tracking-wider text-[var(--brand)] font-mono bg-[var(--brand-soft)]/50 px-2 py-0.5 rounded-xs">
                  {step.tag}
                </span>
              </div>
              <h3 className="type-display text-[24px] text-[var(--ink)] leading-snug">
                {step.title}
              </h3>
              <p className="type-body mt-3 text-[15px] leading-relaxed text-[var(--ink-muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
