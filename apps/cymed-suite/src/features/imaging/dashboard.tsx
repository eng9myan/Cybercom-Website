"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  Brain,
  CheckCircle2,
  Clock,
  Radiation,
  Scan,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge } from "@/components/data/status-badge";
import { BarComparison, LineTrend } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { imagingStats, modalityUtilization, readTATTrend, risWorklist } from "@/mock/imaging";

export function ImagingDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Imaging Dashboard"
        subtitle="RIS + PACS + AI-assist"
        icon={Scan}
        accent="imaging"
        badges={[
          { label: "Live", variant: "success" },
          { label: `${imagingStats.radiologistsOnDuty} on duty`, variant: "info" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">PACS</Button>
            <Button variant="outline" size="sm">STAT Queue</Button>
            <Button size="sm">New Study</Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Studies Today" value={imagingStats.studiesToday} icon={Scan} tone="info" delta={6} />
        <StatCard label="Reported" value={imagingStats.reported} icon={CheckCircle2} tone="success" delta={4} />
        <StatCard label="Pending Read" value={imagingStats.pendingRead} icon={Clock} tone="warning" />
        <StatCard label="In Progress" value={imagingStats.inProgress} icon={Activity} tone="accent" />
        <StatCard label="STAT Queue" value={imagingStats.statQueue} icon={Radiation} tone="destructive" />
        <StatCard label="Avg TAT" value={imagingStats.avgTATMinutes} suffix="m" icon={Clock} tone="default" delta={-6} />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Modality Utilization</CardTitle>
            <CardDescription>Scheduled vs performed</CardDescription>
          </CardHeader>
          <CardContent>
            <BarComparison
              data={modalityUtilization}
              xKey="modality"
              series={[
                { key: "scheduled", name: "Scheduled", color: "hsl(217 91% 60%)" },
                { key: "performed", name: "Performed", color: "hsl(142 71% 45%)" },
              ]}
              height={240}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Read TAT · 7d</CardTitle>
            <CardDescription>Per modality</CardDescription>
          </CardHeader>
          <CardContent>
            <LineTrend
              data={readTATTrend}
              xKey="day"
              series={[
                { key: "ct", name: "CT", color: "hsl(217 91% 60%)" },
                { key: "mri", name: "MRI", color: "hsl(280 65% 60%)" },
                { key: "xr", name: "X-Ray", color: "hsl(142 71% 45%)" },
                { key: "us", name: "US", color: "hsl(24 95% 55%)" },
              ]}
              height={220}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>RIS Worklist</CardTitle>
            <CardDescription>AI-flagged studies highlighted</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={risColumns}
            data={risWorklist}
            searchKey="patient"
            searchPlaceholder="Search accession, patient, modality…"
            compact
            className="rounded-none border-0 shadow-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}

type R = typeof risWorklist[number];
const risColumns: ColumnDef<R>[] = [
  {
    accessorKey: "id",
    header: "Accession",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
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
    accessorKey: "modality",
    header: "Study",
    cell: ({ row }) => (
      <div>
        <div className="text-sm font-medium">
          {row.original.modality} · {row.original.body}
        </div>
        <div className="text-2xs text-muted-foreground">{row.original.modalityName}</div>
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
    accessorKey: "aiFlag",
    header: "AI",
    cell: ({ row }) =>
      row.original.aiFlag ? (
        <Badge
          variant={
            row.original.aiFlag.severity === "high"
              ? "destructive"
              : row.original.aiFlag.severity === "moderate"
                ? "warning"
                : "info"
          }
          size="sm"
        >
          <Brain className="me-1 h-2.5 w-2.5" />
          {row.original.aiFlag.finding}
        </Badge>
      ) : (
        <span className="text-2xs text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
  },
  {
    accessorKey: "radiologist",
    header: "Rad",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">{row.original.radiologist}</span>
    ),
  },
];
