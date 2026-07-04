"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckSquare } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge } from "@/components/data/status-badge";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prescriptionQueue } from "@/mock/pharmacy";

export function VerificationModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Prescription Verification"
        subtitle="Pharmacist review · clinical checks · approve/query"
        icon={CheckSquare}
        accent="pharmacy"
        badges={[{ label: "Queue", variant: "info" }]}
      />
      <Card>
        <CardHeader>
          <CardTitle>Awaiting Verification</CardTitle>
          <CardDescription>Sorted by priority · dispense after approval</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={prescriptionQueue}
            searchKey="patient"
            searchPlaceholder="Search Rx, patient, drug…"
            compact
            className="rounded-none border-0 shadow-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}

type RX = typeof prescriptionQueue[number];
const cols: ColumnDef<RX>[] = [
  { accessorKey: "id", header: "Rx", cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span> },
  { accessorKey: "patient", header: "Patient", cell: ({ row }) => (
    <div>
      <div className="text-sm font-medium">{row.original.patient}</div>
      <div className="text-2xs text-muted-foreground">{row.original.prescriber}</div>
    </div>
  ) },
  { accessorKey: "drug", header: "Drug", cell: ({ row }) => (
    <div>
      <div className="text-sm">{row.original.drug}</div>
      <div className="text-2xs text-muted-foreground">{row.original.quantity} × {row.original.form}</div>
    </div>
  ) },
  { accessorKey: "priority", header: "Priority", cell: ({ row }) => (
    <Badge variant={row.original.priority === "STAT" ? "destructive" : "muted"} size="sm">
      {row.original.priority}
    </Badge>
  ) },
  { accessorKey: "controlled", header: "Type", cell: ({ row }) => row.original.controlled ? (
    <Badge variant="destructive" size="sm">Ctrl</Badge>
  ) : (
    <Badge variant="muted" size="sm">Std</Badge>
  ) },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" /> },
  { id: "actions", header: "", cell: () => (
    <div className="flex justify-end gap-1">
      <Button size="sm" variant="outline" className="h-7 text-xs">Query</Button>
      <Button size="sm" className="h-7 text-xs">Approve</Button>
    </div>
  ) },
];
