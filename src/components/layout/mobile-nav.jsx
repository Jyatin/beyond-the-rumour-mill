"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  CheckSquare,
  FileText,
  HelpCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Companies", href: "/companies", icon: Building2 },
  { label: "Prepare", href: "/prepare", icon: CheckSquare },
  { label: "Stories", href: "/experiences", icon: FileText },
  { label: "Q&A", href: "/questions", icon: HelpCircle },
  { label: "Alumni", href: "/alumni", icon: Users },
];

export function MobileNav() {
  const pathname = usePathname();
  if (pathname === "/signup" || pathname === "/login" || pathname === "/reset-password") {
    return null;
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch justify-between px-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 min-w-0 flex-col items-center justify-center gap-0.5 py-2 transition-colors"
            >
              <Icon
                className={cn(
                  "size-4.5 transition-transform",
                  active ? "text-[#8D6BB3] scale-105" : "text-[var(--muted)]"
                )}
                strokeWidth={active ? 2.25 : 1.75}
              />
              <span
                className={cn(
                  "type-caption text-[10px] truncate max-w-full px-0.5",
                  active
                    ? "text-[var(--foreground)] font-semibold"
                    : "text-[var(--muted)]"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
