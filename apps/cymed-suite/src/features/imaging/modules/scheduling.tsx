"use client";
import { Calendar, Plus } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { risWorklist } from "@/mock/imaging";
import { MODALITIES } from "@/mock/names";

export function SchedulingModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Scheduling"
        subtitle="Modality rooms · slot booking · prep instructions"
        icon={Calendar}
        accent="imaging"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Booking
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-5">
        {MODALITIES.map((m) => (
          <Card key={m.code}>
            <CardHeader>
              <CardTitle className="text-sm">{m.code} · Room 1</CardTitle>
              <CardDescription className="text-2xs">{m.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5">
              {risWorklist
                .filter((s) => s.modality === m.code)
                .slice(0, 6)
                .map((s) => (
                  <div key={s.id} className="rounded-md border border-border/60 bg-surface-raised/40 p-2">
                    <div className="flex items-center justify-between text-2xs">
                      <span className="font-medium tabular-nums">
                        {new Date(s.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <Badge
                        variant={s.priority === "STAT" ? "destructive" : "muted"}
                        size="sm"
                      >
                        {s.priority}
                      </Badge>
                    </div>
                    <div className="mt-1 truncate text-xs font-medium">{s.patient}</div>
                    <div className="truncate text-2xs text-muted-foreground">{s.body}</div>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
