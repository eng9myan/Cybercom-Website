"use client";
import * as React from "react";
import { ROLES, ROLES_BY_ID } from "@/config/roles";

interface RoleContextValue {
  roleId: string;
  setRoleId: (id: string) => void;
}

const RoleContext = React.createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [roleId, setRoleId] = React.useState<string>("admin");

  // Persist selected role locally so switching survives navigation.
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem("cybercom.role");
      if (stored && ROLES_BY_ID[stored]) setRoleId(stored);
    } catch {
      // ignore
    }
  }, []);

  const update = React.useCallback((id: string) => {
    setRoleId(id);
    try {
      window.localStorage.setItem("cybercom.role", id);
    } catch {
      // ignore
    }
  }, []);

  const value = React.useMemo(() => ({ roleId, setRoleId: update }), [roleId, update]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = React.useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
}

export function useCurrentRole() {
  const { roleId } = useRole();
  return ROLES_BY_ID[roleId] ?? ROLES[0];
}
