"use client";
import * as React from "react";
import { ClipboardCheck, Heart, Save } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { TriageBadge } from "@/components/data/status-badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function TriageModule() {
  const [level, setLevel] = React.useState<"urgent" | "semi-urgent" | "routine">("semi-urgent");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Triage"
        subtitle="Vitals · Chief Complaint · Assign level"
        icon={ClipboardCheck}
        accent="clinic"
        actions={
          <Button size="sm" className="gap-1.5">
            <Save className="h-3.5 w-3.5" /> Save &amp; Route
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vitals</CardTitle>
            <CardDescription>Enter at intake · units autoformatted</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <Field label="Temperature (°C)" defaultValue="37.6" />
            <Field label="Heart Rate (bpm)" defaultValue="98" />
            <Field label="Systolic BP (mmHg)" defaultValue="128" />
            <Field label="Diastolic BP (mmHg)" defaultValue="84" />
            <Field label="Respiratory Rate" defaultValue="22" />
            <Field label="SpO₂ (%)" defaultValue="93" bad />
            <Field label="Weight (kg)" defaultValue="68" />
            <Field label="Height (cm)" defaultValue="164" />
            <Field label="Pain (0-10)" defaultValue="6" />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Chief Complaint</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                defaultValue="Sharp chest pain worse on inspiration, 2 days, dry cough."
                rows={5}
                className="w-full rounded-md border border-input bg-surface-raised px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Triage Level</CardTitle>
              <CardDescription>System recommends Semi-urgent</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {(["urgent", "semi-urgent", "routine"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    "flex items-center justify-between rounded-md border p-3 text-start transition-colors",
                    level === l
                      ? "border-primary/40 bg-primary/5 ring-2 ring-primary/40"
                      : "border-border/60 bg-surface-raised/40 hover:bg-surface-raised"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <TriageBadge level={l} />
                    <span className="text-sm">
                      {l === "urgent" && "Immediate action · resus"}
                      {l === "semi-urgent" && "See within 30 min"}
                      {l === "routine" && "See within 2 h"}
                    </span>
                  </div>
                  {level === l ? <Heart className="h-4 w-4 text-primary" /> : null}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, bad }: { label: string; defaultValue: string; bad?: boolean }) {
  return (
    <div>
      <Label className="mb-1 block text-2xs uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      <Input defaultValue={defaultValue} className={bad ? "border-destructive/40 text-destructive" : ""} />
    </div>
  );
}
