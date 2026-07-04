import type React from "react";
import { AdmissionAdtModule } from "./hospital/modules/admission-adt";
import { EmergencyModule } from "./hospital/modules/emergency";
import { EmrModule } from "./hospital/modules/emr";
import { NurseStationModule } from "./hospital/modules/nurse-station";
import { AiScribeModule as HospitalAiScribeModule } from "./hospital/modules/ai-scribe";
import { ReceptionModule } from "./clinic/modules/reception";
import { AppointmentsModule } from "./clinic/modules/appointments";
import { ConsultationsModule } from "./clinic/modules/consultations";
import { TriageModule } from "./clinic/modules/triage";
import { ClinicAiScribeModule } from "./clinic/modules/ai-scribe";
import { PharmacyPosModule } from "./pharmacy/modules/pos";
import { VerificationModule } from "./pharmacy/modules/verification";
import { InteractionsModule } from "./pharmacy/modules/interactions";
import { LabOrdersModule } from "./laboratory/modules/orders";
import { LisModule } from "./laboratory/modules/lis";
import { SamplesModule } from "./laboratory/modules/samples";
import { RisWorklistModule } from "./imaging/modules/worklist";
import { PacsViewerModule } from "./imaging/modules/pacs";
import { SchedulingModule } from "./imaging/modules/scheduling";
import { CyshopPosModule } from "./cyshop/modules/pos";
import { KdsModule } from "./cyshop/modules/kds";
import { AccountingModule } from "./erp/modules/accounting";
import { ApArModule } from "./erp/modules/ap-ar";

export const MODULE_REGISTRY: Record<string, React.FC> = {
  // Hospital
  "hospital/admission-adt": AdmissionAdtModule,
  "hospital/emergency": EmergencyModule,
  "hospital/emr": EmrModule,
  "hospital/nurse-station": NurseStationModule,
  "hospital/ai-scribe": HospitalAiScribeModule,
  // Clinic
  "clinic/reception": ReceptionModule,
  "clinic/appointments": AppointmentsModule,
  "clinic/consultations": ConsultationsModule,
  "clinic/triage": TriageModule,
  "clinic/ai-scribe": ClinicAiScribeModule,
  // Pharmacy
  "pharmacy/pos": PharmacyPosModule,
  "pharmacy/verification": VerificationModule,
  "pharmacy/interactions": InteractionsModule,
  // Laboratory
  "laboratory/orders": LabOrdersModule,
  "laboratory/lis": LisModule,
  "laboratory/samples": SamplesModule,
  // Imaging
  "imaging/worklist": RisWorklistModule,
  "imaging/pacs": PacsViewerModule,
  "imaging/scheduling": SchedulingModule,
  // CyShop
  "cyshop/pos": CyshopPosModule,
  "cyshop/kds": KdsModule,
  // ERP
  "erp/accounting": AccountingModule,
  "erp/ap-ar": ApArModule,
};

export function getModuleComponent(product: string, moduleSlug: string): React.FC | undefined {
  return MODULE_REGISTRY[`${product}/${moduleSlug}`];
}
