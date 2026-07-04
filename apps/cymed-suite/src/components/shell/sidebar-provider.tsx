"use client";
import * as React from "react";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggle: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    try {
      const v = window.localStorage.getItem("cybercom.sidebar.collapsed");
      if (v !== null) setCollapsed(v === "1");
    } catch {}
  }, []);

  const update = React.useCallback((v: boolean) => {
    setCollapsed(v);
    try {
      window.localStorage.setItem("cybercom.sidebar.collapsed", v ? "1" : "0");
    } catch {}
  }, []);

  const value = React.useMemo(
    () => ({ collapsed, setCollapsed: update, toggle: () => update(!collapsed) }),
    [collapsed, update]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
}
