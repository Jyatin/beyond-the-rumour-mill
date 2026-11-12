import * as React from "react";
import { cn } from "@/lib/utils";

// Simple Badge component with variant support (default, primary, secondary, success, warning, danger)
export const badgeVariants = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
};

export function Badge({ variant = "default", className, children, ...props }) {
  const variantClass = badgeVariants[variant] ?? badgeVariants.default;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;

