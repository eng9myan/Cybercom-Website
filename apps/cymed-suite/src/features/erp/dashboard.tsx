"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpRight,
  Boxes,
  Briefcase,
  CreditCard,
  Kanban,
  Receipt,
  ShoppingCart,
  Ticket,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge } from "@/components/data/status-badge";
import { AreaTrend, BarComparison, DonutSplit } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, timeAgo } from "@/lib/utils";
import {
  arAging,
  erpStats,
  journalEntries,
  openInvoices,
  opportunities,
  revenueTrend,
  supportTicketsByPriority,
} from "@/mock/erp";

export function ErpDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="ERP Dashboard"
        subtitle="Accounting · HR · CRM · Ops in one view"
        icon={Briefcase}
        accent="erp"
        badges={[{ label: "MTD", variant: "info" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Period Close</Button>
            <Button variant="outline" size="sm">Bank Recon</Button>
            <Button size="sm">New Journal</Button>
          </>
        }
      />

      <StatGrid>
        <StatCard
          label="Total Revenue"
          value={erpStats.totalRevenue}
          icon={TrendingUp}
          tone="success"
          formatFn={(n) => formatCurrency(n)}
          delta={9}
        />
        <StatCard
          label="Outstanding AR"
          value={erpStats.outstandingAR}
          icon={Receipt}
          tone="warning"
          formatFn={(n) => formatCurrency(n)}
        />
        <StatCard
          label="Payables Due"
          value={erpStats.payablesDue}
          icon={CreditCard}
          tone="destructive"
          formatFn={(n) => formatCurrency(n)}
        />
        <StatCard label="Active Employees" value={erpStats.activeEmployees} icon={Users} tone="info" />
        <StatCard label="Open POs" value={erpStats.openPOs} icon={ShoppingCart} tone="accent" />
        <StatCard
          label="Inventory Value"
          value={erpStats.inventoryValue}
          icon={Boxes}
          tone="primary"
          formatFn={(n) => formatCurrency(n)}
        />
        <StatCard label="Projects Active" value={erpStats.projectsActive} icon={Kanban} tone="default" />
        <StatCard label="Support Tickets" value={erpStats.ticketsOpen} icon={Ticket} tone="destructive" />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs Expenses · 12 mo</CardTitle>
            <CardDescription>Rolling P&amp;L view</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaTrend
              data={revenueTrend}
              xKey="month"
              series={[
                { key: "revenue", name: "Revenue", color: "hsl(142 71% 45%)" },
                { key: "expenses", name: "Expenses", color: "hsl(0 84% 60%)" },
                { key: "profit", name: "Profit", color: "hsl(217 91% 60%)" },
              ]}
              height={280}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AR Aging</CardTitle>
            <CardDescription>Buckets · outstanding</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutSplit
              data={arAging.map((a) => ({ name: a.bucket, value: a.amount }))}
              centerLabel="Buckets"
              centerValue={arAging.length}
              height={220}
              colors={[
                "hsl(142 71% 45%)",
                "hsl(217 91% 60%)",
                "hsl(38 92% 55%)",
                "hsl(24 95% 55%)",
                "hsl(0 84% 60%)",
              ]}
            />
            <div className="mt-2 space-y-1 text-2xs">
              {arAging.map((a) => (
                <div key={a.bucket} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{a.bucket}</span>
                  <span className="tabular-nums font-medium">{formatCurrency(a.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Open Invoices</CardTitle>
              <CardDescription>Prioritized by aging</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              Collections <ArrowUpRight className="h-3 w-3 rtl-flip" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              columns={invoiceColumns}
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
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>By priority</CardDescription>
          </CardHeader>
          <CardContent>
            <BarComparison
              data={supportTicketsByPriority}
              xKey="priority"
              series={[{ key: "count", name: "Open", color: "hsl(340 82% 60%)" }]}
              height={220}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Opportunities · weighted value</CardDescription>
          </div>
          <Badge variant="info">Q3</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {["Discovery", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map((stage) => {
              const items = opportunities.filter((o) => o.stage === stage);
              const value = items.reduce((s, o) => s + o.value, 0);
              return (
                <div key={stage} className="rounded-md border border-border/60 bg-surface-raised/40 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">{stage}</span>
                    <Badge
                      variant={
                        stage === "Won" ? "success" : stage === "Lost" ? "destructive" : "muted"
                      }
                      size="sm"
                    >
                      {items.length}
                    </Badge>
                  </div>
                  <div className="text-2xs text-muted-foreground">Weighted</div>
                  <div className="text-lg font-semibold tabular-nums">
                    {formatCurrency(value)}
                  </div>
                  <div className="mt-2 space-y-1">
                    {items.slice(0, 3).map((o) => (
                      <div key={o.id} className="text-2xs text-muted-foreground line-clamp-1">
                        · {o.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type Inv = typeof openInvoices[number];
const invoiceColumns: ColumnDef<Inv>[] = [
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.invoice}</span>,
  },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="tabular-nums font-medium">{formatCurrency(row.original.amount)}</span>
    ),
  },
  {
    accessorKey: "aging",
    header: "Aging",
    cell: ({ row }) => (
      <span
        className={cn(
          "tabular-nums text-xs",
          row.original.aging > 60 && "font-medium text-destructive",
          row.original.aging > 30 && row.original.aging <= 60 && "text-warning"
        )}
      >
        {row.original.aging}d
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
  },
  {
    accessorKey: "dueDate",
    header: "Due",
    cell: ({ row }) => (
      <span className="text-2xs text-muted-foreground">{timeAgo(row.original.dueDate)}</span>
    ),
  },
];
