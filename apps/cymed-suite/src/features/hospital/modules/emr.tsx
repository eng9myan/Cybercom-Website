"use client";
import * as React from "react";
import { FileText, PenSquare, Save, Send } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { admissions } from "@/mock/hospital";

export function EmrModule() {
  const patient = admissions[0];
  const [subj, setSubj] = React.useState("48F c/o SOB and pleuritic chest pain for 2 days. Denies fever. PMHx HTN, DM2.");
  const [obj, setObj] = React.useState("Afebrile. HR 94, BP 132/86, RR 22, SpO₂ 93% RA. Chest: crackles L base. CV: RRR.");
  const [ass, setAss] = React.useState("Community-acquired pneumonia, likely bacterial.");
  const [plan, setPlan] = React.useState("• CXR PA/lat\n• CBC, BMP, blood culture x2\n• Azithromycin 500mg IV + Ceftriaxone 1g IV\n• O₂ titrate to SpO₂ ≥ 94%\n• Reassess in 6h");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="EMR / CPOE"
        subtitle={`${patient.patient} · MRN ${patient.mrn} · ${patient.age}${patient.gender} · ${patient.ward}-${patient.room}`}
        icon={FileText}
        accent="hospital"
        badges={[{ label: "Signed", variant: "success" }, { label: patient.status, variant: "info" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <PenSquare className="h-3.5 w-3.5" /> Draft
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Save className="h-3.5 w-3.5" /> Save
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
              <CardTitle>Encounter Note · SOAP</CardTitle>
              <CardDescription>Auto-saved · draft</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <SoapField label="S · Subjective" value={subj} onChange={setSubj} />
              <SoapField label="O · Objective" value={obj} onChange={setObj} />
              <SoapField label="A · Assessment" value={ass} onChange={setAss} />
              <SoapField label="P · Plan" value={plan} onChange={setPlan} rows={5} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Entry · CPOE</CardTitle>
              <CardDescription>Search catalog · quick sets</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input placeholder="Search order (e.g. CBC, Chest X-ray, Amoxicillin)…" />
                <Button size="sm">Add</Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {["Sepsis Bundle", "Chest Pain Rule-out", "DKA Bundle", "COPD Exacerbation"].map((s) => (
                  <button
                    key={s}
                    className="rounded-md border border-border/60 bg-surface-raised/40 px-3 py-2 text-start text-sm hover:bg-surface-raised"
                  >
                    <div className="font-medium">{s}</div>
                    <div className="text-2xs text-muted-foreground">Quick set · 5-7 orders</div>
                  </button>
                ))}
              </div>
              <Separator />
              <div>
                <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                  Pending orders (3)
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { name: "Chest X-Ray PA/Lateral", type: "Imaging", status: "Sent" },
                    { name: "CBC + BMP + Blood Culture ×2", type: "Lab", status: "Sent" },
                    { name: "Ceftriaxone 1g IV q24h", type: "Med", status: "Pharmacy Verify" },
                  ].map((o) => (
                    <div
                      key={o.name}
                      className="flex items-center justify-between rounded-md border border-border/60 bg-surface-raised/40 p-2.5"
                    >
                      <div>
                        <div className="text-sm">{o.name}</div>
                        <div className="text-2xs text-muted-foreground">{o.type}</div>
                      </div>
                      <Badge variant="info" size="sm">
                        {o.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Problem List</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5 text-sm">
              {["Type 2 Diabetes Mellitus", "Essential Hypertension", "Pneumonia (active)"].map((p) => (
                <div key={p} className="flex items-center justify-between rounded-md border border-border/60 bg-surface-raised/40 p-2">
                  <span>{p}</span>
                  <Badge variant="muted" size="sm">
                    ICD-11
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5 text-sm">
              <div className="rounded-md border border-destructive/40 bg-destructive/5 p-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-destructive">Penicillin</span>
                  <Badge variant="destructive" size="sm">
                    Severe
                  </Badge>
                </div>
                <div className="text-2xs text-muted-foreground">Rash + swelling</div>
              </div>
              <div className="rounded-md border border-warning/40 bg-warning/5 p-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-warning">Sulfa drugs</span>
                  <Badge variant="warning" size="sm">
                    Moderate
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5 text-sm">
              {["Metformin 1g PO BID", "Lisinopril 10mg PO daily", "Atorvastatin 20mg PO qHS"].map((m) => (
                <div key={m} className="flex items-center justify-between rounded-md border border-border/60 bg-surface-raised/40 p-2">
                  <span>{m}</span>
                  <Badge variant="muted" size="sm">
                    Home
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SoapField({ label, value, onChange, rows = 2 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <Label className="mb-1 block text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full rounded-md border border-input bg-surface-raised px-3 py-2 text-sm font-normal text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}
