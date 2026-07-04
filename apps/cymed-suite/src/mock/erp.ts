import { seededRandom } from "@/lib/utils";

const r = seededRandom(606);

export const erpStats = {
  totalRevenue: 4_820_600,
  outstandingAR: 682_400,
  payablesDue: 218_700,
  activeEmployees: 214,
  openPOs: 38,
  inventoryValue: 1_142_000,
  projectsActive: 12,
  ticketsOpen: 27,
};

/* ------------------------------ ACCOUNTING ------------------------------ */

export const journalEntries = Array.from({ length: 12 }, (_, i) => ({
  id: `JE-${String(9800 + i).padStart(5, "0")}`,
  date: new Date(Date.now() - i * 86_400_000).toISOString(),
  account: [
    "1000 - Cash",
    "1200 - AR",
    "2000 - AP",
    "4000 - Revenue",
    "5000 - COGS",
    "6100 - Payroll Expense",
    "1400 - Inventory",
  ][i % 7],
  description: [
    "Customer payment received",
    "Supplier invoice booked",
    "Payroll accrual",
    "Sales revenue",
    "Inventory move",
    "Utility payment",
    "Depreciation",
  ][i % 7],
  debit: i % 2 === 0 ? Math.round(1000 + r() * 20_000) : 0,
  credit: i % 2 === 1 ? Math.round(1000 + r() * 20_000) : 0,
  posted: i > 2,
}));

export const revenueTrend = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
  revenue: Math.round(280_000 + r() * 180_000),
  expenses: Math.round(180_000 + r() * 120_000),
  profit: 0,
})).map((row) => ({ ...row, profit: row.revenue - row.expenses }));

/* --------------------------------- AR / AP -------------------------------- */

export const arAging = [
  { bucket: "Current", amount: 342_000 },
  { bucket: "1-30", amount: 158_400 },
  { bucket: "31-60", amount: 92_100 },
  { bucket: "61-90", amount: 48_500 },
  { bucket: "90+", amount: 41_400 },
];

export const openInvoices = Array.from({ length: 10 }, (_, i) => ({
  invoice: `INV-${String(2026_400 + i).padStart(7, "0")}`,
  customer: [
    "Bupa Arabia",
    "Tawuniya",
    "Daman Insurance",
    "MedNet",
    "Aetna",
    "AXA Gulf",
    "Al Rajhi Hospital",
    "SEHA Trust",
    "King Faisal Med. City",
    "MOH Contract",
  ][i],
  amount: Math.round(4000 + r() * 60_000),
  dueDate: new Date(Date.now() + (i - 4) * 86_400_000 * 5).toISOString(),
  aging: [10, 22, 40, 60, 5, 12, 88, 3, 92, 45][i],
  status: (["Open", "Overdue", "Partial", "Sent"] as const)[i % 4],
}));

/* -------------------------------- CRM PIPE -------------------------------- */

export const opportunities = Array.from({ length: 8 }, (_, i) => ({
  id: `OPP-${String(510 + i).padStart(4, "0")}`,
  name: [
    "Cybercom to Al Salam Hospital",
    "Riyadh Clinic Network Rollout",
    "Dubai Health Group Pilot",
    "Amman Uni. Med Center Contract",
    "Jeddah Chain Expansion",
    "MOH Digital Transformation RFP",
    "Kuwait Ministry Deal",
    "Cairo Multi-site Pilot",
  ][i],
  stage: (["Discovery", "Qualified", "Proposal", "Negotiation", "Won", "Lost"] as const)[i % 6],
  value: Math.round(150_000 + r() * 900_000),
  probability: Math.round(20 + r() * 70),
  closeDate: new Date(Date.now() + (i + 1) * 86_400_000 * 30).toISOString(),
  owner: ["Ahmed A.", "Layla R.", "Michael C.", "Sarah J."][i % 4],
}));

export const supportTicketsByPriority = [
  { priority: "P1", count: 3 },
  { priority: "P2", count: 7 },
  { priority: "P3", count: 12 },
  { priority: "P4", count: 5 },
];
