"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { BookOpen, Plus } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaTrend } from "@/components/charts";
import { journalEntries, revenueTrend } from "@/mock/erp";
import { formatCurrency, timeAgo } from "@/lib/utils";

export function AccountingModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Accounting"
        subtitle="Journals · Chart of accounts · Reconciliation"
        icon={BookOpen}
        accent="erp"
        actions={
          <>
            <Button variant="outline" size="sm">Reconcile</Button>
            <Button variant="outline" size="sm">Period Close</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> New Journal</Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>Rolling 12 mo</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaTrend
            data={revenueTrend}
            xKey="month"
            series={[
              { key: "revenue", name: "Revenue", color: "hsl(142 71% 45%)" },
              { key: "expenses", name: "Expenses", color: "hsl(0 84% 60%)" },
            ]}
            height={260}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Journal Entries</CardTitle>
          <CardDescription>Posted &amp; drafts</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={cols}
            data={journalEntries}
            searchKey="account"
            searchPlaceholder="Search account, description…"
            compact
            className="rounded-none border-0 shadow-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}

type J = typeof journalEntries[number];
const cols: ColumnDef<J>[] = [
  { accessorKey: "id", header: "JE", cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span> },
  { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-2xs text-muted-foreground">{timeAgo(row.original.date)}</span> },
  { accessorKey: "account", header: "Account" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "debit", header: "Debit", cell: ({ row }) => row.original.debit ? <span className="tabular-nums text-success">{formatCurrency(row.original.debit)}</span> : <span className="text-2xs text-muted-foreground">—</span> },
  { accessorKey: "credit", header: "Credit", cell: ({ row }) => row.original.credit ? <span className="tabular-nums text-warning">{formatCurrency(row.original.credit)}</span> : <span className="text-2xs text-muted-foreground">—</span> },
  { accessorKey: "posted", header: "Status", cell: ({ row }) => row.original.posted ? <Badge variant="success" size="sm">Posted</Badge> : <Badge variant="warning" size="sm">Draft</Badge> },
];
