"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { ClipboardList, Plus } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge } from "@/components/data/status-badge";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { labWorklist } from "@/mock/laboratory";

export function LabOrdersModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Test Orders"
        subtitle="STAT / Routine · sample type · priority"
        icon={ClipboardList}
        accent="laboratory"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Order
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Live · filter by priority / department</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={labWorklist}
            searchKey="patient"
            searchPlaceholder="Search accession, patient, test…"
            compact
            className="rounded-none border-0 shadow-none"
            pageSize={12}
          />
        </CardContent>
      </Card>
    </div>
  );
}

type L = typeof labWorklist[number];
const cols: ColumnDef<L>[] = [
  { accessorKey: "accession", header: "Accession", cell: ({ row }) => <span className="font-mono text-xs">{row.original.accession}</span> },
  { accessorKey: "patient", header: "Patient" },
  { accessorKey: "testName", header: "Test", cell: ({ row }) => (
    <div>
      <div className="text-sm">{row.original.testName}</div>
      <div className="text-2xs text-muted-foreground">{row.original.testCode} · {row.original.panel}</div>
    </div>
  ) },
  { accessorKey: "orderedBy", header: "Physician", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.orderedBy}</span> },
  { accessorKey: "priority", header: "Priority", cell: ({ row }) => (
    <Badge variant={row.original.priority === "STAT" ? "destructive" : "muted"} size="sm">{row.original.priority}</Badge>
  ) },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" /> },
];
