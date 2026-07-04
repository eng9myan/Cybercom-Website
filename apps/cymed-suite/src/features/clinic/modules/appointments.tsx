"use client";
import { Calendar, Plus, Video } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatusBadge } from "@/components/data/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { appointmentsToday } from "@/mock/clinic";

export function AppointmentsModule() {
  const HOURS = Array.from({ length: 10 }, (_, i) => 8 + i);
  const byHour: Record<number, typeof appointmentsToday> = {};
  for (const a of appointmentsToday) {
    const h = Number(a.time.slice(0, 2));
    (byHour[h] ??= []).push(a);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Appointments"
        subtitle="Day view · drag to reschedule"
        icon={Calendar}
        accent="clinic"
        actions={
          <>
            <Button variant="outline" size="sm">Waitlist</Button>
            <Button variant="outline" size="sm">SMS Reminders</Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> New Slot
            </Button>
          </>
        }
      />

      <Tabs defaultValue="day">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
        </TabsList>

        <TabsContent value="day">
          <Card>
            <CardHeader>
              <CardTitle>Today · 08:00 – 18:00</CardTitle>
              <CardDescription>{appointmentsToday.length} slots</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {HOURS.map((h) => (
                  <div key={h} className="grid grid-cols-[64px_1fr] items-start gap-3 p-3">
                    <div className="pt-1 text-2xs font-medium uppercase text-muted-foreground tabular-nums">
                      {String(h).padStart(2, "0")}:00
                    </div>
                    <div className="grid gap-1.5">
                      {(byHour[h] ?? []).map((a, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-md border border-border/60 bg-surface-raised/40 p-2.5"
                        >
                          <div className="w-14 shrink-0 text-xs font-medium tabular-nums">{a.time}</div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium">{a.patient}</div>
                            <div className="truncate text-2xs text-muted-foreground">
                              {a.physician} · {a.specialty} · {a.duration}m
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="muted" size="sm">
                              {a.type}
                            </Badge>
                            {a.channel === "Telehealth" ? (
                              <Badge variant="info" size="sm">
                                <Video className="me-1 h-2.5 w-2.5" /> Tele
                              </Badge>
                            ) : null}
                            <StatusBadge status={a.status} size="sm" />
                          </div>
                        </div>
                      ))}
                      {!(byHour[h] ?? []).length && (
                        <div className="text-2xs text-muted-foreground">No appointments.</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Week view (drag-drop) — mock placeholder.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month">
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Month grid — mock placeholder.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="waitlist">
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Waitlist — mock placeholder.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
