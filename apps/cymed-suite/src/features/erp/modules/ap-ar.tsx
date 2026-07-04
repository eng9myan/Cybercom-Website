"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge } from "@/components/data/status-badge";
import { DataTable } from "@/components/data/data-table";
import { BarComparison } from "@/components/charts";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { arAging, openInvoices } from "@/mock/erp";
import { cn, formatCurrency, timeAgo } from "@/lib/utils";

export function ApArModule() {
  const totalAR = arAging.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AP / AR"
        subtitle="Invoices · Aging · Collections"
        icon={Receipt}
        accent="erp"
        actions={
          <>
            <Button variant="outline" size="sm">Send Reminders</Button>
            <Button size="sm">Record Payment</Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Total AR" value={totalAR} tone="warning" formatFn={(n) => formatCurrency(n)} />
        <StatCard label="Current" value={arAging[0].amount} tone="success" formatFn={(n) => formatCurrency(n)} />
        <StatCard label="30-60" value={arAging[2].amount} tone="warning" formatFn={(n) => formatCurrency(n)} />
        <StatCard label="90+" value={arAging[4].amount} tone="destructive" formatFn={(n) => formatCurrency(n)} />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Open Invoices</CardTitle>
            <CardDescription>Sorted by aging</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={cols}
              data={openInvoices}
              searchKey="customer"
              searchPlaceholder="Search invoice, customer…"
              compact
              className="rounded-none border-0 shadow-none"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aging Buckets</CardTitle>
            <CardDescription>Amounts by bucket</CardDescription>
          </CardHeader>
          <CardContent>
            <BarComparison
              data={arAging}
              xKey="bucket"
              series={[{ key: "amount", name: "Amount", color: "hsl(340 82% 60%)" }]}
              height={220}
              layout="vertical"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type Inv = typeof openInvoices[number];
const cols: ColumnDef<Inv>[] = [
  { accessorKey: "invoice", header: "Invoice", cell: ({ row }) => <span className="font-mono text-xs">{row.original.invoice}</span> },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "amount", header: "Amount", cell: ({ row }) => <span className="tabular-nums font-medium">{formatCurrency(row.original.amount)}</span> },
  { accessorKey: "aging", header: "Aging", cell: ({ row }) => (
    <span className={cn("tabular-nums text-xs", row.original.aging > 60 && "font-medium text-destructive", row.original.aging > 30 && row.original.aging <= 60 && "text-warning")}>
      {row.original.aging}d
    </span>
  ) },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" /> },
  { accessorKey: "dueDate", header: "Due", cell: ({ row }) => <span className="text-2xs text-muted-foreground">{timeAgo(row.original.dueDate)}</span> },
];
