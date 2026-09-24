"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Users, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Connect", href: "/connect", icon: Users },
  { label: "Explore", href: "/companies", icon: Compass },
  { label: "Sign In", href: "/login", icon: LogIn },
  { label: "Sign Up", href: "/signup", icon: UserPlus },
];

export function MobileNav() {
  const pathname = usePathname();

  if (pathname === "/signup" || pathname === "/login") {
    return null;
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch justify-between px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors"
            >
              <Icon
                className={cn(
                  "size-5 transition-transform",
                  active ? "text-[#8D6BB3] scale-105" : "text-[var(--muted)]"
                )}
                strokeWidth={active ? 2.25 : 1.75}
              />
              <span
                className={cn(
                  "type-caption text-[10.5px]",
                  active ? "text-[var(--foreground)] font-semibold" : "text-[var(--muted)]"
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
