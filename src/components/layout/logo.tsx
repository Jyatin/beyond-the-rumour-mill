import Link from "next/link";

// A verification seal, not a generic icon — ties the mark to the product's
// core mechanic instead of decorating with an arbitrary glyph.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 shrink-0 ${className ?? ""}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2.5L14.4 4.9L17.7 4.4L18.3 7.7L21.5 9L20.2 12.2L21.5 15.4L18.3 16.7L17.7 20L14.4 19.5L12 21.9L9.6 19.5L6.3 20L5.7 16.7L2.5 15.4L3.8 12.2L2.5 9L5.7 7.7L6.3 4.4L9.6 4.9L12 2.5Z"
          stroke="var(--brand)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M8.8 12.3L10.8 14.3L15.3 9.5"
          stroke="var(--brand)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="type-h3 hidden text-[15px] tracking-tight sm:inline">
        Beyond the <em className="type-display text-[16px]">Rumour Mill</em>
      </span>
      <span className="type-h3 text-[15px] tracking-tight sm:hidden">
        Rumour Mill
      </span>
    </Link>
  );
}
