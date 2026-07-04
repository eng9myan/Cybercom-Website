"use client";
import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn, formatNumber } from "@/lib/utils";

const AXIS_TICK = { fill: "hsl(215 15% 65%)", fontSize: 11 };
const GRID_STROKE = "hsl(220 14% 18%)";

function TooltipShell({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface-overlay p-2 text-xs shadow-raised">
      {label ? <div className="mb-1 font-medium text-foreground">{label}</div> : null}
      <div className="grid gap-0.5">
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-sm" style={{ background: p.color ?? p.fill }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-medium text-foreground tabular-nums">
              {typeof p.value === "number" ? formatNumber(p.value) : p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface TrendPoint {
  [key: string]: string | number;
}

export function LineTrend({
  data,
  xKey,
  series,
  height = 220,
  className,
}: {
  data: TrendPoint[];
  xKey: string;
  series: { key: string; name?: string; color: string }[];
  height?: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={AXIS_TICK} />
          <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} width={40} />
          <Tooltip content={<TooltipShell />} cursor={{ stroke: "hsl(215 15% 40%)" }} />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11, color: "hsl(215 15% 65%)" }}
            align="right"
            verticalAlign="top"
          />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name ?? s.key}
              stroke={s.color}
              strokeWidth={2}
              dot={{ r: 2, fill: s.color, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AreaTrend({
  data,
  xKey,
  series,
  height = 220,
  className,
}: {
  data: TrendPoint[];
  xKey: string;
  series: { key: string; name?: string; color: string }[];
  height?: number;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={AXIS_TICK} />
          <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} width={40} />
          <Tooltip content={<TooltipShell />} cursor={{ stroke: "hsl(215 15% 40%)" }} />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11, color: "hsl(215 15% 65%)" }}
            align="right"
            verticalAlign="top"
          />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name ?? s.key}
              stroke={s.color}
              strokeWidth={2}
              fill={`url(#grad-${s.key})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarComparison({
  data,
  xKey,
  series,
  height = 220,
  className,
  layout = "horizontal",
}: {
  data: TrendPoint[];
  xKey: string;
  series: { key: string; name?: string; color: string }[];
  height?: number;
  className?: string;
  layout?: "horizontal" | "vertical";
}) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} layout={layout}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
          {layout === "horizontal" ? (
            <>
              <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={AXIS_TICK} />
              <YAxis tickLine={false} axisLine={false} tick={AXIS_TICK} width={40} />
            </>
          ) : (
            <>
              <XAxis type="number" tickLine={false} axisLine={false} tick={AXIS_TICK} />
              <YAxis dataKey={xKey} type="category" tickLine={false} axisLine={false} tick={AXIS_TICK} width={120} />
            </>
          )}
          <Tooltip content={<TooltipShell />} cursor={{ fill: "hsl(220 14% 18% / 0.4)" }} />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11, color: "hsl(215 15% 65%)" }}
            align="right"
            verticalAlign="top"
          />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name ?? s.key}
              fill={s.color}
              radius={[6, 6, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonutSplit({
  data,
  height = 220,
  className,
  colors,
  centerLabel,
  centerValue,
}: {
  data: { name: string; value: number }[];
  height?: number;
  className?: string;
  colors?: string[];
  centerLabel?: string;
  centerValue?: string | number;
}) {
  const palette =
    colors ?? ["#3B82F6", "#F97316", "#22C55E", "#A855F7", "#EAB308", "#EF4444", "#06B6D4"];
  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip content={<TooltipShell />} />
          <Pie
            data={data}
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            stroke="hsl(220 20% 6%)"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={palette[i % palette.length]} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11, color: "hsl(215 15% 65%)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerLabel || centerValue !== undefined ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {centerValue !== undefined ? (
            <div className="text-2xl font-semibold tabular-nums text-foreground">{centerValue}</div>
          ) : null}
          {centerLabel ? (
            <div className="text-2xs uppercase tracking-wide text-muted-foreground">{centerLabel}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
