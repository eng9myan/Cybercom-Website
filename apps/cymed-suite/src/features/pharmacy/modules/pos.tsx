"use client";
import * as React from "react";
import { Barcode, Printer, Store, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DRUGS } from "@/mock/names";
import { cn, formatCurrency } from "@/lib/utils";

export function PharmacyPosModule() {
  const [cart, setCart] = React.useState([
    { drug: DRUGS[0], qty: 2 },
    { drug: DRUGS[3], qty: 1 },
  ]);

  const total = cart.reduce((s, r) => s + r.drug.price * r.qty, 0);
  const vat = total * 0.15;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="POS &amp; Dispensing"
        subtitle="Scan · price · receipt"
        icon={Store}
        accent="pharmacy"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Barcode className="h-3.5 w-3.5" /> Scan Rx
            </Button>
            <Button size="sm" className="gap-1.5">
              <Printer className="h-3.5 w-3.5" /> Print Receipt
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Catalog</CardTitle>
            <CardDescription>Search &amp; click to add</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Search drug (name, SKU, bin)…" className="mb-3" />
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {DRUGS.map((d) => (
                <button
                  key={d.name}
                  onClick={() =>
                    setCart((prev) => {
                      const found = prev.find((r) => r.drug.name === d.name);
                      if (found) return prev.map((r) => (r.drug.name === d.name ? { ...r, qty: r.qty + 1 } : r));
                      return [...prev, { drug: d, qty: 1 }];
                    })
                  }
                  className="rounded-md border border-border/60 bg-surface-raised/40 p-2.5 text-start transition-colors hover:bg-surface-raised"
                >
                  <div className="text-sm font-medium">{d.name}</div>
                  <div className="mt-0.5 flex items-center justify-between text-2xs text-muted-foreground">
                    <span>{d.form}</span>
                    <span className="font-medium text-foreground">{formatCurrency(d.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cart</CardTitle>
            <CardDescription>{cart.length} item{cart.length === 1 ? "" : "s"}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {cart.map((r, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-border/60 bg-surface-raised/40 p-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.drug.name}</div>
                  <div className="text-2xs text-muted-foreground">{formatCurrency(r.drug.price)} × {r.qty}</div>
                </div>
                <Input
                  type="number"
                  value={r.qty}
                  onChange={(e) => {
                    const q = Number(e.target.value);
                    setCart((prev) => prev.map((row, idx) => (idx === i ? { ...row, qty: q } : row)));
                  }}
                  className="h-7 w-14 p-1 text-center text-xs"
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
            <Row k="VAT (15%)" v={formatCurrency(vat)} />
            <div className="mt-1 flex items-baseline justify-between rounded-md bg-primary/10 p-2">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-lg font-bold tabular-nums text-primary">{formatCurrency(total + vat)}</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <Button size="sm" variant="outline">Cash</Button>
              <Button size="sm" variant="outline">Card</Button>
              <Button size="sm">Insurance</Button>
            </div>
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
