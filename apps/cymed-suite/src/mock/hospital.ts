import { seededRandom } from "@/lib/utils";
import { CLINICIAN_NAMES, DEPARTMENTS, NURSE_NAMES, PATIENT_NAMES } from "./names";

const r = seededRandom(42);

export const hospitalStats = {
  totalBeds: 320,
  occupied: 251,
  available: 62,
  reserved: 7,
  icuOccupied: 24,
  icuTotal: 30,
  orActive: 8,
  orTotal: 12,
  erWaiting: 14,
  erInTreatment: 22,
  avgLOS: 4.3,
  revenueToday: 148_320,
  admissionsToday: 32,
  dischargesToday: 27,
  criticalAlerts: 3,
};

export const bedOccupancyTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `D-${13 - i}`,
  occupied: Math.round(230 + r() * 60),
  target: 260,
}));

export const revenueByDept = DEPARTMENTS.slice(0, 8).map((d) => ({
  department: d,
  revenue: Math.round(20_000 + r() * 80_000),
  claims: Math.round(40 + r() * 200),
}));

export const wards = [
  { code: "MS-1", name: "Med-Surg 1", capacity: 32, occupied: 28 },
  { code: "MS-2", name: "Med-Surg 2", capacity: 32, occupied: 30 },
  { code: "ICU-A", name: "ICU A", capacity: 12, occupied: 10 },
  { code: "ICU-B", name: "ICU B", capacity: 18, occupied: 14 },
  { code: "PED", name: "Pediatrics", capacity: 24, occupied: 18 },
  { code: "OB", name: "OB/GYN", capacity: 20, occupied: 15 },
  { code: "ONC", name: "Oncology", capacity: 16, occupied: 12 },
  { code: "CARD", name: "Cardiology", capacity: 20, occupied: 17 },
];

export const admissions = PATIENT_NAMES.slice(0, 12).map((name, i) => {
  const mrn = `MRN-${String(100234 + i).padStart(6, "0")}`;
  const wardIdx = i % wards.length;
  const statuses = ["Admitted", "Pre-Admit", "Discharged", "Transfer"] as const;
  const status = statuses[i % statuses.length];
  return {
    mrn,
    patient: name,
    age: 28 + Math.round(r() * 60),
    gender: i % 2 === 0 ? "M" : "F",
    ward: wards[wardIdx].code,
    room: `${wards[wardIdx].code}-${100 + i}`,
    bed: `${(i % 4) + 1}`,
    admittedAt: new Date(Date.now() - r() * 86_400_000 * 7).toISOString(),
    status,
    physician: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
    diagnosis: [
      "Pneumonia",
      "Chest pain — R/O ACS",
      "DKA",
      "Post-op day 2 — appendectomy",
      "AKI",
      "COPD exacerbation",
      "Cellulitis",
      "Stroke — L MCA",
    ][i % 8],
    los: Math.round(r() * 12) + 1,
  };
});

/* ------------------------------ ER TRIAGE QUEUE ------------------------------ */

const complaints = [
  "Chest pain",
  "Shortness of breath",
  "Abdominal pain",
  "Head injury (fall)",
  "Fever + rash",
  "Laceration — R hand",
  "Back pain",
  "Palpitations",
  "Dizziness",
  "Vomiting",
  "Confusion",
  "Traumatic injury — MVC",
];

export const erQueue = PATIENT_NAMES.slice(0, 10).map((name, i) => {
  const esi = ([1, 2, 3, 4, 5][i % 5]) as 1 | 2 | 3 | 4 | 5;
  const lane = esi <= 2 ? "resus" : "fast-track";
  const arrivedMinutesAgo = Math.round(r() * 60) + 1;
  return {
    id: `ER-${String(9012 + i).padStart(5, "0")}`,
    patient: name,
    age: 20 + Math.round(r() * 60),
    esi,
    complaint: complaints[i % complaints.length],
    arrivedAt: new Date(Date.now() - arrivedMinutesAgo * 60_000).toISOString(),
    waitMinutes: arrivedMinutesAgo,
    lane,
    vitals: {
      hr: 60 + Math.round(r() * 60),
      bp: `${100 + Math.round(r() * 40)}/${60 + Math.round(r() * 20)}`,
      temp: (36.5 + r() * 2).toFixed(1),
      spo2: 90 + Math.round(r() * 9),
      rr: 12 + Math.round(r() * 10),
    },
    assigned: i < 6 ? CLINICIAN_NAMES[i % CLINICIAN_NAMES.length] : "—",
  };
});

/* ------------------------------- NURSE STATION ------------------------------- */

export const nurseWardList = PATIENT_NAMES.slice(0, 8).map((name, i) => ({
  bed: `MS1-${101 + i}`,
  mrn: `MRN-${String(101010 + i).padStart(6, "0")}`,
  patient: name,
  age: 30 + Math.round(r() * 50),
  admittedDays: Math.round(r() * 8) + 1,
  attending: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
  nurse: NURSE_NAMES[i % NURSE_NAMES.length],
  vitals: {
    temp: (36.4 + r() * 1.5).toFixed(1),
    hr: 60 + Math.round(r() * 40),
    bp: `${105 + Math.round(r() * 40)}/${65 + Math.round(r() * 20)}`,
    rr: 12 + Math.round(r() * 8),
    spo2: 93 + Math.round(r() * 6),
    gcs: 15 - Math.floor(r() * 3),
  },
  isolation: r() > 0.7 ? "Contact" : "—",
  code: r() > 0.85 ? "DNR" : "Full",
  nextMed: `${8 + i}:00`,
}));

/* ---------------------------- REVENUE / OCCUPANCY --------------------------- */

export const departmentPerformance = DEPARTMENTS.map((d) => ({
  department: d,
  productivity: Math.round(65 + r() * 30),
  utilization: Math.round(55 + r() * 40),
  satisfaction: Math.round(80 + r() * 15),
}));
