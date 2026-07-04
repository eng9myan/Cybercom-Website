"use client";
import * as React from "react";
import { Brain, Plus, Sparkles, X } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { drugInteractionResults } from "@/mock/clinic";
import { DRUGS } from "@/mock/names";
import { cn } from "@/lib/utils";

export function InteractionsModule() {
  const [drugs, setDrugs] = React.useState<string[]>(["Warfarin 5mg", "Aspirin 100mg", "Sertraline 50mg"]);
  const [pending, setPending] = React.useState("");

  const results = drugInteractionResults.filter(
    (r) => drugs.includes(r.drugA) && drugs.includes(r.drugB)
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Drug Interaction Checker"
        subtitle="Enter 2+ drugs · severity matrix output"
        icon={Brain}
        accent="pharmacy"
        badges={[{ label: "New", variant: "info" }]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Medications</CardTitle>
            <CardDescription>{drugs.length} loaded</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add drug…"
                value={pending}
                onChange={(e) => setPending(e.target.value)}
              />
              <Button
                size="sm"
                onClick={() => {
                  if (pending.trim()) {
                    setDrugs((prev) => [...prev, pending.trim()]);
                    setPending("");
                  }
                }}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DRUGS.slice(0, 6).map((d) => (
                <button
                  key={d.name}
                  className="rounded-md border border-border/60 bg-surface-raised/40 px-2 py-0.5 text-2xs hover:bg-surface-raised"
                  onClick={() => setDrugs((prev) => (prev.includes(d.name) ? prev : [...prev, d.name]))}
                >
                  {d.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              {drugs.map((d) => (
                <div key={d} className="flex items-center justify-between rounded-md border border-border/60 bg-surface-raised/40 p-2 text-sm">
                  {d}
                  <button
                    onClick={() => setDrugs((prev) => prev.filter((x) => x !== d))}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>Findings</CardTitle>
              <CardDescription>Ranked by severity</CardDescription>
            </div>
            <Badge
              variant={results.some((r) => r.severity === "Major") ? "destructive" : results.length ? "warning" : "success"}
              size="sm"
            >
              <Sparkles className="me-1 h-2.5 w-2.5" />
              {results.length} interaction{results.length === 1 ? "" : "s"}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {results.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                No known interactions.
              </div>
            ) : (
              results.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-md border p-3",
                    r.severity === "Major" && "border-destructive/40 bg-destructive/5",
                    r.severity === "Moderate" && "border-warning/40 bg-warning/5",
                    r.severity === "Minor" && "border-info/40 bg-info/5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {r.drugA} <span className="text-muted-foreground">↔</span> {r.drugB}
                    </div>
                    <Badge
                      variant={r.severity === "Major" ? "destructive" : r.severity === "Moderate" ? "warning" : "info"}
                      size="sm"
                    >
                      {r.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.mechanism}</p>
                  <p className="mt-1 text-xs text-foreground">
                    <span className="font-medium">Recommendation: </span>
                    {r.recommendation}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
