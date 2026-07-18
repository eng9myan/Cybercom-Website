"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpRight,
  Calendar,
  CalendarClock,
  CheckCircle2,
  Clock,
  Plus,
  Stethoscope,
  TrendingDown,
  Users,
  UserX,
  Video,
} from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge, TriageBadge } from "@/components/data/status-badge";
import { AreaTrend, DonutSplit, LineTrend } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  appointmentsToday,
  clinicKpiTrend,
  clinicStats,
  receptionQueue,
  specialtyMix,
} from "@/mock/clinic";
import { formatCurrency, timeAgo } from "@/lib/utils";

export function ClinicDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Clinic Dashboard"
        subtitle="Reception → Consultation → Referral · Live"
        icon={Stethoscope}
        accent="clinic"
        badges={[
          { label: "Live", variant: "success" },
          { label: `${Math.round(clinicStats.telehealthShare * 100)}% Tele`, variant: "info" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Schedule
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Video className="h-3.5 w-3.5" /> Waiting Room
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Check-in
            </Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Avg Wait" value={clinicStats.avgWait} suffix="m" icon={Clock} tone="warning" />
        <StatCard label="Total Appointments" value={clinicStats.totalAppointments} icon={Calendar} tone="info" delta={12} />
        <StatCard
          label="Completed Today"
          value={clinicStats.completedToday}
          icon={CheckCircle2}
          tone="success"
          delta={8}
        />
        <StatCard label="In Consultation" value={clinicStats.inConsultation} icon={Stethoscope} tone="accent" />
        <StatCard label="Waiting" value={clinicStats.waiting} icon={Users} tone="default" />
        <StatCard label="No Shows" value={clinicStats.noShows} icon={UserX} tone="destructive" delta={-3} />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Visits & Revenue — 12 mo</CardTitle>
              <CardDescription>Trend with no-show overlay</CardDescription>
            </div>
            <Badge variant="info">MTD +12%</Badge>
          </CardHeader>
          <CardContent>
            <AreaTrend
              data={clinicKpiTrend}
              xKey="month"
              series={[
                { key: "visits", name: "Visits", color: "hsl(262 83% 65%)" },
                { key: "noShow", name: "No-show %", color: "hsl(0 84% 60%)" },
              ]}
              height={280}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specialty Mix</CardTitle>
            <CardDescription>Visits by service line</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutSplit
              data={specialtyMix.map((s) => ({ name: s.specialty, value: s.visits }))}
              height={280}
              centerLabel="Specialties"
              centerValue={specialtyMix.length}
              colors={[
                "hsl(262 83% 65%)",
                "hsl(199 89% 55%)",
                "hsl(24 95% 55%)",
                "hsl(142 71% 45%)",
                "hsl(38 92% 55%)",
                "hsl(340 82% 60%)",
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Reception Queue</CardTitle>
              <CardDescription>Triage color coded · sortable</CardDescription>
            </div>
            <div className="flex items-center gap-1.5 text-2xs">
              <TriageBadge level="urgent" />
              <TriageBadge level="semi-urgent" />
              <TriageBadge level="routine" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={queueColumns}
              data={receptionQueue}
              searchKey="patient"
              searchPlaceholder="Search MRN, patient, phone…"
              compact
              pageSize={8}
              className="rounded-none border-0 shadow-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Today’s Appointments</CardTitle>
              <CardDescription>Next up · click to open</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              Schedule <ArrowUpRight className="h-3 w-3 rtl-flip" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {appointmentsToday.slice(0, 8).map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-md border border-border/60 bg-surface-raised/40 p-2.5"
              >
                <div className="w-14 shrink-0 text-sm font-medium tabular-nums text-foreground">
                  {a.time}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{a.patient}</div>
                  <div className="truncate text-2xs text-muted-foreground">
                    {a.physician} · {a.specialty}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={a.status} size="sm" />
                  {a.channel === "Telehealth" ? (
                    <Badge variant="info" size="sm">
                      <Video className="me-1 h-2.5 w-2.5" /> Tele
                    </Badge>
                  ) : null}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>Today’s KPIs</CardTitle>
            <CardDescription>Revenue, no-show, satisfaction trend</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <LineTrend
            data={clinicKpiTrend}
            xKey="month"
            series={[
              { key: "revenue", name: "Revenue", color: "hsl(217 91% 60%)" },
              { key: "visits", name: "Visits", color: "hsl(142 71% 45%)" },
            ]}
            height={220}
          />
        </CardContent>
      </Card>
    </div>
  );
}

type Q = typeof receptionQueue[number];
const queueColumns: ColumnDef<Q>[] = [
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
          {row.original.age}·{row.original.gender} · {row.original.payer}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "waitMinutes",
    header: "Wait",
    cell: ({ row }) => (
      <span className={row.original.waitMinutes > 30 ? "font-medium text-destructive" : "text-warning"}>
        {row.original.waitMinutes}m
      </span>
    ),
  },
  {
    accessorKey: "triage",
    header: "Triage",
    cell: ({ row }) => <TriageBadge level={row.original.triage} />,
  },
  { accessorKey: "specialty", header: "Specialty" },
  {
    accessorKey: "physician",
    header: "Physician",
    cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.physician}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex items-center justify-end gap-1">
        <Button size="sm" variant="outline" className="h-7 text-xs">
          Call in
        </Button>
        <Button size="sm" variant="ghost" className="h-7 text-xs">
          View
        </Button>
      </div>
    ),
  },
];
