"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Package,
  PackageX,
  Pill,
  Receipt,
  ShieldAlert,
} from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge } from "@/components/data/status-badge";
import { AreaTrend, DonutSplit } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  drugInventory,
  narcoticLog,
  pharmacyStats,
  prescriptionQueue,
  salesTrend,
} from "@/mock/pharmacy";
import { formatCurrency } from "@/lib/utils";

export function PharmacyDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Pharmacy Dashboard"
        subtitle="Verify · Dispense · Restock · Audit"
        icon={Pill}
        accent="pharmacy"
        badges={[{ label: "Live", variant: "success" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Cycle Count</Button>
            <Button variant="outline" size="sm">Reports</Button>
            <Button size="sm">New Rx</Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Prescriptions Today" value={pharmacyStats.prescriptionsToday} icon={Receipt} tone="info" delta={7} />
        <StatCard label="Dispensed" value={pharmacyStats.dispensed} icon={CheckCircle2} tone="success" delta={5} />
        <StatCard label="Pending Verification" value={pharmacyStats.pendingVerification} icon={Clock} tone="warning" />
        <StatCard label="Narcotics" value={pharmacyStats.narcoticsDispensed} icon={ShieldAlert} tone="destructive" />
        <StatCard label="Low Stock Alerts" value={pharmacyStats.lowStockAlerts} icon={AlertTriangle} tone="warning" />
        <StatCard
          label="Revenue Today"
          value={pharmacyStats.revenueToday}
          icon={Receipt}
          tone="primary"
          formatFn={(n) => formatCurrency(n)}
        />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales — 12 mo</CardTitle>
            <CardDescription>OTC vs Rx breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaTrend
              data={salesTrend}
              xKey="month"
              series={[
                { key: "rx", name: "Rx", color: "hsl(142 71% 45%)" },
                { key: "otc", name: "OTC", color: "hsl(24 95% 55%)" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Health</CardTitle>
            <CardDescription>By ABC class</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutSplit
              data={[
                { name: "A · Fast", value: 42 },
                { name: "B · Medium", value: 34 },
                { name: "C · Slow", value: 24 },
              ]}
              centerLabel="SKUs"
              centerValue={drugInventory.length}
              height={220}
              colors={["hsl(142 71% 45%)", "hsl(38 92% 55%)", "hsl(0 84% 60%)"]}
            />
            <div className="mt-2 space-y-2 text-2xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Reorder soon</span>
                <span className="font-medium text-warning">{pharmacyStats.lowStockAlerts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Expiring &lt; 90d</span>
                <span className="font-medium text-destructive">{pharmacyStats.expiringWithin90d}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Prescription Queue</CardTitle>
              <CardDescription>Awaiting verification · dispensing</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={rxColumns}
              data={prescriptionQueue}
              searchKey="patient"
              searchPlaceholder="Search Rx, patient, drug…"
              compact
              className="rounded-none border-0 shadow-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Narcotic Log</CardTitle>
              <CardDescription>Dual-signature · reconciled</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              All <ArrowUpRight className="h-3 w-3 rtl-flip" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {narcoticLog.map((n, i) => (
              <div key={i} className="rounded-md border border-border/60 bg-surface-raised/40 p-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{n.drug}</span>
                  <Badge variant="destructive" size="sm">
                    Ctrl
                  </Badge>
                </div>
                <div className="mt-1 flex items-center justify-between text-2xs text-muted-foreground">
                  <span>{n.patient}</span>
                  <span className="tabular-nums">Bal: {n.balance}</span>
                </div>
                <div className="text-2xs text-muted-foreground">by {n.prescriber}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Snapshot</CardTitle>
          <CardDescription>Sorted by reorder urgency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {drugInventory.slice(0, 9).map((d) => {
              const pct = Math.min(100, Math.round((d.onHand / (d.reorderPoint * 3)) * 100));
              const tone = d.onHand < d.reorderPoint ? "bg-destructive" : d.onHand < d.reorderPoint * 2 ? "bg-warning" : "bg-success";
              return (
                <div key={d.sku} className="rounded-md border border-border/60 bg-surface-raised/40 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{d.name}</div>
                      <div className="text-2xs text-muted-foreground">
                        {d.bin} · Class {d.category}
                      </div>
                    </div>
                    {d.expiring ? (
                      <Badge variant="warning" size="sm">
                        <PackageX className="me-1 h-2.5 w-2.5" /> {d.expiring}d
                      </Badge>
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-2xs">
                    <span className="text-muted-foreground">On hand</span>
                    <span className="tabular-nums font-medium text-foreground">{d.onHand}</span>
                  </div>
                  <Progress value={pct} indicatorClassName={tone} className="mt-1" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type RX = typeof prescriptionQueue[number];
const rxColumns: ColumnDef<RX>[] = [
  {
    accessorKey: "id",
    header: "Rx #",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <div>
        <div className="text-sm font-medium">{row.original.patient}</div>
        <div className="text-2xs text-muted-foreground">{row.original.prescriber}</div>
      </div>
    ),
  },
  {
    accessorKey: "drug",
    header: "Drug",
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.drug}
        <div className="text-2xs text-muted-foreground">
          {row.original.quantity} × {row.original.form}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "controlled",
    header: "Type",
    cell: ({ row }) =>
      row.original.controlled ? (
        <Badge variant="destructive" size="sm">
          Ctrl
        </Badge>
      ) : (
        <Badge variant="muted" size="sm">
          Std
        </Badge>
      ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge variant={row.original.priority === "STAT" ? "destructive" : "muted"} size="sm">
        {row.original.priority}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
  },
];
