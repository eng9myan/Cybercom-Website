import { seededRandom } from "@/lib/utils";
import { CLINICIAN_NAMES, DEPARTMENTS, PATIENT_NAMES } from "./names";

const r = seededRandom(101);

export const clinicStats = {
  avgWait: 12,
  totalAppointments: 128,
  completedToday: 74,
  inConsultation: 6,
  waiting: 18,
  noShows: 4,
  revenueToday: 42_310,
  newPatients: 9,
  followUps: 65,
  telehealthShare: 0.28,
};

const triageLevels = ["urgent", "semi-urgent", "routine"] as const;
const specialties = ["General", "Cardiology", "Pediatrics", "Dermatology", "OB/GYN", "Orthopedics"];
const statuses = [
  "Waiting",
  "In Consultation",
  "Vitals Taken",
  "Ready for MD",
  "Checked In",
  "Completed",
] as const;

export const receptionQueue = PATIENT_NAMES.slice(0, 16).map((name, i) => {
  const wait = Math.round(r() * 45);
  const triage = triageLevels[i % 3];
  return {
    mrn: `PT-${String(2025_000 + i).padStart(7, "0")}`,
    patient: name,
    age: 3 + Math.round(r() * 80),
    gender: i % 2 === 0 ? "M" : "F",
    checkedInAt: new Date(Date.now() - wait * 60_000).toISOString(),
    waitMinutes: wait,
    triage,
    specialty: specialties[i % specialties.length],
    status: statuses[i % statuses.length],
    physician: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
    payer: ["Cash", "Bupa", "Tawuniya", "Daman", "Aetna"][i % 5],
  };
});

/* --------------------------------- APPOINTMENTS -------------------------------- */

export const appointmentsToday = Array.from({ length: 24 }, (_, i) => {
  const hour = 8 + Math.floor(i / 3);
  const min = (i % 3) * 20;
  return {
    time: `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
    patient: PATIENT_NAMES[i % PATIENT_NAMES.length],
    physician: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
    specialty: specialties[i % specialties.length],
    type: i % 4 === 0 ? "New" : "Follow-up",
    channel: i % 5 === 0 ? "Telehealth" : "In-person",
    status: statuses[i % statuses.length],
    duration: 15 + (i % 3) * 15,
  };
});

/* ---------------------------------- CDS / DRUGS -------------------------------- */

export const drugInteractionResults = [
  {
    drugA: "Warfarin 5mg",
    drugB: "Aspirin 100mg",
    severity: "Major",
    mechanism: "Additive antiplatelet + anticoagulant effect",
    recommendation: "Avoid combination. If unavoidable, monitor INR and bleeding daily.",
  },
  {
    drugA: "Metformin 500mg",
    drugB: "Contrast media (iodinated)",
    severity: "Moderate",
    mechanism: "Risk of lactic acidosis with acute renal impairment",
    recommendation: "Hold metformin 48h post-contrast; recheck eGFR.",
  },
  {
    drugA: "Sertraline 50mg",
    drugB: "Tramadol 50mg",
    severity: "Major",
    mechanism: "Serotonin syndrome risk",
    recommendation: "Avoid. Consider non-tramadol analgesic.",
  },
];

export const clinicKpiTrend = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
  visits: Math.round(2400 + r() * 800),
  revenue: Math.round(180_000 + r() * 90_000),
  noShow: Math.round(4 + r() * 6),
}));

export const specialtyMix = specialties.map((s) => ({
  specialty: s,
  visits: Math.round(200 + r() * 800),
}));
