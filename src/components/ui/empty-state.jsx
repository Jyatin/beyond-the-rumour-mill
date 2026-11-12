import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const EmptyState = ({
  title = "No data",
  description = "There is nothing to display at the moment.",
  icon,
  actionLabel,
  onAction,
  children,
}) => (
  <div className={cn("flex flex-col items-center justify-center py-16 space-y-4 text-center")}>
    {icon && <div className="text-muted">{icon}</div>}
    {children}
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-sm text-muted max-w-md">{description}</p>
    {actionLabel && onAction && (
      <Button variant="outline" size="sm" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
