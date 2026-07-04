"use client";
import { HeartPulse, Plus } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { nurseWardList } from "@/mock/hospital";
import { cn } from "@/lib/utils";

export function NurseStationModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nurse Station"
        subtitle="Ward MS-1 · Vitals · MAR · Notes"
        icon={HeartPulse}
        accent="hospital"
        actions={
          <>
            <Button variant="outline" size="sm">Handover</Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Vitals Round
            </Button>
          </>
        }
      />

      <div className="grid gap-3">
        {nurseWardList.map((p) => {
          const abnormal =
            Number(p.vitals.temp) > 38 ||
            p.vitals.hr > 100 ||
            p.vitals.spo2 < 94 ||
            p.vitals.gcs < 15;
          return (
            <Card key={p.bed} className={cn(abnormal && "border-warning/40")}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold">{p.patient}</div>
                      <Badge variant="muted" size="sm">{p.bed}</Badge>
                      {p.isolation !== "—" ? (
                        <Badge variant="destructive" size="sm">{p.isolation}</Badge>
                      ) : null}
                      {p.code !== "Full" ? (
                        <Badge variant="warning" size="sm">{p.code}</Badge>
                      ) : null}
                    </div>
                    <div className="mt-0.5 text-2xs text-muted-foreground">
                      {p.mrn} · {p.age}y · Day {p.admittedDays} · {p.attending} · Nurse {p.nurse}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="info" size="sm">Next med {p.nextMed}</Badge>
                    <Button size="sm" variant="outline" className="h-7 text-xs">Chart</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs">Note</Button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  <Vital label="Temp" value={`${p.vitals.temp}°`} bad={Number(p.vitals.temp) > 38} />
                  <Vital label="HR" value={String(p.vitals.hr)} bad={p.vitals.hr > 100 || p.vitals.hr < 55} />
                  <Vital label="BP" value={p.vitals.bp} />
                  <Vital label="RR" value={String(p.vitals.rr)} bad={p.vitals.rr > 22} />
                  <Vital label="SpO₂" value={`${p.vitals.spo2}%`} bad={p.vitals.spo2 < 94} />
                  <Vital label="GCS" value={String(p.vitals.gcs)} bad={p.vitals.gcs < 15} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Vital({ label, value, bad }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className={cn("rounded-md border p-2", bad ? "border-destructive/40 bg-destructive/5" : "border-border/60 bg-surface-raised/40")}>
      <div className="text-2xs text-muted-foreground">{label}</div>
      <div className={cn("text-sm font-semibold tabular-nums", bad && "text-destructive")}>{value}</div>
    </div>
  );
}
