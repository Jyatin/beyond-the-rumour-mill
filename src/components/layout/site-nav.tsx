"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { primaryNav } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signup" || pathname === "/login";

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 border-b border-[var(--hairline-soft)] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between px-5 md:px-8">
          <Logo />
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="type-body text-[13.5px] text-[var(--muted)]">
              {pathname === "/signup" ? (
                <>
                  <span className="hidden sm:inline">Already have an account? </span>
                  <Link
                    href="/login"
                    className="font-semibold text-[var(--foreground)] hover:text-[#8D6BB3] underline decoration-[#8D6BB3] underline-offset-4 transition-colors"
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Don&apos;t have an account? </span>
                  <Link
                    href="/signup"
                    className="font-semibold text-[var(--foreground)] hover:text-[#8D6BB3] underline decoration-[#8D6BB3] underline-offset-4 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
            <div className="h-4 w-px bg-[var(--hairline-soft)] hidden sm:block" />
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline-soft)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-[1360px] items-center gap-4 lg:gap-6 px-5 md:px-8">
        <Logo />

        {/* Primary Desktop Nav Links */}
        <nav className="ml-2 hidden items-center gap-0.5 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative px-3 py-1.5 type-small text-[13.5px] rounded-md transition-colors flex items-center gap-1.5",
                  active
                    ? "text-[var(--foreground)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--paper-tint)]"
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="type-mono text-[9px] font-bold text-[#8D6BB3] bg-[#E5D9F1] dark:bg-[#44345a] dark:text-[#b99bd8] px-1.5 py-0.2 rounded-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Search Bar / Modal Trigger */}
        <button
          className="hidden h-9 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3.5 type-small text-[12.5px] text-[var(--muted)] transition-all hover:border-[var(--brand)] hover:text-[var(--foreground)] xl:flex shadow-2xs"
          data-command-trigger
          aria-label="Open search"
        >
          <Search className="size-3.5 text-[var(--muted)]" />
          <span>Search</span>
          <span className="text-[var(--border-strong)] mx-1 opacity-50">|</span>
          <kbd className="type-data border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 text-[10px] text-[var(--muted)] rounded-xs">
            ⌘K
          </kbd>
        </button>

        <button
          className="flex xl:hidden size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
          data-command-trigger
          aria-label="Open search"
        >
          <Search className="size-4" />
        </button>

        {/* Secondary Action: Share an experience */}
        <Link
          href="/experiences/share"
          className="hidden md:inline-flex items-center justify-center type-small text-[13px] text-[var(--muted)] hover:text-[var(--foreground)] px-2.5 py-1.5 rounded-md transition-colors"
        >
          Share an experience
        </Link>

        {/* Auth Group: Sign in & Sign up */}
        <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 border-l border-[var(--hairline-soft)]">
          <Link
            href="/login"
            className="type-small text-[13.5px] font-medium text-[var(--foreground)]/80 hover:text-[var(--foreground)] px-2.5 py-1.5 rounded-md transition-colors"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-4.5 py-2 text-[13px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer"
          >
            Sign up
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
