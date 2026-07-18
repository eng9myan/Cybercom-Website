import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Ambulance,
  BadgeCheck,
  Beaker,
  Bed,
  Bell,
  BookOpen,
  Boxes,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  CheckSquare,
  ChefHat,
  ClipboardCheck,
  ClipboardList,
  Cog,
  Contact,
  CreditCard,
  Database,
  Droplet,
  FileSignature,
  FileText,
  Files,
  FlaskConical,
  Gauge,
  HeartPulse,
  Handshake,
  Home,
  Kanban,
  LayoutDashboard,
  LineChart,
  Mail,
  Megaphone,
  MessageSquare,
  Microscope,
  Package,
  Palette,
  PhoneCall,
  PieChart,
  Pill,
  Radiation,
  Receipt,
  Scale,
  Scan,
  Scissors,
  ShieldAlert,
  ShoppingCart,
  Stethoscope,
  Store,
  Syringe,
  Table2,
  Tag,
  Target,
  Ticket,
  Truck,
  Users,
  UserPlus,
  Utensils,
  Warehouse,
  Wrench,
  Video,
  Zap,
} from "lucide-react";

export type ModuleCategory = "clinical" | "operations" | "erp" | "ai" | "reports" | "settings";

export interface ModuleDef {
  slug: string;
  title: string;
  category: ModuleCategory;
  icon: LucideIcon;
  description?: string;
  /** Roles allowed to see this module in the sidebar. */
  roles?: readonly string[];
  /** Optional badge indicator on nav item. */
  badge?: "new" | "beta" | "pro" | number;
  /** If true, render with the generic module scaffold (data table + KPIs). */
  scaffold?: boolean;
}

export interface ProductDef {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string; // Tailwind color key inside `product.*`
  subdomain: string;
  hero: string;
  modules: ModuleDef[];
}

const roles = {
  admin: ["admin"],
  clinician: ["admin", "physician", "nurse"],
  nurse: ["admin", "nurse"],
  physician: ["admin", "physician"],
  reception: ["admin", "reception"],
  pharmacist: ["admin", "pharmacist"],
  labTech: ["admin", "lab-tech"],
  radiologist: ["admin", "radiologist"],
  finance: ["admin", "finance"],
  hr: ["admin", "hr"],
  ops: ["admin", "operations"],
  it: ["admin", "it"],
  cashier: ["admin", "cashier"],
  chef: ["admin", "chef", "operations"],
  waiter: ["admin", "waiter"],
} as const;

/* ------------------------------- HOSPITAL ------------------------------- */

const hospital: ProductDef = {
  slug: "hospital",
  title: "CyMed Hospital",
  subtitle: "Complete Hospital Management System",
  icon: Building2,
  accent: "hospital",
  subdomain: "cymed.cy-com.com/hospital",
  hero: "Bed to Board — full inpatient control plane",
  modules: [
    { slug: "dashboard", title: "Dashboard", category: "clinical", icon: LayoutDashboard, roles: roles.admin },
    { slug: "admission-adt", title: "Admission & ADT", category: "clinical", icon: Bed, roles: roles.clinician },
    { slug: "emergency", title: "Emergency Department", category: "clinical", icon: Ambulance, roles: roles.clinician },
    { slug: "emr", title: "EMR & CPOE", category: "clinical", icon: FileText, roles: roles.clinician },
    { slug: "nurse-station", title: "Nurse Station", category: "clinical", icon: HeartPulse, roles: roles.nurse },
    { slug: "or", title: "OR Management", category: "clinical", icon: Scissors, roles: roles.physician, scaffold: true },
    { slug: "icu", title: "ICU / Virtual ICU", category: "clinical", icon: Activity, roles: roles.clinician, scaffold: true },
    { slug: "inpatient-pharmacy", title: "Pharmacy (Inpatient)", category: "clinical", icon: Pill, roles: roles.pharmacist, scaffold: true },
    { slug: "blood-bank", title: "Blood Bank", category: "clinical", icon: Droplet, roles: roles.clinician, scaffold: true },
    { slug: "dietary", title: "Dietary", category: "clinical", icon: Utensils, roles: roles.ops, scaffold: true },
    { slug: "finance-rcm", title: "Finance & Revenue Cycle", category: "erp", icon: Receipt, roles: roles.finance, scaffold: true },
    { slug: "accounting", title: "Accounting (AP/AR)", category: "erp", icon: BookOpen, roles: roles.finance, scaffold: true },
    { slug: "fixed-assets", title: "Fixed Assets", category: "erp", icon: Warehouse, roles: roles.finance, scaffold: true },
    { slug: "hr", title: "HR & Staff Management", category: "erp", icon: Users, roles: roles.hr, scaffold: true },
    { slug: "payroll", title: "Payroll (WPS)", category: "erp", icon: CreditCard, roles: roles.hr, scaffold: true },
    { slug: "attendance", title: "Attendance & Leave", category: "erp", icon: CalendarClock, roles: roles.hr, scaffold: true },
    { slug: "inventory", title: "Medical Inventory", category: "erp", icon: Boxes, roles: roles.ops, scaffold: true },
    { slug: "procurement", title: "Procurement", category: "erp", icon: ShoppingCart, roles: roles.ops, scaffold: true },
    { slug: "reports", title: "Reports & Dashboards", category: "reports", icon: PieChart, roles: roles.admin, scaffold: true },
    { slug: "ai-scribe", title: "AI Scribe", category: "ai", icon: FileSignature, roles: roles.clinician, badge: "new" },
    { slug: "sepsis-alert", title: "Sepsis Alert (SOFA/NEWS2)", category: "ai", icon: ShieldAlert, roles: roles.clinician, badge: "new", scaffold: true },
    { slug: "icu-deterioration", title: "ICU Deterioration Predict", category: "ai", icon: Zap, roles: roles.clinician, badge: "beta", scaffold: true },
  ],
};

/* -------------------------------- CLINIC -------------------------------- */

const clinic: ProductDef = {
  slug: "clinic",
  title: "CyMed Clinic",
  subtitle: "Outpatient clinic operations",
  icon: Stethoscope,
  accent: "clinic",
  subdomain: "cymed.cy-com.com/clinic",
  hero: "Reception to Referral — complete OP workflow",
  modules: [
    { slug: "dashboard", title: "Dashboard", category: "clinical", icon: LayoutDashboard, roles: roles.admin },
    { slug: "reception", title: "Reception", category: "clinical", icon: Contact, roles: roles.reception },
    { slug: "appointments", title: "Appointments", category: "clinical", icon: Calendar, roles: roles.reception },
    { slug: "triage", title: "Triage", category: "clinical", icon: ClipboardCheck, roles: roles.nurse },
    { slug: "consultations", title: "Consultations", category: "clinical", icon: Stethoscope, roles: roles.physician },
    { slug: "telemedicine", title: "Telemedicine", category: "clinical", icon: Video, roles: roles.physician, scaffold: true },
    { slug: "insurance", title: "Insurance Verification", category: "clinical", icon: BadgeCheck, roles: roles.finance, scaffold: true },
    { slug: "lab-orders", title: "Lab Orders & Results", category: "clinical", icon: Beaker, roles: roles.clinician, scaffold: true },
    { slug: "referrals", title: "Referral Management", category: "clinical", icon: Handshake, roles: roles.reception, scaffold: true },
    { slug: "cds", title: "Clinical Decision Support", category: "clinical", icon: Brain, roles: roles.clinician, badge: "beta", scaffold: true },
    { slug: "patient-portal", title: "Patient Portal", category: "clinical", icon: UserPlus, roles: roles.admin, scaffold: true },
    { slug: "billing", title: "Finance & Billing", category: "erp", icon: Receipt, roles: roles.finance, scaffold: true },
    { slug: "accounting", title: "Accounting (AP/AR)", category: "erp", icon: BookOpen, roles: roles.finance, scaffold: true },
    { slug: "hr", title: "HR & Staff Management", category: "erp", icon: Users, roles: roles.hr, scaffold: true },
    { slug: "payroll", title: "Payroll (WPS)", category: "erp", icon: CreditCard, roles: roles.hr, scaffold: true },
    { slug: "attendance", title: "Attendance & Leave", category: "erp", icon: CalendarClock, roles: roles.hr, scaffold: true },
    { slug: "inventory", title: "Clinical Supply Inventory", category: "erp", icon: Boxes, roles: roles.ops, scaffold: true },
    { slug: "procurement", title: "Procurement", category: "erp", icon: ShoppingCart, roles: roles.ops, scaffold: true },
    { slug: "reports", title: "Reports & Dashboards", category: "reports", icon: PieChart, roles: roles.admin, scaffold: true },
    { slug: "ai-scribe", title: "AI Scribe", category: "ai", icon: FileSignature, roles: roles.clinician, badge: "new" },
    { slug: "no-show-predict", title: "No-Show Prediction", category: "ai", icon: Target, roles: roles.reception, badge: "beta", scaffold: true },
  ],
};

/* ------------------------------- PHARMACY ------------------------------- */

const pharmacy: ProductDef = {
  slug: "pharmacy",
  title: "CyMed Pharmacy",
  subtitle: "Retail + hospital pharmacy",
  icon: Pill,
  accent: "pharmacy",
  subdomain: "cymed.cy-com.com/pharmacy",
  hero: "Prescription in, dispensed out — fully audited",
  modules: [
    { slug: "dashboard", title: "Dashboard", category: "operations", icon: LayoutDashboard, roles: roles.admin },
    { slug: "pos", title: "POS & Dispensing", category: "operations", icon: Store, roles: roles.pharmacist },
    { slug: "verification", title: "Prescription Verification", category: "operations", icon: CheckSquare, roles: roles.pharmacist },
    { slug: "interactions", title: "Drug Interaction Checker", category: "operations", icon: Brain, roles: roles.pharmacist, badge: "new" },
    { slug: "narcotics", title: "Narcotic & Controlled Log", category: "operations", icon: ShieldAlert, roles: roles.pharmacist, scaffold: true },
    { slug: "eprescription", title: "E-Prescription Integration", category: "operations", icon: FileSignature, roles: roles.pharmacist, scaffold: true },
    { slug: "clinical-review", title: "Clinical Review (DUR)", category: "operations", icon: ClipboardList, roles: roles.pharmacist, scaffold: true },
    { slug: "inventory", title: "Drug Inventory", category: "operations", icon: Boxes, roles: roles.ops, scaffold: true },
    { slug: "procurement", title: "Procurement", category: "erp", icon: ShoppingCart, roles: roles.ops, scaffold: true },
    { slug: "billing", title: "Pharmacy Billing", category: "erp", icon: Receipt, roles: roles.finance, scaffold: true },
    { slug: "hr", title: "HR & Payroll", category: "erp", icon: Users, roles: roles.hr, scaffold: true },
    { slug: "finance", title: "Finance", category: "erp", icon: BookOpen, roles: roles.finance, scaffold: true },
    { slug: "reports", title: "Reports", category: "reports", icon: PieChart, roles: roles.admin, scaffold: true },
  ],
};

/* ------------------------------ LABORATORY ------------------------------ */

const laboratory: ProductDef = {
  slug: "laboratory",
  title: "CyMed Laboratory",
  subtitle: "Laboratory Information System",
  icon: FlaskConical,
  accent: "laboratory",
  subdomain: "cymed.cy-com.com/laboratory",
  hero: "Order to verified result — QC baked in",
  modules: [
    { slug: "dashboard", title: "Dashboard", category: "clinical", icon: LayoutDashboard, roles: roles.admin },
    { slug: "orders", title: "Test Orders", category: "clinical", icon: ClipboardList, roles: roles.labTech },
    { slug: "samples", title: "Sample Tracking", category: "clinical", icon: Scan, roles: roles.labTech },
    { slug: "lis", title: "LIS Core", category: "clinical", icon: Microscope, roles: roles.labTech },
    { slug: "auto-verify", title: "Auto-Verification", category: "clinical", icon: BadgeCheck, roles: roles.labTech, badge: "beta", scaffold: true },
    { slug: "qc", title: "QC Management", category: "clinical", icon: Gauge, roles: roles.labTech, scaffold: true },
    { slug: "microbiology", title: "Microbiology", category: "clinical", icon: Beaker, roles: roles.labTech, scaffold: true },
    { slug: "blood-bank", title: "Blood Bank", category: "clinical", icon: Droplet, roles: roles.labTech, scaffold: true },
    { slug: "analyzers", title: "Analyzer Interface", category: "clinical", icon: Cog, roles: roles.it, scaffold: true },
    { slug: "delivery", title: "Result Delivery", category: "clinical", icon: Mail, roles: roles.labTech, scaffold: true },
    { slug: "billing", title: "Test Billing", category: "erp", icon: Receipt, roles: roles.finance, scaffold: true },
    { slug: "inventory", title: "Reagent Inventory", category: "erp", icon: Boxes, roles: roles.ops, scaffold: true },
    { slug: "procurement", title: "Procurement", category: "erp", icon: ShoppingCart, roles: roles.ops, scaffold: true },
    { slug: "hr", title: "HR & Payroll", category: "erp", icon: Users, roles: roles.hr, scaffold: true },
    { slug: "finance", title: "Finance", category: "erp", icon: BookOpen, roles: roles.finance, scaffold: true },
    { slug: "reports", title: "Reports", category: "reports", icon: PieChart, roles: roles.admin, scaffold: true },
  ],
};

/* -------------------------------- IMAGING ------------------------------- */

const imaging: ProductDef = {
  slug: "imaging",
  title: "CyMed Imaging",
  subtitle: "Radiology Information System (RIS)",
  icon: Scan,
  accent: "imaging",
  subdomain: "cymed.cy-com.com/imaging",
  hero: "Modality to structured report — SLA tracked",
  modules: [
    { slug: "dashboard", title: "Dashboard", category: "clinical", icon: LayoutDashboard, roles: roles.admin },
    { slug: "worklist", title: "RIS Worklist", category: "clinical", icon: ClipboardList, roles: roles.radiologist },
    { slug: "scheduling", title: "Scheduling", category: "clinical", icon: Calendar, roles: roles.reception },
    { slug: "pacs", title: "DICOM / PACS Viewer", category: "clinical", icon: Radiation, roles: roles.radiologist },
    { slug: "reporting", title: "Structured Reporting", category: "clinical", icon: FileText, roles: roles.radiologist, scaffold: true },
    { slug: "ai-analysis", title: "AI Image Analysis", category: "ai", icon: Brain, roles: roles.radiologist, badge: "new", scaffold: true },
    { slug: "teleradiology", title: "Teleradiology", category: "clinical", icon: Video, roles: roles.radiologist, scaffold: true },
    { slug: "three-d", title: "3D Visualization", category: "clinical", icon: Palette, roles: roles.radiologist, badge: "pro", scaffold: true },
    { slug: "contrast-safety", title: "Contrast & Safety", category: "clinical", icon: ShieldAlert, roles: roles.radiologist, scaffold: true },
    { slug: "assets", title: "Equipment Registry", category: "erp", icon: Warehouse, roles: roles.ops, scaffold: true },
    { slug: "maintenance", title: "Maintenance Log", category: "erp", icon: Wrench, roles: roles.ops, scaffold: true },
    { slug: "billing", title: "Imaging Billing", category: "erp", icon: Receipt, roles: roles.finance, scaffold: true },
    { slug: "hr", title: "HR & Payroll", category: "erp", icon: Users, roles: roles.hr, scaffold: true },
    { slug: "finance", title: "Finance", category: "erp", icon: BookOpen, roles: roles.finance, scaffold: true },
    { slug: "reports", title: "Reports", category: "reports", icon: PieChart, roles: roles.admin, scaffold: true },
  ],
};

/* -------------------------------- CYSHOP -------------------------------- */

const cyshop: ProductDef = {
  slug: "cyshop",
  title: "CyShop",
  subtitle: "F&B Point of Sale + Ops",
  icon: ChefHat,
  accent: "cyshop",
  subdomain: "cyshop.cy-com.com",
  hero: "POS, KDS, tables, delivery — one plane",
  modules: [
    { slug: "dashboard", title: "Dashboard", category: "operations", icon: LayoutDashboard, roles: roles.admin },
    { slug: "pos", title: "POS", category: "operations", icon: Store, roles: roles.cashier },
    { slug: "kds", title: "Kitchen Display", category: "operations", icon: ChefHat, roles: roles.chef },
    { slug: "tables", title: "Table Management", category: "operations", icon: Utensils, roles: roles.waiter, scaffold: true },
    { slug: "online-orders", title: "Online Ordering", category: "operations", icon: ShoppingCart, roles: roles.cashier, scaffold: true },
    { slug: "delivery", title: "Delivery", category: "operations", icon: Truck, roles: roles.ops, scaffold: true },
    { slug: "menu", title: "Menu Management", category: "operations", icon: BookOpen, roles: roles.admin, scaffold: true },
    { slug: "loyalty", title: "Loyalty & Rewards", category: "operations", icon: Tag, roles: roles.admin, scaffold: true },
    { slug: "customer-portal", title: "Customer Portal", category: "operations", icon: UserPlus, roles: roles.admin, scaffold: true },
    { slug: "zatca", title: "Finance & ZATCA", category: "erp", icon: Receipt, roles: roles.finance, scaffold: true },
    { slug: "inventory", title: "Real-Time Inventory", category: "erp", icon: Boxes, roles: roles.ops, scaffold: true },
    { slug: "procurement", title: "Procurement", category: "erp", icon: ShoppingCart, roles: roles.ops, scaffold: true },
    { slug: "hr", title: "HR & Payroll", category: "erp", icon: Users, roles: roles.hr, scaffold: true },
    { slug: "attendance", title: "Attendance", category: "erp", icon: CalendarClock, roles: roles.hr, scaffold: true },
    { slug: "crm", title: "CRM", category: "erp", icon: Contact, roles: roles.admin, scaffold: true },
    { slug: "reports", title: "Reports & Dashboards", category: "reports", icon: PieChart, roles: roles.admin, scaffold: true },
  ],
};

/* ---------------------------------- ERP --------------------------------- */

const erp: ProductDef = {
  slug: "erp",
  title: "CyCom ERP",
  subtitle: "Enterprise back-office",
  icon: Briefcase,
  accent: "erp",
  subdomain: "erp.cy-com.com",
  hero: "GL to CMMS — one enterprise plane",
  modules: [
    { slug: "dashboard", title: "Dashboard", category: "operations", icon: LayoutDashboard, roles: roles.admin },
    { slug: "accounting", title: "Accounting", category: "erp", icon: BookOpen, roles: roles.finance },
    { slug: "ap-ar", title: "AP / AR", category: "erp", icon: Receipt, roles: roles.finance },
    { slug: "hr", title: "HR Management", category: "erp", icon: Users, roles: roles.hr, scaffold: true },
    { slug: "payroll", title: "Payroll", category: "erp", icon: CreditCard, roles: roles.hr, scaffold: true },
    { slug: "inventory", title: "Inventory", category: "erp", icon: Boxes, roles: roles.ops, scaffold: true },
    { slug: "procurement", title: "Procurement", category: "erp", icon: ShoppingCart, roles: roles.ops, scaffold: true },
    { slug: "crm", title: "Sales & CRM", category: "operations", icon: Kanban, roles: roles.admin, scaffold: true },
    { slug: "projects", title: "Project Management", category: "operations", icon: Briefcase, roles: roles.admin, scaffold: true },
    { slug: "fleet", title: "Fleet", category: "operations", icon: Truck, roles: roles.ops, scaffold: true },
    { slug: "maintenance", title: "Maintenance (CMMS)", category: "operations", icon: Wrench, roles: roles.ops, scaffold: true },
    { slug: "plm", title: "PLM", category: "operations", icon: Package, roles: roles.ops, scaffold: true },
    { slug: "quality", title: "Quality", category: "operations", icon: BadgeCheck, roles: roles.ops, scaffold: true },
    { slug: "manufacturing", title: "Manufacturing", category: "operations", icon: Cog, roles: roles.ops, scaffold: true },
    { slug: "warehousing", title: "Warehousing", category: "operations", icon: Warehouse, roles: roles.ops, scaffold: true },
    { slug: "recruitment", title: "Recruitment", category: "operations", icon: UserPlus, roles: roles.hr, scaffold: true },
    { slug: "marketing", title: "Marketing Automation", category: "operations", icon: Megaphone, roles: roles.admin, scaffold: true },
    { slug: "helpdesk", title: "Helpdesk", category: "operations", icon: Ticket, roles: roles.ops, scaffold: true },
    { slug: "e-signatures", title: "e-Signatures", category: "operations", icon: FileSignature, roles: roles.admin, scaffold: true },
    { slug: "bi", title: "BI Reports", category: "reports", icon: LineChart, roles: roles.admin, scaffold: true },
  ],
};

export const PRODUCTS: ProductDef[] = [
  hospital,
  clinic,
  pharmacy,
  laboratory,
  imaging,
  cyshop,
  erp,
];

export const PRODUCTS_BY_SLUG: Record<string, ProductDef> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export function getProduct(slug: string): ProductDef | undefined {
  return PRODUCTS_BY_SLUG[slug];
}

export function getModule(productSlug: string, moduleSlug: string): ModuleDef | undefined {
  const p = getProduct(productSlug);
  return p?.modules.find((m) => m.slug === moduleSlug);
}

export const MODULE_CATEGORY_LABELS: Record<ModuleCategory, string> = {
  clinical: "Clinical",
  operations: "Operations",
  erp: "ERP",
  ai: "AI",
  reports: "Reports",
  settings: "Settings",
};

export const MODULE_CATEGORY_ORDER: ModuleCategory[] = [
  "clinical",
  "operations",
  "erp",
  "ai",
  "reports",
  "settings",
];
