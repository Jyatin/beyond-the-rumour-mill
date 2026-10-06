"use client";

// Hand-drawn editorial annotations & marks
// Hand-drawn ink style with subtle imperfections and organic curves.
import * as React from "react";
import { cn } from "@/lib/utils";

export function DoodleSparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("animate-sparkle-pulse origin-center", className)}
      aria-hidden="true"
    >
      <path
        d="M20 3 C20.8 11.5 22.5 17.5 37 20 C22.5 22.5 20.8 28.5 20 37 C19.2 28.5 17.5 22.5 3 20 C17.5 17.5 19.2 11.5 20 3 Z"
        fill="#E5C85C"
        stroke="#111016"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={cn("animate-star-twinkle origin-center", className)}
      aria-hidden="true"
    >
      <path
        d="M18 2.5 L22.2 13.8 L34 14.8 L25.2 22.5 L28 34 L18 27.8 L8 34 L10.8 22.5 L2 14.8 L13.8 13.8 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleArrowCurved({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const [inView, setInView] = React.useState(!animate);
  const ref = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 70"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 58 C32 12 78 4 108 42"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{
          strokeDasharray: 200,
          strokeDashoffset: inView ? 0 : 200,
          transition: "stroke-dashoffset 900ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
      <path
        d="M94 44 L110 44 L106 28"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 300ms ease 600ms",
        }}
      />
    </svg>
  );
}

export function DoodleArrowDown({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const [inView, setInView] = React.useState(!animate);
  const ref = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 40 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 4 C18 28 22 52 20 72"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: inView ? 0 : 100,
          transition: "stroke-dashoffset 800ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
      <path
        d="M8 58 L20 74 L32 58"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 250ms ease 500ms",
        }}
      />
    </svg>
  );
}

export function DoodleSwoosh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 30C22 8 45 4 62 14C72 20 78 12 88 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleDots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 14" fill="none" className={className} aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="53" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function DoodleUnderline({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const [inView, setInView] = React.useState(!animate);
  const ref = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 13 C45 3 115 3 157 12"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        style={{
          strokeDasharray: 200,
          strokeDashoffset: inView ? 0 : 200,
          transition: "stroke-dashoffset 950ms cubic-bezier(0.2, 0.8, 0.2, 1) 200ms",
        }}
      />
    </svg>
  );
}

export function DoodleCircleCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="#E5D9F1" stroke="#8D6BB3" strokeWidth="2" />
      <path
        d="M8 14.5 L12 18.5 L20 10"
        stroke="#8D6BB3"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleStamp({
  text = "VERIFIED",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 border-2 border-dashed border-[var(--brand)] text-[var(--brand)] font-mono uppercase text-[11px] font-bold px-2.5 py-1 tracking-wider rounded-sm rotate-[-3deg] select-none shadow-xs",
        className
      )}
    >
      <span>●</span>
      <span>{text}</span>
    </div>
  );
}

export function DoodleTape({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-4 w-16 bg-[#EDE9F5]/70 border-y border-[#DED7E8]/70 backdrop-blur-[1px] rotate-[-4deg] shadow-[0_1px_2px_rgba(20,20,30,0.04)] pointer-events-none select-none",
        className
      )}
    />
  );
}

/**
 * 1. MINI OFFER LETTER SLIP
 * Hand-drawn folded offer dossier with verified seal
 */
export function DoodleOfferLetter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 110" fill="none" className={cn("select-none", className)} aria-hidden="true">
      <rect x="4" y="4" width="80" height="100" rx="4" fill="#FFFFFF" stroke="#18161C" strokeWidth="2.2" />
      <path d="M4 22 H84" stroke="#E8E5EF" strokeWidth="1.5" />
      <text x="12" y="16" fill="#4A7768" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="bold">
        OFFER LETTER
      </text>
      <path d="M12 34 H72 M12 46 H62 M12 58 H68 M12 70 H54" stroke="#E8E5EF" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="66" cy="86" r="10" fill="#4A7768" stroke="#18161C" strokeWidth="1.8" />
      <path d="M62 86 L65 89 L71 83" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 2. SMALL INTERVIEW QUESTION MEMO
 * Hand-drawn sticky note with code/question doodle
 */
export function DoodleQuestionMemo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" className={cn("select-none", className)} aria-hidden="true">
      <rect x="3" y="3" width="94" height="74" rx="4" fill="#FFFFFF" stroke="#18161C" strokeWidth="2" />
      <path d="M10 18 H90" stroke="#8B63B6" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="10" y="14" fill="#8B63B6" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="bold">
        R2 · DSA QUESTION
      </text>
      <text x="10" y="34" fill="#18161C" fontFamily="var(--font-sans)" fontSize="10" fontWeight="600">
        “LRU Cache + Locks”
      </text>
      <path d="M10 46 H70 M10 56 H80 M10 66 H50" stroke="#18161C" strokeOpacity="0.25" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 3. MINI GRADUATION CAP
 */
export function DoodleGraduationCap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 45" fill="none" className={cn("select-none", className)} aria-hidden="true">
      <path d="M30 6 L56 18 L30 30 L4 18 Z" fill="#18161C" stroke="#18161C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 23 V35 C14 38 46 38 46 35 V23" stroke="#18161C" strokeWidth="2" fill="#F0EAF7" />
      <path d="M52 19 V36 C52 38 48 39 48 39" stroke="#E5C85C" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="48" cy="40" r="2" fill="#E5C85C" />
    </svg>
  );
}

/**
 * 4. SMALL HANDSHAKE DOODLE
 */
export function DoodleHandshake({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 45" fill="none" className={cn("select-none", className)} aria-hidden="true">
      <path d="M5 25 C15 15 22 15 32 24 L40 18 C46 14 55 16 65 25" stroke="#18161C" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M28 22 C32 28 38 28 42 22" stroke="#18161C" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="35" cy="10" r="3" fill="#E5C85C" stroke="#18161C" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * 5. MINI DIALOGUE SPEECH BUBBLE
 */
export function DoodleDialogueBubble({
  text = "How was your interview?",
  sub = "SDE-1 Placed Alumni",
  className,
}: {
  text?: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-[var(--border)] bg-[#FFFFFF] dark:bg-[var(--surface-elevated)] p-3 shadow-sm select-none",
        className
      )}
    >
      <p className="type-display text-[12.5px] font-bold text-[var(--foreground)] leading-snug">
        “{text}”
      </p>
      {sub && (
        <span className="type-mono text-[9.5px] text-[#8B63B6] block mt-1">
          ● {sub}
        </span>
      )}
      {/* Speech triangle tail */}
      <div className="absolute -bottom-2 left-5 size-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--border)]" />
    </div>
  );
}

/**
 * 6. TINY PERSON SITTING WITH LAPTOP
 */
export function DoodleTinyCoder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 70" fill="none" className={cn("select-none", className)} aria-hidden="true">
      {/* Desk */}
      <path d="M5 62 H75" stroke="#18161C" strokeWidth="2" strokeLinecap="round" />
      {/* Laptop */}
      <path d="M22 62 L28 44 H52 L58 62 Z" fill="#FFFFFF" stroke="#18161C" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M18 62 H62" stroke="#18161C" strokeWidth="2" strokeLinecap="round" />
      {/* Character body */}
      <path d="M30 42 C20 48 16 55 18 62 H62 C64 55 60 48 50 42 Z" fill="#F0EAF7" stroke="#18161C" strokeWidth="2" />
      {/* Head */}
      <circle cx="40" cy="24" r="14" fill="#FFFFFF" stroke="#18161C" strokeWidth="2" />
      <path d="M28 20 C28 8 52 8 52 20 Z" fill="#18161C" />
      <circle cx="36" cy="24" r="1.5" fill="#18161C" />
      <circle cx="44" cy="24" r="1.5" fill="#18161C" />
      <path d="M37 30 C39 32 41 32 43 30" stroke="#18161C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
