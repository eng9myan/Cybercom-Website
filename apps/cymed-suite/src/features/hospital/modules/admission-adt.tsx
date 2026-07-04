"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Bed, Filter, Plus, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge } from "@/components/data/status-badge";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { admissions, wards } from "@/mock/hospital";
import { cn, timeAgo } from "@/lib/utils";

export function AdmissionAdtModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Admission & ADT"
        subtitle="Register · Admit · Discharge · Transfer"
        icon={Bed}
        accent="hospital"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
            <Button variant="outline" size="sm">Bed Board</Button>
            <Button size="sm" className="gap-1.5">
              <UserPlus className="h-3.5 w-3.5" /> New Admission
            </Button>
          </>
        }
      />

      {/* Bed grid */}
      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>Ward · Room · Bed</CardTitle>
            <CardDescription>Green available · Amber reserved · Red occupied</CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-2xs">
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded bg-success" /> Available</span>
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded bg-warning" /> Reserved</span>
            <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded bg-destructive" /> Occupied</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {wards.map((w) => (
              <div key={w.code} className="rounded-md border border-border/60 bg-surface-raised/40 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{w.name}</div>
                    <div className="text-2xs text-muted-foreground">{w.code} · {w.occupied}/{w.capacity}</div>
                  </div>
                  <Badge variant="muted" size="sm">Ward</Badge>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {Array.from({ length: w.capacity }).map((_, i) => {
                    const state = i < w.occupied ? "occupied" : i < w.occupied + 2 ? "reserved" : "available";
                    return (
                      <div
                        key={i}
                        title={`${w.code}-${100 + i}`}
                        className={cn(
                          "aspect-square rounded",
                          state === "occupied" && "bg-destructive/70 ring-1 ring-destructive/40",
                          state === "reserved" && "bg-warning/70 ring-1 ring-warning/40",
                          state === "available" && "bg-success/70 ring-1 ring-success/40"
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admissions table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admissions</CardTitle>
          <CardDescription>Sortable · exportable · filter by status</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={admissions}
            searchKey="patient"
            searchPlaceholder="Search MRN, name, physician, diagnosis…"
            compact
            className="rounded-none border-0 shadow-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}

type A = typeof admissions[number];
const cols: ColumnDef<A>[] = [
  { accessorKey: "mrn", header: "MRN", cell: ({ row }) => <span className="font-mono text-xs">{row.original.mrn}</span> },
  { accessorKey: "patient", header: "Patient", cell: ({ row }) => (
    <div>
      <div className="text-sm font-medium">{row.original.patient}</div>
      <div className="text-2xs text-muted-foreground">{row.original.age}·{row.original.gender}</div>
    </div>
  ) },
  { accessorKey: "ward", header: "Ward" },
  { accessorKey: "room", header: "Room/Bed", cell: ({ row }) => <span className="text-xs">{row.original.room}-{row.original.bed}</span> },
  { accessorKey: "physician", header: "Physician", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.physician}</span> },
  { accessorKey: "diagnosis", header: "Diagnosis" },
  { accessorKey: "los", header: "LOS", cell: ({ row }) => <span className="tabular-nums text-xs">{row.original.los}d</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" /> },
  { accessorKey: "admittedAt", header: "Admitted", cell: ({ row }) => <span className="text-2xs text-muted-foreground">{timeAgo(row.original.admittedAt)}</span> },
  { id: "actions", header: "", cell: () => (
    <div className="flex justify-end gap-1">
      <Button size="sm" variant="outline" className="h-7 text-xs">View</Button>
      <Button size="sm" variant="ghost" className="h-7 text-xs">Discharge</Button>
    </div>
  ) },
];
