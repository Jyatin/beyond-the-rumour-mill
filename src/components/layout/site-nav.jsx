"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { primaryNav } from "@/lib/nav-data";
import { cn } from "@/lib/utils";
export function SiteNav({
  user
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signup" || pathname === "/login";
  if (isAuthPage) {
    return <header className="sticky top-0 z-40 border-b border-[#ECEAE5] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between px-6 md:px-10">
          <Logo />
          <div className="type-body text-[14px] text-[#4a4752]">
            {pathname === "/signup" ? <>
                <span className="hidden sm:inline">Already have an account? </span>
                <Link href="/login" className="font-medium text-[#1B635C] hover:underline underline-offset-4 transition-colors">
                  Sign In
                </Link>
              </> : <>
                <span className="hidden sm:inline">Don&apos;t have an account? </span>
                <Link href="/signup" className="font-medium text-[#1B635C] hover:underline underline-offset-4 transition-colors">
                  Sign Up
                </Link>
              </>}
          </div>
        </div>
      </header>;
  }
  return <header className="sticky top-0 z-40 border-b border-[#ECEAE5] bg-white">
      <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between px-6 md:px-10">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Exact Navigation Links with Dropdown Chevrons */}

        <nav className="hidden md:flex items-center gap-7">
          {primaryNav.map(item => {
          const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return <Link key={item.label} href={item.href} className={cn("type-body text-[14px] font-normal text-[#111111] hover:text-[#1B635C] transition-colors inline-flex items-center gap-1", active && "text-[#1B635C] font-medium")}>
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="size-3.5 opacity-60 stroke-[1.8]" />}
              </Link>;
        })}
        </nav>

        {/* Right: Dark Teal Sign Up Pill & Sign In Text */}
        <div className="flex items-center gap-5 sm:gap-6">
          {user ? <>
              <div className="type-body text-[14px] font-medium text-[#111111]">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile
              </div>
              <button onClick={async () => {
            await fetch("/api/auth/signout", {
              method: "POST",
              body: "{}"
            });
            window.location.reload();
          }} className="type-body text-[14px] font-normal text-[#111111] hover:text-[#1B635C] transition-colors">
                Sign Out
              </button>
            </> : <>
              <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-[#1B635C] hover:bg-[#154d48] text-white px-5 py-2 text-[13.5px] font-medium transition-all shadow-xs hover:shadow-sm active:scale-98 cursor-pointer">
                Sign Up
              </Link>

              <Link href="/login" className="type-body text-[14px] font-normal text-[#111111] hover:text-[#1B635C] transition-colors">
                Sign In
              </Link>
            </>}
        </div>
      </div>
    </header>;
}