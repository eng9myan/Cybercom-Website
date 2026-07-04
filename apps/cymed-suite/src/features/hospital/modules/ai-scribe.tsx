"use client";
import * as React from "react";
import { FileSignature, Mic, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SAMPLE = `Physician: Good morning, tell me what brings you in.
Patient: I've had this sharp chest pain for two days, gets worse when I breathe deep.
Physician: Fever? Cough?
Patient: No fever, dry cough sometimes.
Physician: Past history?
Patient: Hypertension, diabetes on metformin.
`;

const SOAP = `S · Subjective
48-year-old female with 2-day history of pleuritic chest pain, denies fever, occasional dry cough. PMHx: HTN, DM2 on metformin.

O · Objective
Vitals stable. Chest auscultation reveals crackles at left base. CV: RRR, no murmurs.

A · Assessment
1. Suspected community-acquired pneumonia — left lower lobe
2. Type 2 Diabetes Mellitus — stable
3. Essential Hypertension — controlled

P · Plan
• CXR PA/lateral
• CBC, BMP, blood cultures ×2
• Empiric Ceftriaxone 1g IV + Azithromycin 500mg IV
• Reassess in 6 hours
• Continue home meds
`;

export function AiScribeModule() {
  const [transcript, setTranscript] = React.useState(SAMPLE);
  const [output, setOutput] = React.useState<string | null>(null);
  const [running, setRunning] = React.useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Scribe"
        subtitle="Transcript → structured SOAP note"
        icon={FileSignature}
        accent="hospital"
        badges={[{ label: "New", variant: "info" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Mic className="h-3.5 w-3.5" /> Record
            </Button>
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setRunning(true);
                setOutput(null);
                setTimeout(() => {
                  setOutput(SOAP);
                  setRunning(false);
                }, 900);
              }}
            >
              <Sparkles className="h-3.5 w-3.5" /> Generate
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>Paste or dictate the encounter</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={16}
              className="w-full rounded-md border border-input bg-surface-raised px-3 py-2 font-mono text-xs text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Generated SOAP</CardTitle>
              <CardDescription>Review · edit · sign</CardDescription>
            </div>
            {output ? (
              <Badge variant="success" size="sm">Ready</Badge>
            ) : running ? (
              <Badge variant="info" size="sm">Generating…</Badge>
            ) : (
              <Badge variant="muted" size="sm">Idle</Badge>
            )}
          </CardHeader>
          <CardContent>
            {running ? (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                <Sparkles className="me-2 h-4 w-4 animate-pulse text-accent" />
                Drafting SOAP note…
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap rounded-md border border-border/60 bg-surface-raised/40 p-3 text-xs leading-relaxed text-foreground">
                {output}
              </pre>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                Press <span className="mx-1 rounded bg-surface-raised px-1.5 py-0.5 text-xs">Generate</span> to draft.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
