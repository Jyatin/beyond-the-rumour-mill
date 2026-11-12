import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 md:py-28 text-center space-y-6">
      <p className="type-mono text-[11.5px] uppercase tracking-[0.18em] text-[#1B635C] font-semibold">
        404 · Page Not Found
      </p>
      <h1 className="type-display text-4xl sm:text-5xl text-[var(--foreground)] leading-[1.05]">
        We couldn&apos;t find that dossier.
      </h1>
      <p className="type-body text-[15.5px] text-[var(--muted)] max-w-md mx-auto leading-relaxed">
        The company dossier, experience report, or page you requested does not exist or may have been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#1B635C] hover:bg-[#154d48] text-white px-6 py-2.5 text-[14px] font-medium transition-colors"
        >
          <span>Return Home</span>
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/companies"
          className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-[14px] font-medium text-[var(--foreground)] hover:bg-[var(--paper-tint)] transition-colors"
        >
          Browse Companies
        </Link>
        <Link
          href="/experiences"
          className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-[14px] font-medium text-[var(--foreground)] hover:bg-[var(--paper-tint)] transition-colors"
        >
          Experience Archive
        </Link>
      </div>
    </div>
  );
}

