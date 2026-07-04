import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/15 text-primary ring-primary/30",
        secondary: "bg-secondary text-secondary-foreground ring-transparent",
        outline: "bg-transparent text-foreground ring-border",
        success: "bg-success/15 text-success ring-success/30",
        warning: "bg-warning/15 text-warning ring-warning/30",
        destructive: "bg-destructive/15 text-destructive ring-destructive/30",
        info: "bg-info/15 text-info ring-info/30",
        muted: "bg-muted text-muted-foreground ring-transparent",
      },
      size: {
        sm: "px-1.5 py-0 text-2xs",
        md: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
