"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Brain, ClipboardList, Plus } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge } from "@/components/data/status-badge";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { risWorklist } from "@/mock/imaging";
import { timeAgo } from "@/lib/utils";

export function RisWorklistModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="RIS Worklist"
        subtitle="Assign radiologist · filter by modality"
        icon={ClipboardList}
        accent="imaging"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Order
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Studies</CardTitle>
          <CardDescription>Live · sortable · AI-flagged studies highlighted</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={risWorklist}
            searchKey="patient"
            searchPlaceholder="Search accession, patient, modality…"
            compact
            className="rounded-none border-0 shadow-none"
            pageSize={12}
          />
        </CardContent>
      </Card>
    </div>
  );
}

type R = typeof risWorklist[number];
const cols: ColumnDef<R>[] = [
  { accessorKey: "id", header: "Accession", cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span> },
  { accessorKey: "patient", header: "Patient" },
  { accessorKey: "modality", header: "Modality", cell: ({ row }) => (
    <div>
      <div className="text-sm font-medium">{row.original.modality} · {row.original.body}</div>
      <div className="text-2xs text-muted-foreground">{row.original.modalityName}</div>
    </div>
  ) },
  { accessorKey: "orderingMd", header: "Ordering MD", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.orderingMd}</span> },
  { accessorKey: "priority", header: "Priority", cell: ({ row }) => (
    <Badge variant={row.original.priority === "STAT" ? "destructive" : "muted"} size="sm">{row.original.priority}</Badge>
  ) },
  { accessorKey: "aiFlag", header: "AI", cell: ({ row }) => row.original.aiFlag ? (
    <Badge variant={row.original.aiFlag.severity === "high" ? "destructive" : "warning"} size="sm">
      <Brain className="me-1 h-2.5 w-2.5" /> {row.original.aiFlag.finding}
    </Badge>
  ) : <span className="text-2xs text-muted-foreground">—</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" /> },
  { accessorKey: "scheduledAt", header: "Scheduled", cell: ({ row }) => <span className="text-2xs text-muted-foreground">{timeAgo(row.original.scheduledAt)}</span> },
  { accessorKey: "radiologist", header: "Rad", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.radiologist}</span> },
];
