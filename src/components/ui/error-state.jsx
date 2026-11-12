import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const ErrorState = ({ message, retry, className }) => (
  <div className={cn("flex flex-col items-center justify-center py-16 space-y-4 text-center", className)}>
    <AlertCircle className="w-10 h-10 text-error" />
    <p className="text-sm font-medium text-error">{message}</p>
    {retry && (
      <Button variant="outline" size="sm" onClick={retry}>
        Try again
      </Button>
    )}
  </div>
);

export default ErrorState;
