import * as React from "react";
import { cn } from "@/lib/utils";

// Simple Card component that provides a consistent container style.
// It merges any custom className with the base design system classes.
export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "group p-6 rounded-xl border border-border bg-card hover:border-brand/40 hover:shadow-xs transition-all flex flex-col justify-between space-y-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

