import * as React from "react";
import { cn } from "@/lib/utils";

export const Dropdown = ({ trigger, children, className, align = "left" }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 min-w-[12rem] rounded-lg border border-border bg-background p-1 shadow-lg",
            align === "right" ? "right-0" : "left-0"
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ className, children, ...props }) => (
  <button
    className={cn(
      "flex w-full items-center rounded-md px-2.5 py-1.5 text-sm text-foreground hover:bg-surface-elevated transition-colors text-left",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Dropdown;
