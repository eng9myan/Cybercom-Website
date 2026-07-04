"use client";
import * as React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  formatFn?: (n: number) => string;
  icon?: LucideIcon;
  hint?: string;
  delta?: number; // e.g. +12 -> +12%
  deltaLabel?: string;
  tone?: "default" | "primary" | "success" | "warning" | "destructive" | "info" | "accent";
  className?: string;
  decimals?: number;
}

const TONES: Record<Required<StatCardProps>["tone"], { ring: string; icon: string; halo: string }> = {
  default: {
    ring: "ring-border",
    icon: "bg-surface-raised text-foreground",
    halo: "bg-transparent",
  },
  primary: {
    ring: "ring-primary/30",
    icon: "bg-primary/15 text-primary",
    halo: "bg-primary/5",
  },
  success: {
    ring: "ring-success/30",
    icon: "bg-success/15 text-success",
    halo: "bg-success/5",
  },
  warning: {
    ring: "ring-warning/30",
    icon: "bg-warning/15 text-warning",
    halo: "bg-warning/5",
  },
  destructive: {
    ring: "ring-destructive/30",
    icon: "bg-destructive/15 text-destructive",
    halo: "bg-destructive/5",
  },
  info: {
    ring: "ring-info/30",
    icon: "bg-info/15 text-info",
    halo: "bg-info/5",
  },
  accent: {
    ring: "ring-accent/30",
    icon: "bg-accent/15 text-accent",
    halo: "bg-accent/5",
  },
};

export function StatCard({
  label,
  value,
  suffix,
  prefix,
  formatFn,
  icon: Icon,
  hint,
  delta,
  deltaLabel,
  tone = "default",
  className,
  decimals = 0,
}: StatCardProps) {
  const t = TONES[tone];
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    formatFn ? formatFn(v) : formatNumber(Number(v.toFixed(decimals)))
  );

  React.useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [value, mv]);

  const deltaUp = (delta ?? 0) >= 0;

  return (
    <div
      className={cn(
        "surface-card relative overflow-hidden p-4 ring-1",
        t.ring,
        className
      )}
    >
      <div className={cn("absolute inset-0 pointer-events-none", t.halo)} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <div className="mt-1.5 flex items-baseline gap-1">
            {prefix ? (
              <span className="text-lg font-semibold text-muted-foreground">{prefix}</span>
            ) : null}
            <motion.span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
              {rounded}
            </motion.span>
            {suffix ? (
              <span className="text-sm font-medium text-muted-foreground">{suffix}</span>
            ) : null}
          </div>
          {delta !== undefined || hint ? (
            <div className="mt-2 flex items-center gap-2 text-2xs">
              {delta !== undefined ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-medium",
                    deltaUp ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                  )}
                >
                  {deltaUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(delta)}%
                </span>
              ) : null}
              {hint || deltaLabel ? (
                <span className="text-muted-foreground">{deltaLabel ?? hint}</span>
              ) : null}
            </div>
          ) : null}
        </div>
        {Icon ? (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
              t.icon
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      {children}
    </div>
  );
}
