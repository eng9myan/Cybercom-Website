import { seededRandom } from "@/lib/utils";
import { CLINICIAN_NAMES, MODALITIES, PATIENT_NAMES } from "./names";

const r = seededRandom(404);

export const imagingStats = {
  studiesToday: 86,
  reported: 52,
  pendingRead: 28,
  inProgress: 6,
  statQueue: 4,
  radiologistsOnDuty: 4,
  avgTATMinutes: 38,
  revenueToday: 22_180,
};

const priorities = ["STAT", "Routine"] as const;
const statuses = ["Scheduled", "Arrived", "In Progress", "Awaiting Read", "Reported"] as const;

export const risWorklist = PATIENT_NAMES.slice(0, 14).map((name, i) => {
  const m = MODALITIES[i % MODALITIES.length];
  const body = m.body[i % m.body.length];
  return {
    id: `RAD-${String(19_000 + i).padStart(6, "0")}`,
    patient: name,
    mrn: `MRN-${String(500_000 + i).padStart(6, "0")}`,
    modality: m.code,
    modalityName: m.name,
    body,
    priority: priorities[i % 2],
    status: statuses[i % statuses.length],
    scheduledAt: new Date(Date.now() - r() * 3_600_000 * 6).toISOString(),
    orderingMd: CLINICIAN_NAMES[i % CLINICIAN_NAMES.length],
    radiologist: i < 8 ? CLINICIAN_NAMES[(i + 3) % CLINICIAN_NAMES.length] : "—",
    aiFlag:
      i % 6 === 0
        ? { finding: "Pulmonary nodule 8mm", zone: "RLL", severity: "moderate" }
        : i % 9 === 0
          ? { finding: "Cortical infarct", zone: "L MCA", severity: "high" }
          : null,
  };
});

export const modalityUtilization = MODALITIES.map((m) => ({
  modality: m.code,
  scheduled: Math.round(60 + r() * 100),
  performed: Math.round(50 + r() * 90),
  target: 100,
}));

export const readTATTrend = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  ct: Math.round(30 + r() * 20),
  mri: Math.round(45 + r() * 25),
  xr: Math.round(15 + r() * 15),
  us: Math.round(20 + r() * 15),
}));
