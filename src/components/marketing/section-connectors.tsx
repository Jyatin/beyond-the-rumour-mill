"use client";

import * as React from "react";
import { DoodleStar, DoodleTape } from "./doodles";

/**
 * Hand-drawn section connector that draws an SVG stroke as the user scrolls into view.
 */
export function SectionConnector({
  className,
  type = "curve-down",
  label,
}: {
  className?: string;
  type?: "curve-down" | "s-curve" | "straight-arrow" | "loop";
  label?: string;
}) {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full flex flex-col items-center justify-center py-2 pointer-events-none select-none z-20 overflow-visible ${
        className || ""
      }`}
      aria-hidden="true"
    >
      {type === "curve-down" && (
        <div className="relative flex flex-col items-center -my-6">
          <svg width="64" height="72" viewBox="0 0 64 72" fill="none">
            <path
              d="M32 2 C32 24 16 38 32 60"
              stroke="#8D6BB3"
              strokeWidth="2.2"
              strokeDasharray="140"
              strokeDashoffset={inView ? "0" : "140"}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 900ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            />
            {/* Arrowhead */}
            <path
              d="M24 52 L32 62 L40 52"
              stroke="#8D6BB3"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(-4px)",
                transition: "all 300ms ease 600ms",
              }}
            />
          </svg>
          {label && (
            <span
              className="type-data text-[10px] uppercase tracking-widest text-[var(--brand)] font-mono -mt-1 bg-[var(--background)] px-2 py-0.5 border border-[var(--hairline-soft)] rounded-xs shadow-2xs"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 400ms ease 700ms",
              }}
            >
              {label}
            </span>
          )}
        </div>
      )}

      {type === "s-curve" && (
        <div className="relative flex flex-col items-center -my-6">
          <svg width="90" height="80" viewBox="0 0 90 80" fill="none">
            <path
              d="M20 2 C50 15 70 35 45 52 C30 62 40 70 52 74"
              stroke="#557D70"
              strokeWidth="2.2"
              strokeDasharray="180"
              strokeDashoffset={inView ? "0" : "180"}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1000ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            />
            <path
              d="M44 68 L53 75 L54 64"
              stroke="#557D70"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 300ms ease 700ms",
              }}
            />
          </svg>
        </div>
      )}

      {type === "loop" && (
        <div className="relative flex flex-col items-center -my-6">
          <svg width="80" height="74" viewBox="0 0 80 74" fill="none">
            <path
              d="M40 2 C25 20 18 35 40 38 C58 40 60 22 42 22 C22 22 26 48 40 66"
              stroke="#AA654E"
              strokeWidth="2"
              strokeDasharray="220"
              strokeDashoffset={inView ? "0" : "220"}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1100ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            />
            <path
              d="M32 58 L40 68 L48 58"
              stroke="#AA654E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 300ms ease 800ms",
              }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * Floating Paper Transition Card drifting between sections
 */
export function FloatingPaperDrift({
  text = "Verified Dossier",
  sub = "0 delay",
  rotation = "-2deg",
  className,
}: {
  text?: string;
  sub?: string;
  rotation?: string;
  className?: string;
}) {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex justify-center -my-5 z-20 pointer-events-none select-none ${
        className || ""
      }`}
    >
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView
            ? `translateY(0) rotate(${rotation})`
            : `translateY(24px) rotate(-6deg)`,
        }}
      >
        <div className="animate-paper-float border border-[var(--hairline-strong)] bg-[#FFFFFF] dark:bg-[var(--surface-elevated)] px-4 py-2 rounded-xs shadow-card flex items-center gap-2.5">
          <DoodleTape className="absolute -top-2 left-6" />
          <DoodleStar className="size-3.5 text-[var(--brand)]" />
          <div>
            <p className="type-display text-[12px] text-[var(--ink)] font-semibold leading-none">
              {text}
            </p>
            <span className="type-data text-[9px] text-[var(--ink-muted)] block mt-0.5">
              ● {sub}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
