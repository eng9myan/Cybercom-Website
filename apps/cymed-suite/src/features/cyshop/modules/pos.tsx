"use client";
import * as React from "react";
import { CreditCard, Percent, Printer, Store, Trash2, User, Wallet } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MENU_ITEMS } from "@/mock/names";
import { cyshopStats, menuCategories } from "@/mock/cyshop";
import { cn, formatCurrency } from "@/lib/utils";

export function CyshopPosModule() {
  const [tab, setTab] = React.useState<string>("Mains");
  const [cart, setCart] = React.useState([
    { item: MENU_ITEMS[1], qty: 1 },
    { item: MENU_ITEMS[5], qty: 2 },
  ]);

  const total = cart.reduce((s, r) => s + r.item.price * r.qty, 0);
  const vat = total * 0.15;
  const discount = 0;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="POS"
        subtitle="Category grid · cart · split payment"
        icon={Store}
        accent="cyshop"
        badges={[{ label: "Terminal T-01", variant: "muted" }]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-1.5">
              {menuCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setTab(c)}
                  className={cn(
                    "rounded-md border px-3 py-1 text-xs transition-colors",
                    tab === c
                      ? "border-accent/40 bg-accent/15 text-accent"
                      : "border-border/60 bg-surface-raised/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-3">
              {MENU_ITEMS.filter((m) => m.cat === tab).map((m) => (
                <button
                  key={m.name}
                  onClick={() =>
                    setCart((prev) => {
                      const idx = prev.findIndex((r) => r.item.name === m.name);
                      if (idx >= 0) return prev.map((r, i) => (i === idx ? { ...r, qty: r.qty + 1 } : r));
                      return [...prev, { item: m, qty: 1 }];
                    })
                  }
                  className="rounded-md border border-border/60 bg-surface-raised/40 p-3 text-start transition-colors hover:bg-surface-raised"
                >
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{m.cat}</span>
                    <span className="font-semibold text-foreground">{formatCurrency(m.price)}</span>
                  </div>
                </button>
              ))}
              {MENU_ITEMS.filter((m) => m.cat === tab).length === 0 ? (
                <div className="col-span-full py-6 text-center text-sm text-muted-foreground">
                  No items in {tab}.
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Order · #{cyshopStats.ordersToday + 1}</CardTitle>
              <CardDescription>Dine-in · Table T-14</CardDescription>
            </div>
            <Badge variant="info" size="sm">Open</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Customer name / phone…" className="h-8 text-xs" />
            </div>
            <Separator />
            {cart.map((r, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-border/60 bg-surface-raised/40 p-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.item.name}</div>
                  <div className="text-2xs text-muted-foreground">{formatCurrency(r.item.price)} × {r.qty}</div>
                </div>
                <Input
                  type="number"
                  value={r.qty}
                  onChange={(e) =>
                    setCart((prev) => prev.map((row, idx) => (idx === i ? { ...row, qty: Number(e.target.value) } : row)))
                  }
                  className="h-7 w-12 p-1 text-center text-xs"
                />
                <Button
                  size="iconSm"
                  variant="ghost"
                  onClick={() => setCart((prev) => prev.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            ))}
            <Separator />
            <Row k="Subtotal" v={formatCurrency(total)} />
            <Row k="Discount" v={formatCurrency(-discount)} />
            <Row k="VAT (15%)" v={formatCurrency(vat)} />
            <div className="mt-1 flex items-baseline justify-between rounded-md bg-accent/10 p-2">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-lg font-bold tabular-nums text-accent">{formatCurrency(total + vat - discount)}</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <Button size="sm" variant="outline" className="gap-1.5">
                <Wallet className="h-3.5 w-3.5" /> Cash
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5">
                <CreditCard className="h-3.5 w-3.5" /> Card
              </Button>
              <Button size="sm" className="gap-1.5">
                <Printer className="h-3.5 w-3.5" /> Charge
              </Button>
            </div>
            <Button size="sm" variant="ghost" className="gap-1.5">
              <Percent className="h-3.5 w-3.5" /> Apply Discount
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium tabular-nums">{v}</span>
    </div>
  );
}
