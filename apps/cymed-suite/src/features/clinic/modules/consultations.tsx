"use client";
import * as React from "react";
import { Save, Send, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CLINICIAN_NAMES, PATIENT_NAMES } from "@/mock/names";

const ICD11 = [
  { code: "CA23", name: "Chronic obstructive pulmonary disease" },
  { code: "CA22.0", name: "Pneumonia due to Streptococcus" },
  { code: "5A11", name: "Type 2 diabetes mellitus" },
  { code: "BA00", name: "Essential hypertension" },
  { code: "MB23.0", name: "Fever, unspecified" },
  { code: "8A80", name: "Migraine, unspecified" },
];

const RX = [
  { drug: "Amoxicillin 500mg", dose: "1 cap PO TID", days: 7 },
  { drug: "Paracetamol 500mg", dose: "1 tab PO q6h PRN", days: 5 },
  { drug: "Metformin 500mg", dose: "1 tab PO BID", days: 30 },
];

export function ConsultationsModule() {
  const [selectedDx, setSelectedDx] = React.useState<typeof ICD11>([ICD11[1]]);
  const [note, setNote] = React.useState(
    "48F c/o pleuritic chest pain and cough for 2 days. Vitals stable. Chest crackles LLL. Impression: CAP."
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Consultations"
        subtitle={`${PATIENT_NAMES[0]} · Dr. ${CLINICIAN_NAMES[0].replace("Dr. ", "")}`}
        icon={Stethoscope}
        accent="clinic"
        badges={[{ label: "In Progress", variant: "info" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" /> Save draft
            </Button>
            <Button size="sm" className="gap-1.5">
              <Send className="h-3.5 w-3.5" /> Sign &amp; Send
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Encounter Note</CardTitle>
              <CardDescription>SOAP-lite for outpatient</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                rows={8}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-md border border-input bg-surface-raised px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ICD-11 Diagnosis</CardTitle>
              <CardDescription>Search &amp; select</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input placeholder="Search ICD-11 (e.g. pneumonia, DM)…" />
                <Button size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedDx.map((d) => (
                  <Badge key={d.code} variant="info" size="lg" className="gap-2">
                    <span className="font-mono text-2xs">{d.code}</span>
                    {d.name}
                  </Badge>
                ))}
              </div>
              <Separator />
              <div>
                <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">Suggestions</div>
                <div className="flex flex-wrap gap-2">
                  {ICD11.filter((d) => !selectedDx.includes(d)).slice(0, 5).map((d) => (
                    <button
                      key={d.code}
                      onClick={() => setSelectedDx((prev) => [...prev, d])}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-raised px-2.5 py-1 text-xs hover:bg-surface-overlay"
                    >
                      <span className="font-mono text-2xs text-muted-foreground">{d.code}</span>
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>e-Prescription</CardTitle>
              <CardDescription>Send to CyMed Pharmacy</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {RX.map((r) => (
                <div key={r.drug} className="flex items-center justify-between rounded-md border border-border/60 bg-surface-raised/40 p-2.5">
                  <div>
                    <div className="text-sm font-medium">{r.drug}</div>
                    <div className="text-2xs text-muted-foreground">{r.dose} · {r.days} days</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="muted" size="sm">Rx</Badge>
                    <Button size="sm" variant="ghost" className="h-7 text-xs">Remove</Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-1">+ Add medication</Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <SnapRow label="Age / Sex" value="48 · F" />
              <SnapRow label="MRN" value="PT-2025-0001" />
              <SnapRow label="Payer" value="Bupa Arabia" />
              <SnapRow label="Language" value="AR / EN" />
              <Separator />
              <SnapRow label="Allergies" value="Penicillin (severe)" strong />
              <SnapRow label="PMHx" value="HTN, DM2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vitals · Today</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 text-2xs">
              <VitalMini label="Temp" value="37.4°" />
              <VitalMini label="HR" value="92" />
              <VitalMini label="BP" value="132/86" />
              <VitalMini label="RR" value="22" />
              <VitalMini label="SpO₂" value="94%" bad />
              <VitalMini label="Wt" value="68kg" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral / Sick Leave</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" size="sm">Create Referral</Button>
              <Button variant="outline" size="sm">Sick Leave Certificate</Button>
              <Button variant="outline" size="sm">Order Labs / Imaging</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SnapRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-2xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={strong ? "font-medium text-destructive" : "text-foreground"}>{value}</span>
    </div>
  );
}

function VitalMini({ label, value, bad }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="rounded-md border border-border/60 bg-surface-raised/40 p-2">
      <div className="text-2xs text-muted-foreground">{label}</div>
      <div className={bad ? "text-sm font-semibold text-destructive tabular-nums" : "text-sm font-semibold tabular-nums"}>{value}</div>
    </div>
  );
}
