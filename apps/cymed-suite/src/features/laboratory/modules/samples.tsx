"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Scan } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge } from "@/components/data/status-badge";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { labWorklist } from "@/mock/laboratory";
import { timeAgo } from "@/lib/utils";

export function SamplesModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Sample Tracking"
        subtitle="Barcode → Collection → Receipt → Chain of custody"
        icon={Scan}
        accent="laboratory"
        actions={
          <>
            <Button variant="outline" size="sm">Print Labels</Button>
            <Button size="sm">Scan In</Button>
          </>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Recent Samples</CardTitle>
          <CardDescription>Search by accession, patient</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={labWorklist.filter((r) => r.status !== "Ordered")}
            searchKey="patient"
            searchPlaceholder="Search…"
            compact
            className="rounded-none border-0 shadow-none"
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
  { accessorKey: "testName", header: "Test" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" /> },
  { accessorKey: "orderedAt", header: "Received", cell: ({ row }) => <span className="text-2xs text-muted-foreground">{timeAgo(row.original.orderedAt)}</span> },
];
