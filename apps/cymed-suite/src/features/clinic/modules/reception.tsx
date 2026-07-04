"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Contact, Plus, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge, TriageBadge } from "@/components/data/status-badge";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { receptionQueue } from "@/mock/clinic";

export function ReceptionModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reception"
        subtitle="Live patient queue · check-in · triage handoff"
        icon={Contact}
        accent="clinic"
        badges={[{ label: "LIVE", variant: "success" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Check-in
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Queue</CardTitle>
          <CardDescription>Triage color coded · sortable · exportable</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={receptionQueue}
            searchKey="patient"
            searchPlaceholder="Search MRN, patient, phone…"
            compact
            className="rounded-none border-0 shadow-none"
            pageSize={12}
          />
        </CardContent>
      </Card>
    </div>
  );
}

type Q = typeof receptionQueue[number];
const cols: ColumnDef<Q>[] = [
  { accessorKey: "mrn", header: "MRN", cell: ({ row }) => <span className="font-mono text-xs">{row.original.mrn}</span> },
  { accessorKey: "patient", header: "Patient", cell: ({ row }) => (
    <div>
      <div className="text-sm font-medium">{row.original.patient}</div>
      <div className="text-2xs text-muted-foreground">{row.original.age}·{row.original.gender} · {row.original.payer}</div>
    </div>
  ) },
  { accessorKey: "waitMinutes", header: "Wait", cell: ({ row }) => (
    <span className={row.original.waitMinutes > 30 ? "font-medium text-destructive" : "text-warning"}>
      {row.original.waitMinutes}m
    </span>
  ) },
  { accessorKey: "triage", header: "Triage", cell: ({ row }) => <TriageBadge level={row.original.triage} /> },
  { accessorKey: "specialty", header: "Specialty" },
  { accessorKey: "physician", header: "Physician", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.physician}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" /> },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex justify-end gap-1">
        <Button size="sm" variant="outline" className="h-7 text-xs">Call in</Button>
        <Button size="sm" variant="ghost" className="h-7 text-xs">View</Button>
      </div>
    ),
  },
];
