import type { LucideIcon } from "lucide-react";
import {
  Ambulance,
  BadgeCheck,
  Briefcase,
  ChefHat,
  ClipboardCheck,
  Contact,
  CreditCard,
  HeartPulse,
  Microscope,
  Pill,
  Radiation,
  ShieldAlert,
  Stethoscope,
  Truck,
  Users,
  Utensils,
  Wrench,
} from "lucide-react";

export interface RoleDef {
  id: string;
  title: string;
  short: string;
  department: string;
  icon: LucideIcon;
  color: string; // Tailwind bg utility
  scope: "clinical" | "operations" | "erp" | "admin" | "guest";
  description: string;
}

export const ROLES: RoleDef[] = [
  {
    id: "admin",
    title: "System Administrator",
    short: "Admin",
    department: "IT",
    icon: ShieldAlert,
    color: "bg-primary/20 text-primary",
    scope: "admin",
    description: "Full access across every module.",
  },
  {
    id: "physician",
    title: "Physician",
    short: "MD",
    department: "Medical",
    icon: Stethoscope,
    color: "bg-info/20 text-info",
    scope: "clinical",
    description: "Consult, prescribe, sign notes, order labs/imaging.",
  },
  {
    id: "nurse",
    title: "Registered Nurse",
    short: "RN",
    department: "Nursing",
    icon: HeartPulse,
    color: "bg-success/20 text-success",
    scope: "clinical",
    description: "Vitals, MAR, nursing notes, triage, handover.",
  },
  {
    id: "reception",
    title: "Reception",
    short: "Recep",
    department: "Front Desk",
    icon: Contact,
    color: "bg-accent/20 text-accent",
    scope: "operations",
    description: "Registration, appointments, insurance intake.",
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    short: "Pharm",
    department: "Pharmacy",
    icon: Pill,
    color: "bg-product-pharmacy/20 text-product-pharmacy",
    scope: "clinical",
    description: "Verify, dispense, control substances, DUR.",
  },
  {
    id: "lab-tech",
    title: "Lab Technologist",
    short: "MT",
    department: "Laboratory",
    icon: Microscope,
    color: "bg-product-laboratory/20 text-product-laboratory",
    scope: "clinical",
    description: "Sample handling, LIS entry, QC.",
  },
  {
    id: "radiologist",
    title: "Radiologist",
    short: "Rad",
    department: "Imaging",
    icon: Radiation,
    color: "bg-product-imaging/20 text-product-imaging",
    scope: "clinical",
    description: "Read studies, sign reports, teleradiology.",
  },
  {
    id: "finance",
    title: "Finance Officer",
    short: "Fin",
    department: "Finance",
    icon: CreditCard,
    color: "bg-warning/20 text-warning",
    scope: "erp",
    description: "GL, AR/AP, insurance claims, cash handling.",
  },
  {
    id: "hr",
    title: "HR Officer",
    short: "HR",
    department: "Human Resources",
    icon: Users,
    color: "bg-primary/20 text-primary",
    scope: "erp",
    description: "Employees, payroll, attendance, leave.",
  },
  {
    id: "operations",
    title: "Operations Manager",
    short: "Ops",
    department: "Operations",
    icon: Briefcase,
    color: "bg-info/20 text-info",
    scope: "operations",
    description: "Inventory, procurement, fleet, maintenance.",
  },
  {
    id: "it",
    title: "IT Technician",
    short: "IT",
    department: "IT",
    icon: Wrench,
    color: "bg-muted-foreground/20 text-muted-foreground",
    scope: "operations",
    description: "Analyzer interfaces, integrations, equipment.",
  },
  {
    id: "cashier",
    title: "Cashier",
    short: "Csh",
    department: "Store",
    icon: BadgeCheck,
    color: "bg-success/20 text-success",
    scope: "operations",
    description: "POS, receipts, payments (CyShop / Pharmacy).",
  },
  {
    id: "chef",
    title: "Head Chef",
    short: "Chef",
    department: "Kitchen",
    icon: ChefHat,
    color: "bg-accent/20 text-accent",
    scope: "operations",
    description: "KDS, menu, kitchen queue (CyShop).",
  },
  {
    id: "waiter",
    title: "Waiter / Server",
    short: "Waiter",
    department: "Floor",
    icon: Utensils,
    color: "bg-muted/40 text-foreground",
    scope: "operations",
    description: "Tables, orders, delivery handoff (CyShop).",
  },
];

export const ROLES_BY_ID: Record<string, RoleDef> = Object.fromEntries(
  ROLES.map((r) => [r.id, r])
);

export function getRole(id: string): RoleDef | undefined {
  return ROLES_BY_ID[id];
}

/**
 * Check if a role is permitted for a module.
 * If module.roles is undefined, treat as public within the app.
 */
export function isRoleAllowed(moduleRoles: readonly string[] | undefined, roleId: string): boolean {
  if (!moduleRoles || moduleRoles.length === 0) return true;
  return moduleRoles.includes(roleId);
}
