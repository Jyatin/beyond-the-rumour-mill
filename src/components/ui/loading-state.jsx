import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function LoadingState({
  title = "Loading\u2026",
  description,
  className,
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-brand mb-4" />
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted">{description}</p>
      )}
    </div>
  );
}
