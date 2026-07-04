"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  Ambulance,
  ArrowUpRight,
  Bed,
  Building2,
  CircleDollarSign,
  Clock,
  HeartPulse,
  Plus,
  Scissors,
  ShieldAlert,
  Stethoscope,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge, EsiBadge, TriageBadge } from "@/components/data/status-badge";
import { AreaTrend, BarComparison, DonutSplit } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  admissions,
  bedOccupancyTrend,
  departmentPerformance,
  erQueue,
  hospitalStats,
  revenueByDept,
  wards,
} from "@/mock/hospital";
import { formatCurrency, formatPercent, timeAgo } from "@/lib/utils";

export function HospitalDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hospital Dashboard"
        subtitle="Complete inpatient control plane · Live"
        icon={Building2}
        accent="hospital"
        badges={[
          { label: "Live", variant: "success" },
          { label: "Tier-1", variant: "muted" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Bed Board</Button>
            <Button variant="outline" size="sm">ADT Log</Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> New Admission
            </Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Total Beds" value={hospitalStats.totalBeds} icon={Bed} tone="info" hint="All licensed" />
        <StatCard
          label="Occupied"
          value={hospitalStats.occupied}
          icon={HeartPulse}
          tone="warning"
          delta={4}
          deltaLabel="vs yesterday"
        />
        <StatCard
          label="Available"
          value={hospitalStats.available}
          icon={Bed}
          tone="success"
          delta={-2}
        />
        <StatCard
          label="ICU Occupied"
          value={hospitalStats.icuOccupied}
          suffix={`/${hospitalStats.icuTotal}`}
          icon={Activity}
          tone="destructive"
        />
        <StatCard label="OR Active" value={hospitalStats.orActive} suffix={`/${hospitalStats.orTotal}`} icon={Scissors} tone="accent" />
        <StatCard label="ER Waiting" value={hospitalStats.erWaiting} icon={Ambulance} tone="warning" />
        <StatCard label="Avg LOS" value={hospitalStats.avgLOS} decimals={1} suffix="d" icon={Clock} tone="default" />
        <StatCard
          label="Revenue Today"
          value={hospitalStats.revenueToday}
          icon={CircleDollarSign}
          tone="primary"
          formatFn={(n) => formatCurrency(n)}
          delta={9}
        />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Bed Occupancy — 14d</CardTitle>
              <CardDescription>Occupied vs target capacity</CardDescription>
            </div>
            <Badge variant="info">Rolling</Badge>
          </CardHeader>
          <CardContent>
            <AreaTrend
              data={bedOccupancyTrend}
              xKey="day"
              series={[
                { key: "occupied", name: "Occupied", color: "hsl(217 91% 60%)" },
                { key: "target", name: "Target", color: "hsl(38 92% 55%)" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payer Mix</CardTitle>
            <CardDescription>Active claims by payer</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutSplit
              data={[
                { name: "Bupa", value: 34 },
                { name: "Tawuniya", value: 22 },
                { name: "Daman", value: 18 },
                { name: "Aetna", value: 14 },
                { name: "Self-pay", value: 12 },
              ]}
              centerLabel="Payers"
              centerValue={5}
              height={260}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Revenue by Department</CardTitle>
              <CardDescription>MTD; claims count</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              Details <ArrowUpRight className="h-3 w-3 rtl-flip" />
            </Button>
          </CardHeader>
          <CardContent>
            <BarComparison
              data={revenueByDept}
              xKey="department"
              series={[{ key: "revenue", name: "Revenue", color: "hsl(217 91% 60%)" }]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ward Capacity</CardTitle>
            <CardDescription>Real-time occupancy</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {wards.map((w) => {
              const pct = Math.round((w.occupied / w.capacity) * 100);
              const tone =
                pct >= 90
                  ? "bg-destructive"
                  : pct >= 75
                    ? "bg-warning"
                    : "bg-success";
              return (
                <div key={w.code} className="flex items-center gap-3">
                  <div className="w-12 shrink-0 text-2xs font-medium uppercase text-muted-foreground">
                    {w.code}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-foreground">{w.name}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {w.occupied} / {w.capacity}
                      </span>
                    </div>
                    <Progress value={pct} indicatorClassName={tone} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* ER Triage Queue */}
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>ER Triage Queue</CardTitle>
              <CardDescription>ESI 1–5 color coded; live wait times</CardDescription>
            </div>
            <Badge variant="destructive" size="sm">
              <span className="me-1 h-1.5 w-1.5 rounded-full bg-current" /> LIVE
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {erQueue.slice(0, 8).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-md border border-border/60 bg-surface-raised/40 p-2.5"
              >
                <EsiBadge level={p.esi as 1 | 2 | 3 | 4 | 5} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{p.patient}</div>
                  <div className="truncate text-2xs text-muted-foreground">
                    {p.complaint} · HR {p.vitals.hr} · BP {p.vitals.bp} · SpO₂ {p.vitals.spo2}%
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-xs font-medium tabular-nums text-warning">
                    {p.waitMinutes}m
                  </div>
                  <div className="text-2xs text-muted-foreground">{p.lane}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Admissions */}
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Recent Admissions</CardTitle>
              <CardDescription>Today’s admits & discharges</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              All <ArrowUpRight className="h-3 w-3 rtl-flip" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={admissionColumns}
              data={admissions.slice(0, 6)}
              pageSize={6}
              compact
              searchKey="patient"
              searchPlaceholder="Search MRN, patient…"
              className="rounded-none border-0 shadow-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Department productivity */}
      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>Department Productivity</CardTitle>
            <CardDescription>Productivity · Utilization · Satisfaction</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {departmentPerformance.slice(0, 9).map((d) => (
              <div
                key={d.department}
                className="rounded-md border border-border/60 bg-surface-raised/40 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{d.department}</div>
                  <Badge variant={d.productivity > 80 ? "success" : d.productivity > 65 ? "warning" : "destructive"} size="sm">
                    {d.productivity}%
                  </Badge>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-2xs text-muted-foreground">
                    <span>Utilization</span>
                    <span className="tabular-nums text-foreground">{d.utilization}%</span>
                  </div>
                  <Progress value={d.utilization} />
                  <div className="flex items-center justify-between text-2xs text-muted-foreground">
                    <span>Satisfaction</span>
                    <span className="tabular-nums text-foreground">{d.satisfaction}%</span>
                  </div>
                  <Progress value={d.satisfaction} indicatorClassName="bg-success" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* -------- columns -------- */

type Admission = typeof admissions[number];
const admissionColumns: ColumnDef<Admission>[] = [
  {
    accessorKey: "mrn",
    header: "MRN",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.mrn}</span>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <div>
        <div className="text-sm font-medium">{row.original.patient}</div>
        <div className="text-2xs text-muted-foreground">
          {row.original.age}·{row.original.gender}
        </div>
      </div>
    ),
  },
  { accessorKey: "ward", header: "Ward" },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
  },
  {
    accessorKey: "admittedAt",
    header: "Admitted",
    cell: ({ row }) => (
      <span className="text-2xs text-muted-foreground">
        {timeAgo(row.original.admittedAt)}
      </span>
    ),
  },
];
