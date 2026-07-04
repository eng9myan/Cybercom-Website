"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  AlertOctagon,
  Beaker,
  CheckCircle2,
  Clock,
  FlaskConical,
  Gauge,
  Microscope,
  Receipt,
} from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge } from "@/components/data/status-badge";
import { BarComparison, LineTrend } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { criticalResultsLog, labStats, labWorklist, qcSeries, tatBreakdown } from "@/mock/laboratory";
import { formatCurrency, formatPercent, timeAgo } from "@/lib/utils";

export function LaboratoryDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Laboratory Dashboard"
        subtitle="Order → Sample → Result · Auto-verified where safe"
        icon={FlaskConical}
        accent="laboratory"
        badges={[
          { label: "Live", variant: "success" },
          { label: `QC ${formatPercent(labStats.qcPassRate)}`, variant: "info" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Scan Sample</Button>
            <Button variant="outline" size="sm">Analyzer Feed</Button>
            <Button size="sm">New Order</Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Orders Today" value={labStats.ordersToday} icon={Beaker} tone="info" delta={5} />
        <StatCard label="Pending" value={labStats.pending} icon={Clock} tone="warning" />
        <StatCard label="In Process" value={labStats.inProcess} icon={Activity} tone="accent" />
        <StatCard label="Verified" value={labStats.verified} icon={CheckCircle2} tone="success" />
        <StatCard label="TAT Avg" value={labStats.tatAvgMinutes} suffix="m" icon={Gauge} tone="default" delta={-8} />
        <StatCard label="Critical Results" value={labStats.criticalResults} icon={AlertOctagon} tone="destructive" />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>TAT vs Target</CardTitle>
            <CardDescription>Average TAT per test (mins)</CardDescription>
          </CardHeader>
          <CardContent>
            <BarComparison
              data={tatBreakdown}
              xKey="test"
              series={[
                { key: "avg", name: "Avg", color: "hsl(280 65% 60%)" },
                { key: "target", name: "Target", color: "hsl(38 92% 55%)" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QC · Levey-Jennings</CardTitle>
            <CardDescription>Glucose control · L2</CardDescription>
          </CardHeader>
          <CardContent>
            <LineTrend
              data={qcSeries}
              xKey="run"
              series={[
                { key: "value", name: "Value", color: "hsl(217 91% 60%)" },
                { key: "upper", name: "+2SD", color: "hsl(0 84% 60%)" },
                { key: "lower", name: "-2SD", color: "hsl(0 84% 60%)" },
                { key: "mean", name: "Mean", color: "hsl(142 71% 45%)" },
              ]}
              height={220}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Worklist</CardTitle>
              <CardDescription>Ordered → Verified</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={labColumns}
              data={labWorklist}
              searchKey="patient"
              searchPlaceholder="Search accession, patient, test…"
              compact
              className="rounded-none border-0 shadow-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4 text-destructive" />
                Critical Results
              </CardTitle>
              <CardDescription>Called + acknowledged</CardDescription>
            </div>
            <Badge variant="destructive" size="sm">
              LIVE
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {criticalResultsLog.map((c) => (
              <div key={c.accession} className="rounded-md border border-destructive/40 bg-destructive/5 p-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{c.test}</span>
                  <span className="font-mono font-medium text-destructive">{c.value}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-2xs text-muted-foreground">
                  <span>{c.patient}</span>
                  <span>Ref {c.ref}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-2xs">
                  <span className="text-muted-foreground">Called {timeAgo(c.calledAt)}</span>
                  {c.acknowledgedAt ? (
                    <Badge variant="success" size="sm">
                      Ack
                    </Badge>
                  ) : (
                    <Badge variant="destructive" size="sm">
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Revenue Today</CardTitle>
              <CardDescription>Charge master applied</CardDescription>
            </div>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums text-foreground">
              {formatCurrency(labStats.revenueToday)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              412 orders · +8% vs 7-day avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Panel Load</CardTitle>
              <CardDescription>By ordering pattern</CardDescription>
            </div>
            <Microscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <BarComparison
              data={tatBreakdown}
              xKey="test"
              series={[{ key: "avg", name: "Load", color: "hsl(217 91% 60%)" }]}
              height={200}
              layout="vertical"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type L = typeof labWorklist[number];
const labColumns: ColumnDef<L>[] = [
  {
    accessorKey: "accession",
    header: "Accession",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.accession}</span>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <div>
        <div className="text-sm font-medium">{row.original.patient}</div>
        <div className="text-2xs text-muted-foreground">{row.original.mrn}</div>
      </div>
    ),
  },
  {
    accessorKey: "testName",
    header: "Test",
    cell: ({ row }) => (
      <div>
        <div className="text-sm">{row.original.testName}</div>
        <div className="text-2xs text-muted-foreground">{row.original.panel}</div>
      </div>
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
  {
    accessorKey: "tatMinutes",
    header: "TAT",
    cell: ({ row }) => (
      <span className="tabular-nums text-xs text-muted-foreground">{row.original.tatMinutes}m</span>
    ),
  },
  {
    accessorKey: "abnormalFlag",
    header: "Flag",
    cell: ({ row }) =>
      row.original.abnormalFlag ? (
        <Badge variant={row.original.abnormalFlag === "H" ? "destructive" : "warning"} size="sm">
          {row.original.abnormalFlag}
        </Badge>
      ) : (
        <span className="text-2xs text-muted-foreground">—</span>
      ),
  },
];
