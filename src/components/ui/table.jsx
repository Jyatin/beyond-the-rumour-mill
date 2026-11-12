import * as React from "react";
import { cn } from "@/lib/utils";

export const Table = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="w-full overflow-x-auto">
    <table ref={ref} className={cn("min-w-full border-collapse text-sm", className)} {...props}>
      {children}
    </table>
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("border-b border-border", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b border-border/50 transition-colors hover:bg-surface-elevated/50", className)} {...props} />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("h-10 px-3 text-left align-middle font-medium text-muted text-xs uppercase tracking-wider", className)} {...props} />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-3 py-3 align-middle", className)} {...props} />
));
TableCell.displayName = "TableCell";

export default Table;
