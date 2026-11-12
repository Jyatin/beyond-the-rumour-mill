import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          variant === "outline" && "border-muted bg-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
