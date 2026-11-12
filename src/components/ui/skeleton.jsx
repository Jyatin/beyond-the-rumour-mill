import * as React from "react";
import { cn } from "@/lib/utils";

export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn("animate-pulse rounded-md bg-muted/20", className)}
    {...props}
  />
);

export default Skeleton;
