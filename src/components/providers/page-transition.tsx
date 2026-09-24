"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight, elegant editorial page transition wrapper.
 * Fades and smoothly glides incoming content on route change (480ms duration).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="w-full animate-page-glide">
      {children}
    </div>
  );
}
