"use client";
import { Microscope } from "lucide-react";
import { PageHeader } from "@/components/data/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LAB_TESTS } from "@/mock/names";

const analytes = [
  { code: "WBC", value: 8.2, ref: "4.0-11.0", unit: "×10⁹/L", flag: null },
  { code: "RBC", value: 4.6, ref: "4.5-5.9", unit: "×10¹²/L", flag: null },
  { code: "HGB", value: 12.3, ref: "13.0-17.0", unit: "g/dL", flag: "L" },
  { code: "HCT", value: 38.4, ref: "40-52", unit: "%", flag: "L" },
  { code: "PLT", value: 245, ref: "150-400", unit: "×10⁹/L", flag: null },
  { code: "MCV", value: 84, ref: "80-96", unit: "fL", flag: null },
  { code: "NEUT%", value: 66, ref: "40-70", unit: "%", flag: null },
  { code: "LYMPH%", value: 24, ref: "20-40", unit: "%", flag: null },
];

const departments = ["Hematology", "Biochemistry", "Microbiology", "Serology"];

export function LisModule() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="LIS Core"
        subtitle="Result entry · reference ranges · abnormal flags"
        icon={Microscope}
        accent="laboratory"
      />

      <Tabs defaultValue="hematology">
        <TabsList>
          {departments.map((d) => (
            <TabsTrigger key={d} value={d.toLowerCase()}>{d}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="hematology">
          <Card>
            <CardHeader>
              <CardTitle>CBC · L-70012</CardTitle>
              <CardDescription>Auto-verified results appear in green</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {analytes.map((a) => (
                  <div
                    key={a.code}
                    className={
                      "rounded-md border p-3 " +
                      (a.flag === "H" ? "border-destructive/40 bg-destructive/5" : a.flag === "L" ? "border-warning/40 bg-warning/5" : "border-border/60 bg-surface-raised/40")
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-medium uppercase text-muted-foreground">{a.code}</span>
                      {a.flag ? (
                        <Badge variant={a.flag === "H" ? "destructive" : "warning"} size="sm">
                          {a.flag}
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">✓</Badge>
                      )}
                    </div>
                    <div className="mt-1 text-lg font-semibold tabular-nums">
                      {a.value}
                      <span className="ms-1 text-xs font-normal text-muted-foreground">{a.unit}</span>
                    </div>
                    <div className="text-2xs text-muted-foreground">Ref {a.ref}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {departments.slice(1).map((d) => (
          <TabsContent key={d} value={d.toLowerCase()}>
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                {d} panel · mock placeholder.
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
