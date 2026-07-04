import { seededRandom } from "@/lib/utils";
import { CLINICIAN_NAMES, DRUGS, PATIENT_NAMES } from "./names";

const r = seededRandom(202);

export const pharmacyStats = {
  prescriptionsToday: 246,
  dispensed: 218,
  pendingVerification: 22,
  narcoticsDispensed: 8,
  lowStockAlerts: 14,
  expiringWithin90d: 6,
  revenueToday: 18_460,
  avgWait: 6,
};

export const prescriptionQueue = PATIENT_NAMES.slice(0, 12).map((name, i) => {
  const drug = DRUGS[i % DRUGS.length];
  const statuses = [
    "Awaiting Verification",
    "Verified",
    "Filled",
    "Dispensed",
    "Query",
    "Rejected",
  ] as const;
  return {
    id: `RX-${String(24_000 + i).padStart(6, "0")}`,
    patient: name,
    prescriber: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
    drug: drug.name,
    form: drug.form,
    quantity: [10, 14, 30, 60, 90][i % 5],
    price: drug.price,
    controlled: i % 8 === 0,
    priority: i % 4 === 0 ? "STAT" : "Routine",
    status: statuses[i % statuses.length],
    receivedAt: new Date(Date.now() - r() * 3_600_000 * 4).toISOString(),
  };
});

export const drugInventory = DRUGS.map((d, i) => ({
  sku: `DR-${String(1000 + i).padStart(5, "0")}`,
  name: d.name,
  form: d.form,
  bin: `A-${String(1 + i).padStart(2, "0")}-${String((i * 3) % 30 + 1).padStart(2, "0")}`,
  onHand: Math.round(20 + r() * 400),
  reorderPoint: 30 + (i % 5) * 20,
  expiring: r() > 0.7 ? Math.round(20 + r() * 60) : null,
  price: d.price,
  category: ["A", "B", "C"][i % 3],
}));

export const salesTrend = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
  otc: Math.round(28_000 + r() * 10_000),
  rx: Math.round(38_000 + r() * 14_000),
}));

export const narcoticLog = Array.from({ length: 8 }, (_, i) => ({
  date: new Date(Date.now() - i * 3_600_000 * 5).toISOString(),
  drug: ["Morphine 10mg", "Fentanyl 50mcg", "Oxycodone 5mg", "Tramadol 50mg"][i % 4],
  patient: PATIENT_NAMES[i % PATIENT_NAMES.length],
  quantity: [1, 2, 5, 10][i % 4],
  prescriber: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
  witness: "Pharm. Ali Reza",
  balance: 40 - i * 2,
}));
