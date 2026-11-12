import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-border bg-background p-3 text-sm transition-colors placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          variant === "outline" && "border-muted bg-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
