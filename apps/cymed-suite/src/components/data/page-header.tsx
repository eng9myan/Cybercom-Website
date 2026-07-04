import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  accent?: string; // Tailwind color name inside `product.*`
  actions?: React.ReactNode;
  badges?: { label: string; variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "info" | "muted" }[];
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  accent = "primary",
  actions,
  badges,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {Icon ? (
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset",
              accent === "primary" && "bg-primary/15 text-primary ring-primary/30",
              accent === "hospital" && "bg-product-hospital/15 text-product-hospital ring-product-hospital/30",
              accent === "clinic" && "bg-product-clinic/15 text-product-clinic ring-product-clinic/30",
              accent === "pharmacy" && "bg-product-pharmacy/15 text-product-pharmacy ring-product-pharmacy/30",
              accent === "laboratory" && "bg-product-laboratory/15 text-product-laboratory ring-product-laboratory/30",
              accent === "imaging" && "bg-product-imaging/15 text-product-imaging ring-product-imaging/30",
              accent === "cyshop" && "bg-product-cyshop/15 text-product-cyshop ring-product-cyshop/30",
              accent === "erp" && "bg-product-erp/15 text-product-erp ring-product-erp/30"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {badges?.map((b) => (
              <Badge key={b.label} variant={b.variant ?? "muted"} size="sm">
                {b.label}
              </Badge>
            ))}
          </div>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
