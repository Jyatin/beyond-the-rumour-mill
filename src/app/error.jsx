"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("[APP-ERROR-BOUNDARY]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 md:py-28 text-center space-y-6">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-700 border border-red-200">
        <AlertCircle className="size-6" />
      </div>
      <div className="space-y-2">
        <p className="type-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Unexpected Error
        </p>
        <h1 className="type-display text-3xl sm:text-4xl text-[var(--foreground)]">
          Something interrupted this page.
        </h1>
        <p className="type-body text-[15px] text-[var(--muted)] max-w-md mx-auto">
          We hit a temporary issue while loading this request. You can retry cleanly or return to the homepage.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-[#1B635C] hover:bg-[#154d48] text-white px-5 py-2.5 text-[14px] font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="size-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-[14px] font-medium text-[var(--foreground)] hover:bg-[var(--paper-tint)] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

