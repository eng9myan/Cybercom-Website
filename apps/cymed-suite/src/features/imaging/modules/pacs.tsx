"use client";
import * as React from "react";
import { Ruler, Move, PenLine, ZoomIn, ZoomOut, RotateCw, ArrowLeftRight, Radiation, ScreenShareOff } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TOOLS = [
  { id: "zoomin", icon: ZoomIn, label: "Zoom in" },
  { id: "zoomout", icon: ZoomOut, label: "Zoom out" },
  { id: "pan", icon: Move, label: "Pan" },
  { id: "window", icon: ArrowLeftRight, label: "Window/Level" },
  { id: "rotate", icon: RotateCw, label: "Rotate" },
  { id: "measure", icon: Ruler, label: "Measure" },
  { id: "annotate", icon: PenLine, label: "Annotate" },
];

export function PacsViewerModule() {
  const [tool, setTool] = React.useState("pan");

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="DICOM / PACS Viewer"
        subtitle="RAD-19003 · CT Chest w/o contrast · 128 slices"
        icon={Radiation}
        accent="imaging"
        badges={[{ label: "STAT", variant: "destructive" }]}
        actions={<Button size="sm" variant="outline">Report</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-[220px_1fr_260px]">
        {/* Series */}
        <Card>
          <CardContent className="flex flex-col gap-2 p-3">
            <div className="text-2xs font-medium uppercase text-muted-foreground">Series</div>
            {["Localizer (3)", "Axial · lung (128)", "Axial · mediastinum (128)", "Coronal MPR (60)"].map((s, i) => (
              <button
                key={s}
                className={cn(
                  "rounded-md border p-2 text-start text-xs transition-colors",
                  i === 1 ? "border-primary/40 bg-primary/10 text-foreground" : "border-border/60 bg-surface-raised/40 hover:bg-surface-raised"
                )}
              >
                {s}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Viewport */}
        <Card>
          <CardContent className="p-0">
            <div className="border-b border-border/60 bg-surface-raised/40 p-2">
              <div className="flex flex-wrap items-center gap-1">
                {TOOLS.map((t) => (
                  <Button
                    key={t.id}
                    variant={tool === t.id ? "default" : "ghost"}
                    size="iconSm"
                    onClick={() => setTool(t.id)}
                    title={t.label}
                  >
                    <t.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-black">
              <div className="absolute inset-4 rounded-md border border-white/10 bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
                {/* Fake CT slice pattern */}
                <div className="absolute inset-[10%] rounded-full bg-neutral-700/70 blur-2xl" />
                <div className="absolute inset-[22%] rounded-full bg-neutral-500/60 blur-xl" />
                <div className="absolute left-[45%] top-[40%] h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-3 font-mono text-2xs text-white/70">
                <div className="flex justify-between">
                  <div>
                    <div>Ahmed Al-Zahra</div>
                    <div>MRN-500000</div>
                  </div>
                  <div className="text-end">
                    <div>CT · Chest w/o</div>
                    <div>2026-07-04</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>WL: 40 / WW: 400</div>
                  <div>Slice 64/128</div>
                </div>
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                <ScreenShareOff className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Findings + Prior */}
        <div className="flex flex-col gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="text-2xs font-medium uppercase text-muted-foreground">AI Findings</div>
              <div className="mt-2 rounded-md border border-warning/40 bg-warning/5 p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pulmonary nodule</span>
                  <Badge variant="warning" size="sm">Moderate</Badge>
                </div>
                <div className="text-2xs text-muted-foreground">8mm · Right lower lobe</div>
              </div>
              <div className="mt-2 rounded-md border border-info/40 bg-info/5 p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Small pleural effusion</span>
                  <Badge variant="info" size="sm">Info</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-2xs font-medium uppercase text-muted-foreground">Prior Studies</div>
              <div className="mt-2 flex flex-col gap-1.5 text-xs">
                <div className="rounded border border-border/60 bg-surface-raised/40 p-2">
                  CXR · 2026-02-14
                </div>
                <div className="rounded border border-border/60 bg-surface-raised/40 p-2">
                  CT Chest · 2025-08-11
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
