"use client";
import { Bell, ChefHat, Check } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kdsTickets } from "@/mock/cyshop";
import { cn } from "@/lib/utils";

const STATIONS = ["Grill", "Cold", "Fry", "Drinks"];

export function KdsModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Kitchen Display System"
        subtitle="Tickets by station · red = over target"
        icon={ChefHat}
        accent="cyshop"
        badges={[{ label: `${kdsTickets.length} live`, variant: "warning" }]}
      />
      <div className="grid gap-4 lg:grid-cols-4">
        {STATIONS.map((s) => {
          const items = kdsTickets.filter((t) => t.station === s);
          return (
            <Card key={s} className="flex flex-col">
              <CardHeader className="border-b border-border/60 py-2.5">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>{s}</span>
                  <Badge variant="muted" size="sm">{items.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-2 p-3">
                {items.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center text-2xs text-muted-foreground">
                    Clear
                  </div>
                ) : (
                  items.map((t) => (
                    <div
                      key={t.ticket}
                      className={cn(
                        "rounded-md border p-3",
                        t.urgency === "over" && "border-destructive/40 bg-destructive/10 animate-pulse",
                        t.urgency === "warn" && "border-warning/40 bg-warning/5",
                        t.urgency === "ok" && "border-border/60 bg-surface-raised/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xs text-muted-foreground">{t.ticket}</span>
                        <span
                          className={cn(
                            "text-xs font-medium tabular-nums",
                            t.urgency === "over" && "text-destructive",
                            t.urgency === "warn" && "text-warning",
                            t.urgency === "ok" && "text-success"
                          )}
                        >
                          {t.elapsed}m
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        {t.qty} × {t.item}
                      </div>
                      <div className="mt-1 text-2xs text-muted-foreground">
                        {t.table || "Takeaway"}
                      </div>
                      <div className="mt-2 flex gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 flex-1 text-xs gap-1">
                          <Bell className="h-3 w-3" /> Ping
                        </Button>
                        <Button size="sm" className="h-7 flex-1 text-xs gap-1">
                          <Check className="h-3 w-3" /> Bump
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
