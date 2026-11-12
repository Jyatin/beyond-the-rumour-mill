"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { primaryNav } from "@/lib/nav-data";
import { cn } from "@/lib/utils";
import { NotificationBell } from "./notification-bell";
import { authClient } from "@/lib/auth-client";

export function SiteNav({
  user,
  notifications = [],
  unreadCount = 0,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/signup" || pathname === "/login" || pathname === "/reset-password";
  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 border-b border-[#ECEAE5] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[64px] max-w-[1360px] items-center justify-between px-4 sm:px-6 md:px-8">
          <Logo />
          <div className="type-body text-[14px] text-[#4a4752]">
            {pathname === "/signup" ? (
              <>
                <span className="hidden sm:inline">Already have an account? </span>
                <Link
                  href="/login"
                  className="font-medium text-[#1B635C] hover:underline underline-offset-4 transition-colors"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Don&apos;t have an account? </span>
                <Link
                  href="/signup"
                  className="font-medium text-[#1B635C] hover:underline underline-offset-4 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#ECEAE5] bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1360px] items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Exact Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "type-body text-[14.5px] font-normal text-[#1A191D] hover:text-[#1B635C] transition-colors inline-flex items-center gap-1",
                  active && "text-[#1B635C] font-medium"
                )}
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="size-3.5 opacity-60 stroke-[1.8]" />}
              </Link>
            );
          })}
        </nav>

        {/* Right: Notification Bell & Profile / Sign In */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {user ? (
            <>
              {(user.role === "admin" || user.role === "tpo") && (
                <div className="hidden sm:inline-flex items-center gap-2">
                  <Link
                    href="/admin/drives"
                    className="inline-flex items-center text-[12.5px] font-mono px-2.5 py-1 rounded-md bg-[#1B635C]/10 text-[#1B635C] font-medium hover:bg-[#1B635C]/20 transition-colors"
                  >
                    TPO Portal
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin/moderation"
                      className="hidden lg:inline-flex items-center text-[12.5px] font-mono px-2.5 py-1 rounded-md border border-[#1B635C]/25 text-[#1B635C] font-medium hover:bg-[#1B635C]/10 transition-colors"
                    >
                      Moderation
                    </Link>
                  )}
                </div>
              )}
              <NotificationBell
                initialNotifications={notifications}
                initialUnreadCount={unreadCount}
              />
              <Link
                href="/profile"
                className="type-body text-[14px] font-medium text-[#111111] hover:text-[#1B635C] transition-colors"
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile
              </Link>
              <button
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/");
                  router.refresh();
                }}
                className="type-body text-[14px] font-normal text-[#111111] hover:text-[#1B635C] transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#1B635C] hover:bg-[#154d48] text-white px-5 py-2 text-[13.5px] sm:text-[14px] font-medium transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer"
              >
                Sign Up
              </Link>

              <Link
                href="/login"
                className="type-body text-[14px] font-medium text-[#1A191D] hover:text-[#1B635C] transition-colors px-1"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}