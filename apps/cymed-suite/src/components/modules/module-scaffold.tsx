"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, ClipboardList, Plus, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge } from "@/components/data/status-badge";
import { AreaTrend } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ModuleDef, ProductDef } from "@/config/products";
import { seededRandom } from "@/lib/utils";

/**
 * Generic module scaffold used for any module that doesn't have a bespoke page.
 * Produces stat cards + area trend + data table with realistic mock rows,
 * seeded from the module slug so each module looks distinct + stable.
 */
export function ModuleScaffold({
  product,
  module,
}: {
  product: ProductDef;
  module: ModuleDef;
}) {
  const seed = hash(`${product.slug}:${module.slug}`);
  const r = seededRandom(seed);

  const stats = React.useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        label: STAT_LABELS[i],
        value: Math.round(50 + r() * 5000),
        delta: Math.round(-15 + r() * 30),
      })),
    [seed]
  );

  const trend = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
        primary: Math.round(200 + r() * 800),
        secondary: Math.round(150 + r() * 600),
      })),
    [seed]
  );

  const rows = React.useMemo(() => generateRows(module, seed), [seed, module.slug]);

  const columns: ColumnDef<Row>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Ref",
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
      },
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "owner",
        header: "Owner",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">{row.original.owner}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Value",
        cell: ({ row }) => (
          <span className="tabular-nums text-sm">
            {new Intl.NumberFormat().format(row.original.amount)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
      },
      {
        accessorKey: "updated",
        header: "Updated",
        cell: ({ row }) => (
          <span className="text-2xs text-muted-foreground">{row.original.updated}</span>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={module.title}
        subtitle={product.title}
        icon={module.icon}
        accent={product.accent}
        badges={module.badge ? [{ label: String(module.badge), variant: "info" }] : undefined}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ClipboardList className="h-3.5 w-3.5" /> Reports
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> New
            </Button>
          </>
        }
      />

      <StatGrid>
        {stats.map((s, i) => (
          <StatCard
            key={i}
            label={s.label}
            value={s.value}
            tone={([
              "info",
              "success",
              "warning",
              "primary",
            ] as const)[i % 4]}
            delta={s.delta}
          />
        ))}
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>{module.title} · Trend</CardTitle>
              <CardDescription>Rolling 12 months</CardDescription>
            </div>
            <Badge variant="muted" size="sm">
              MTD
            </Badge>
          </CardHeader>
          <CardContent>
            <AreaTrend
              data={trend}
              xKey="month"
              series={[
                { key: "primary", name: "Primary", color: "hsl(217 91% 60%)" },
                { key: "secondary", name: "Secondary", color: "hsl(24 95% 55%)" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks in this module</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {["Create record", "Import from CSV", "Export report", "Configure rules", "View audit trail"].map((a) => (
              <button
                key={a}
                className="flex items-center justify-between rounded-md border border-border/60 bg-surface-raised/40 px-3 py-2 text-sm transition-colors hover:bg-surface-raised hover:text-foreground"
              >
                {a}
                <ArrowUpRight className="h-3 w-3 text-muted-foreground rtl-flip" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>{module.title} · Records</CardTitle>
            <CardDescription>Live · sortable · exportable</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={rows}
            searchKey="name"
            searchPlaceholder="Search records…"
            compact
            className="rounded-none border-0 shadow-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}

const STAT_LABELS = ["Total", "Active", "Pending", "This Month"];

interface Row {
  id: string;
  name: string;
  owner: string;
  amount: number;
  status: string;
  updated: string;
}

const OWNERS = [
  "Dr. Ahmed",
  "Layla R.",
  "Michael C.",
  "Sarah J.",
  "Priya P.",
  "Omar H.",
  "Nour E.",
  "James W.",
];

const STATUSES = [
  "Active",
  "Pending",
  "Completed",
  "In Progress",
  "Approved",
  "Overdue",
  "Open",
];

const UPDATES = ["2m ago", "18m ago", "1h ago", "3h ago", "yesterday", "2d ago", "1w ago"];

function generateRows(module: ModuleDef, seed: number): Row[] {
  const r = seededRandom(seed + 1);
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${module.slug.toUpperCase().slice(0, 4)}-${String(1000 + i).padStart(5, "0")}`,
    name: nameFor(module.slug, i),
    owner: OWNERS[i % OWNERS.length],
    amount: Math.round(100 + r() * 20_000),
    status: STATUSES[i % STATUSES.length],
    updated: UPDATES[i % UPDATES.length],
  }));
}

function nameFor(slug: string, i: number): string {
  const templates: Record<string, string[]> = {
    default: [
      "Record",
      "Entry",
      "Item",
      "Batch",
      "Order",
      "Ticket",
      "Request",
      "Case",
    ],
  };
  const options = templates[slug] ?? templates.default;
  const prefix = options[i % options.length];
  return `${prefix} ${String.fromCharCode(65 + (i % 26))}-${100 + i}`;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) & 0x7fffffff;
  }
  return h || 1;
}
