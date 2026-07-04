"use client";
import { Ambulance, Plus, Radio } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { StatCard, StatGrid } from "@/components/data/stat-card";
import { EsiBadge } from "@/components/data/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { erQueue, hospitalStats } from "@/mock/hospital";
import { Clock, HeartPulse, ShieldAlert, Users } from "lucide-react";

export function EmergencyModule() {
  const resus = erQueue.filter((p) => p.esi <= 2);
  const fastTrack = erQueue.filter((p) => p.esi >= 3);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Emergency Department"
        subtitle="Live triage · Resus vs Fast-Track"
        icon={Ambulance}
        accent="hospital"
        badges={[{ label: "LIVE", variant: "destructive" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Radio className="h-3.5 w-3.5" /> Trauma Activation
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Register Patient
            </Button>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Waiting" value={hospitalStats.erWaiting} icon={Users} tone="warning" />
        <StatCard label="In Treatment" value={hospitalStats.erInTreatment} icon={HeartPulse} tone="accent" />
        <StatCard label="Resus Beds" value={resus.length} suffix="/6" icon={ShieldAlert} tone="destructive" />
        <StatCard label="Median Door-to-Provider" value={11} suffix="m" icon={Clock} tone="info" delta={-4} />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-2">
        <LaneCard title="Resus Lane · ESI 1–2" tone="destructive" patients={resus} />
        <LaneCard title="Fast-Track · ESI 3–5" tone="success" patients={fastTrack} />
      </div>
    </div>
  );
}

function LaneCard({
  title,
  tone,
  patients,
}: {
  title: string;
  tone: "destructive" | "success";
  patients: typeof erQueue;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{patients.length} patient{patients.length === 1 ? "" : "s"}</CardDescription>
        </div>
        <Badge variant={tone === "destructive" ? "destructive" : "success"}>{patients.length}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {patients.map((p) => (
          <div
            key={p.id}
            className="rounded-md border border-border/60 bg-surface-raised/40 p-3"
          >
            <div className="flex items-center gap-2">
              <EsiBadge level={p.esi as 1 | 2 | 3 | 4 | 5} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{p.patient}</div>
                <div className="truncate text-2xs text-muted-foreground">
                  {p.complaint} · MRN {p.id}
                </div>
              </div>
              <div className="text-end">
                <div className="text-xs font-medium tabular-nums text-warning">{p.waitMinutes}m</div>
                <div className="text-2xs text-muted-foreground">{p.assigned}</div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-2 text-2xs">
              <div>
                <div className="text-muted-foreground">HR</div>
                <div className="font-medium tabular-nums">{p.vitals.hr}</div>
              </div>
              <div>
                <div className="text-muted-foreground">BP</div>
                <div className="font-medium tabular-nums">{p.vitals.bp}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Temp</div>
                <div className="font-medium tabular-nums">{p.vitals.temp}</div>
              </div>
              <div>
                <div className="text-muted-foreground">SpO₂</div>
                <div className="font-medium tabular-nums">{p.vitals.spo2}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">RR</div>
                <div className="font-medium tabular-nums">{p.vitals.rr}</div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
