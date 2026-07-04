"use client";
import { useState } from "react";

export type ModuleCategory = "clinical" | "erp" | "ai" | "operations";

export interface ProductModule {
  name: string;
  category: ModuleCategory;
  desc: string;
  roles: string[];
}

const CAT_STYLE: Record<ModuleCategory, { label: string; pill: string }> = {
  clinical:   { label: "Clinical",    pill: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  erp:        { label: "ERP",         pill: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  ai:         { label: "AI",          pill: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  operations: { label: "Operations",  pill: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
};

type Tab = "all" | ModuleCategory;

export function ModuleExplorer({ modules }: { modules: ProductModule[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const cats = (["clinical", "erp", "ai", "operations"] as ModuleCategory[]).filter(
    c => modules.some(m => m.category === c)
  );

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All Modules", count: modules.length },
    ...cats.map(c => ({
      key: c as Tab,
      label: CAT_STYLE[c].label,
      count: modules.filter(m => m.category === c).length,
    })),
  ];

  const filtered = activeTab === "all" ? modules : modules.filter(m => m.category === activeTab);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
              activeTab === tab.key
                ? "bg-cy-orange/15 border-cy-orange/40 text-cy-orange"
                : "bg-cy-glass-bg border-cy-glass-border text-cy-gray-400 hover:text-white hover:border-cy-glass-bg-hover"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs opacity-55">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Module grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(mod => {
          const s = CAT_STYLE[mod.category];
          return (
            <div key={mod.name} className="glass-card p-5 rounded-xl flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-heading font-semibold text-white leading-snug">{mod.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 font-medium ${s.pill}`}>
                  {s.label}
                </span>
              </div>
              <p className="text-xs text-cy-gray-400 leading-relaxed flex-1">{mod.desc}</p>
              {mod.roles.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {mod.roles.map(role => (
                    <span key={role} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-cy-gray-400 border border-cy-glass-border">
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
