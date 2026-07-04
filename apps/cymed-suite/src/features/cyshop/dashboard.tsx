"use client";
import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  AlertTriangle,
  ChefHat,
  Clock,
  DollarSign,
  ShoppingBag,
  Star,
  Timer,
  Utensils,
} from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { StatusBadge } from "@/components/data/status-badge";
import { AreaTrend, BarComparison, DonutSplit } from "@/components/charts";
import { DataTable } from "@/components/data/data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import { cyshopStats, kdsTickets, orderQueue, salesByHour, topItems } from "@/mock/cyshop";

export function CyshopDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="CyShop Dashboard"
        subtitle="POS · KDS · Delivery · One plane"
        icon={ChefHat}
        accent="cyshop"
        badges={[{ label: "Open", variant: "success" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Z-Report</Button>
            <Button variant="outline" size="sm">Floor</Button>
            <Button size="sm">New Order</Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Orders Today" value={cyshopStats.ordersToday} icon={ShoppingBag} tone="info" delta={9} />
        <StatCard
          label="Revenue Today"
          value={cyshopStats.revenueToday}
          icon={DollarSign}
          tone="success"
          formatFn={(n) => formatCurrency(n)}
          delta={11}
        />
        <StatCard
          label="Active Tables"
          value={cyshopStats.activeTables}
          suffix={`/${cyshopStats.totalTables}`}
          icon={Utensils}
          tone="accent"
        />
        <StatCard label="Kitchen Queue" value={cyshopStats.kitchenQueue} icon={ChefHat} tone="warning" />
        <StatCard label="Avg Order Time" value={cyshopStats.avgOrderTime} suffix="m" icon={Timer} tone="default" />
        <StatCard label="Low Stock" value={cyshopStats.lowStockAlerts} icon={AlertTriangle} tone="destructive" />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales by Hour</CardTitle>
            <CardDescription>Revenue + order count trend</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaTrend
              data={salesByHour}
              xKey="hour"
              series={[
                { key: "revenue", name: "Revenue", color: "hsl(24 95% 55%)" },
                { key: "orders", name: "Orders", color: "hsl(217 91% 60%)" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Channel Mix</CardTitle>
            <CardDescription>Where orders come from</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutSplit
              data={[
                { name: "Dine-in", value: 48 },
                { name: "Takeaway", value: 22 },
                { name: "Talabat", value: 18 },
                { name: "Noon Food", value: 8 },
                { name: "HungerStation", value: 4 },
              ]}
              centerLabel="Channels"
              centerValue={5}
              height={260}
              colors={[
                "hsl(24 95% 55%)",
                "hsl(217 91% 60%)",
                "hsl(142 71% 45%)",
                "hsl(280 65% 60%)",
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
              <CardTitle>Kitchen Display · Tickets</CardTitle>
              <CardDescription>Grouped by station · red = over</CardDescription>
            </div>
            <Badge variant="warning" size="sm">
              <ChefHat className="me-1 h-2.5 w-2.5" /> {kdsTickets.length} live
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {kdsTickets.slice(0, 8).map((t) => (
                <div
                  key={t.ticket}
                  className={cn(
                    "rounded-md border p-3",
                    t.urgency === "over" && "border-destructive/40 bg-destructive/5",
                    t.urgency === "warn" && "border-warning/40 bg-warning/5",
                    t.urgency === "ok" && "border-border/60 bg-surface-raised/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="muted" size="sm">
                      {t.station}
                    </Badge>
                    <span
                      className={cn(
                        "text-2xs font-medium tabular-nums",
                        t.urgency === "over" && "text-destructive",
                        t.urgency === "warn" && "text-warning",
                        t.urgency === "ok" && "text-success"
                      )}
                    >
                      {t.elapsed}m
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-medium">
                    {t.qty} × {t.item}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-2xs text-muted-foreground">
                    <span>{t.table || "Takeaway"}</span>
                    <span className="font-mono">{t.ticket}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Items Today</CardTitle>
            <CardDescription>By quantity sold</CardDescription>
          </CardHeader>
          <CardContent>
            <BarComparison
              data={topItems.map((t) => ({ item: t.item, sold: t.soldToday }))}
              xKey="item"
              series={[{ key: "sold", name: "Sold", color: "hsl(24 95% 55%)" }]}
              height={260}
              layout="vertical"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle>Order Queue</CardTitle>
            <CardDescription>All channels · in-flight</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={orderColumns}
            data={orderQueue}
            searchKey="id"
            searchPlaceholder="Search order id, table, channel…"
            compact
            className="rounded-none border-0 shadow-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}

type O = typeof orderQueue[number];
const orderColumns: ColumnDef<O>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => (
      <Badge variant="muted" size="sm">
        {row.original.channel}
      </Badge>
    ),
  },
  {
    accessorKey: "table",
    header: "Table",
    cell: ({ row }) => <span className="text-xs">{row.original.table || "—"}</span>,
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <div className="text-xs">
        {row.original.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <span className="tabular-nums font-medium">{formatCurrency(row.original.total)}</span>
    ),
  },
  {
    accessorKey: "timerMinutes",
    header: "Timer",
    cell: ({ row }) => (
      <span
        className={cn(
          "tabular-nums text-xs",
          row.original.timerMinutes > 12 && "font-medium text-destructive",
          row.original.timerMinutes > 8 && row.original.timerMinutes <= 12 && "text-warning"
        )}
      >
        {row.original.timerMinutes}m
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} size="sm" />,
  },
];
