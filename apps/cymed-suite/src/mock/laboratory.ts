import { seededRandom } from "@/lib/utils";
import { CLINICIAN_NAMES, LAB_TESTS, PATIENT_NAMES } from "./names";

const r = seededRandom(303);

export const labStats = {
  ordersToday: 412,
  pending: 78,
  inProcess: 46,
  verified: 288,
  tatAvgMinutes: 42,
  criticalResults: 5,
  qcPassRate: 0.986,
  revenueToday: 24_540,
};

const priorities = ["STAT", "Routine"] as const;
const statuses = [
  "Ordered",
  "Collected",
  "Received in Lab",
  "In Process",
  "Verified",
  "Reported",
] as const;

export const labWorklist = PATIENT_NAMES.slice(0, 14).map((name, i) => {
  const t = LAB_TESTS[i % LAB_TESTS.length];
  return {
    accession: `L-${String(70_000 + i).padStart(6, "0")}`,
    patient: name,
    mrn: `MRN-${String(300_000 + i).padStart(6, "0")}`,
    testCode: t.code,
    testName: t.name,
    panel: t.panel,
    priority: priorities[i % 2],
    status: statuses[i % statuses.length],
    orderedAt: new Date(Date.now() - r() * 3_600_000 * 6).toISOString(),
    orderedBy: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
    tatMinutes: Math.round(t.tat * (0.6 + r() * 0.9)),
    abnormalFlag: i % 5 === 0 ? "H" : i % 7 === 0 ? "L" : null,
  };
});

export const tatBreakdown = LAB_TESTS.slice(0, 8).map((t) => ({
  test: t.code,
  avg: Math.round(t.tat * (0.7 + r() * 0.6)),
  target: t.tat,
  panel: t.panel,
}));

export const qcSeries = Array.from({ length: 20 }, (_, i) => ({
  run: i + 1,
  value: 4.8 + Math.sin(i / 3) * 0.4 + (r() - 0.5) * 0.3,
  mean: 5.0,
  upper: 5.6,
  lower: 4.4,
}));

export const criticalResultsLog = Array.from({ length: 5 }, (_, i) => ({
  accession: `L-${String(69_900 + i).padStart(6, "0")}`,
  patient: PATIENT_NAMES[i % PATIENT_NAMES.length],
  test: ["Troponin I", "K+", "Glucose", "Platelets", "INR"][i],
  value: ["12.4 ng/mL", "6.9 mmol/L", "38 mg/dL", "18 x10⁹/L", "6.2"][i],
  ref: ["<0.04", "3.5-5.1", "70-100", "150-400", "0.9-1.2"][i],
  calledAt: new Date(Date.now() - i * 1_800_000).toISOString(),
  physician: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
  acknowledgedAt: i < 4 ? new Date(Date.now() - i * 1_500_000).toISOString() : null,
}));
