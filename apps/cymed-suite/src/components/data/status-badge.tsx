import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<string, "default" | "success" | "warning" | "destructive" | "info" | "muted" | "secondary"> = {
  // Generic
  Active: "success",
  Inactive: "muted",
  Open: "info",
  Pending: "warning",
  "In Progress": "info",
  Completed: "success",
  Cancelled: "muted",
  Rejected: "destructive",
  Approved: "success",
  Overdue: "destructive",
  Partial: "warning",
  Sent: "info",
  // Clinic
  Waiting: "warning",
  "In Consultation": "info",
  "Vitals Taken": "info",
  "Ready for MD": "success",
  "Checked In": "info",
  // Hospital
  Admitted: "success",
  Discharged: "muted",
  Transfer: "info",
  "Pre-Admit": "warning",
  // Pharmacy
  "Awaiting Verification": "warning",
  Verified: "info",
  Filled: "info",
  Dispensed: "success",
  Query: "warning",
  // Lab
  Ordered: "info",
  Collected: "info",
  "Received in Lab": "info",
  "In Process": "info",
  Reported: "success",
  // Imaging
  Scheduled: "info",
  Arrived: "info",
  "Awaiting Read": "warning",
  // CyShop
  New: "info",
  "In Kitchen": "warning",
  Ready: "success",
  Served: "info",
  Paid: "success",
  // ERP
  Won: "success",
  Lost: "destructive",
  Negotiation: "warning",
  Proposal: "info",
  Qualified: "info",
  Discovery: "muted",
};

export interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({ status, className, size = "md" }: StatusBadgeProps) {
  const variant = STATUS_MAP[status] ?? "muted";
  return (
    <Badge variant={variant} size={size} className={cn("font-medium", className)}>
      <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "destructive" && "bg-destructive",
            variant === "info" && "bg-info",
            variant === "default" && "bg-primary",
            (variant === "muted" || variant === "secondary") && "bg-muted-foreground"
          )}
        />
      </span>
      {status}
    </Badge>
  );
}

/* Triage-specific badge with color coding per spec */

export function TriageBadge({ level, className }: { level: string; className?: string }) {
  const l = level.toLowerCase();
  const config: Record<string, { bg: string; label: string }> = {
    urgent: { bg: "bg-triage-urgent text-white ring-1 ring-inset ring-triage-urgent/50", label: "Urgent" },
    "semi-urgent": {
      bg: "bg-triage-semi-urgent text-canvas ring-1 ring-inset ring-triage-semi-urgent/50",
      label: "Semi-Urgent",
    },
    routine: { bg: "bg-triage-routine text-white ring-1 ring-inset ring-triage-routine/50", label: "Routine" },
  };
  const c = config[l] ?? { bg: "bg-muted text-muted-foreground", label: level };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold",
        c.bg,
        className
      )}
    >
      {c.label}
    </span>
  );
}

/* ESI 1..5 coded badge for ED */

export function EsiBadge({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  const config = {
    1: { bg: "bg-triage-esi1", text: "text-white", label: "ESI 1 — Resus" },
    2: { bg: "bg-triage-esi2", text: "text-white", label: "ESI 2 — Emergent" },
    3: { bg: "bg-triage-esi3", text: "text-canvas", label: "ESI 3 — Urgent" },
    4: { bg: "bg-triage-esi4", text: "text-white", label: "ESI 4 — Less Urgent" },
    5: { bg: "bg-triage-esi5", text: "text-white", label: "ESI 5 — Non-urgent" },
  }[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-2xs font-bold uppercase tracking-wide ring-1 ring-inset ring-black/20",
        config.bg,
        config.text
      )}
    >
      {config.label}
    </span>
  );
}
