import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { type Locale } from "@/lib/i18n";
import { ArrowRight, Check, ExternalLink, Play, BookOpen, ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const PRODUCT_DATA: Record<string, {
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  compliance: string[];
  editions: { name: string; desc: string; features: string[] }[];
  deployment: string[];
  color: string;
  accentClass: string;
  categoryLabel: string;
  subProducts?: { name: string; slug: string; desc: string }[];
}> = {
  "cymed": {
    name: "CyMed",
    tagline: "Intelligent Healthcare Platform — Complete Clinical Suite",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "CyMed is a comprehensive FHIR-native clinical platform covering every care setting — from outpatient clinics to large hospitals, laboratories, pharmacies, imaging centers, and patient engagement. Built on ICD-11, SNOMED CT, and LOINC, CyMed connects the complete healthcare continuum through a unified clinical data model.",
    features: [
      "FHIR R4/R5 native across all modules",
      "ICD-11 & SNOMED CT clinical coding",
      "Single patient record across facilities",
      "Drug interaction engine (5 types)",
      "CyAI advisory-only clinical decision support",
      "Break Glass emergency access",
      "Hash-chained audit trail",
      "Arabic & English clinical interface (RTL/LTR)",
      "HL7 v2/v3 & DICOM integration",
      "Population health analytics",
    ],
    compliance: ["ICD-11", "FHIR R4", "SNOMED CT", "LOINC", "DICOM", "HL7 v2/v3"],
    editions: [
      { name: "CyMed Clinic", desc: "Outpatient EMR, scheduling, billing", features: ["Clinic module", "Patient portal", "Revenue cycle"] },
      { name: "CyMed Hospital", desc: "Inpatient, OR, ICU, ward management", features: ["All Clinic features", "ADT", "CPOE", "OR & ICU"] },
      { name: "CyMed Full Suite", desc: "All 9 CyMed products", features: ["All Hospital features", "Lab, Imaging, Pharmacy", "Population health", "Full RCM"] },
    ],
    deployment: ["SaaS Cloud", "Private Cloud", "On-Premise", "Hybrid"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    subProducts: [
      { name: "CyMed Hospital", slug: "cymed-hospital", desc: "Complete hospital information system — ADT, OR, ICU, CPOE" },
      { name: "CyMed Clinic", slug: "cymed-clinic", desc: "Outpatient EMR, scheduling, billing, telemedicine" },
      { name: "CyMed Laboratory", slug: "cymed-laboratory", desc: "LIS with auto-verification, LOINC coding, analyzer interfacing" },
      { name: "CyMed Imaging", slug: "cymed-imaging", desc: "RIS/PACS, DICOM, structured reporting, AI image analysis" },
      { name: "CyMed Pharmacy", slug: "cymed-pharmacy", desc: "Clinical pharmacy, drug interactions, inventory management" },
      { name: "Patient Portal", slug: "cymed-patient-portal", desc: "Patient self-service, appointments, records, telemedicine" },
      { name: "Provider Portal", slug: "cymed-provider-portal", desc: "Provider scheduling, documentation, performance analytics" },
      { name: "Revenue Cycle", slug: "cymed-revenue-cycle", desc: "Insurance eligibility, coding, claims, denial management" },
      { name: "Population Health", slug: "cymed-population-health", desc: "Risk stratification, care programs, quality measures" },
    ],
  },
  "cymed-clinic": {
    name: "CyMed Clinic",
    tagline: "Intelligent Outpatient Clinical Management",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "A comprehensive outpatient management platform built for modern clinics. FHIR-native, ICD-11 coded, with integrated scheduling, EMR, billing, and patient engagement.",
    features: [
      "FHIR R4/R5 native EMR",
      "ICD-11 & SNOMED CT clinical coding",
      "Intelligent appointment scheduling",
      "Clinical decision support (CDS Hooks)",
      "E-prescribing & medication management",
      "Patient portal integration",
      "Revenue cycle management",
      "Telemedicine support",
      "Multi-language (EN/AR) interface",
      "Mobile-first provider app",
    ],
    compliance: ["ICD-11", "FHIR R4", "SNOMED CT", "LOINC", "HL7 v2.x"],
    editions: [
      { name: "Clinic Starter", desc: "For small clinics up to 5 providers", features: ["Core EMR", "Scheduling", "Billing", "Patient records"] },
      { name: "Clinic Professional", desc: "For multi-specialty practices", features: ["All Starter features", "Multi-specialty", "Lab integration", "Pharmacy", "Analytics"] },
      { name: "Clinic Enterprise", desc: "For clinic chains and networks", features: ["All Professional features", "Multi-branch", "API access", "Custom workflows", "24/7 SLA"] },
    ],
    deployment: ["SaaS Cloud", "Private Cloud", "On-Premise", "Hybrid"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-hospital": {
    name: "CyMed Hospital",
    tagline: "Complete Hospital Information System",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "End-to-end hospital management platform covering inpatient care, OR management, ICU, nursing station, ward management, and clinical operations — all FHIR-native and ICD-11 coded.",
    features: [
      "FHIR R4/R5 inpatient EMR",
      "ADT (Admission, Discharge, Transfer)",
      "OR scheduling & surgical management",
      "ICU monitoring integration",
      "Nursing station workflows",
      "Clinical order management (CPOE)",
      "Blood bank management",
      "Bed management & census",
      "Revenue cycle & claims",
      "Population health analytics",
    ],
    compliance: ["ICD-11", "FHIR R4", "SNOMED CT", "LOINC", "DICOM", "HL7 v2.x", "HL7 v3"],
    editions: [
      { name: "Hospital Core", desc: "For hospitals up to 200 beds", features: ["ADT", "EMR", "Nursing", "Billing", "Laboratory integration"] },
      { name: "Hospital Advanced", desc: "For hospitals 200-500 beds", features: ["All Core features", "OR Management", "ICU", "Blood Bank", "PACS integration"] },
      { name: "Hospital Enterprise", desc: "For large hospitals and health systems", features: ["All Advanced features", "Multi-facility", "Population health", "AI clinical decision support", "24/7 SLA"] },
    ],
    deployment: ["Private Cloud", "On-Premise", "Hybrid"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-laboratory": {
    name: "CyMed Laboratory",
    tagline: "Laboratory Information System with Auto-Verification",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "Full-featured LIS with LOINC coding, auto-verification rules, QC management, interfacing with analyzers, and FHIR-based result delivery.",
    features: [
      "LOINC-coded test catalog",
      "Auto-verification engine",
      "QC management (Westgard rules)",
      "Analyzer interfacing (bidirectional)",
      "Specimen collection & tracking",
      "Result delivery via FHIR",
      "Critical value alerting",
      "Microbiology & blood bank modules",
      "Reference lab management",
      "Mobile phlebotomist app",
    ],
    compliance: ["LOINC", "FHIR R4", "ICD-11", "HL7 v2.x"],
    editions: [
      { name: "Lab Core", desc: "Clinical chemistry & hematology", features: ["Core test catalog", "Basic QC", "Analyzer interface", "FHIR results"] },
      { name: "Lab Full", desc: "Full-service laboratory", features: ["All Core features", "Microbiology", "Blood bank", "Auto-verification", "Advanced QC"] },
    ],
    deployment: ["SaaS Cloud", "On-Premise"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-imaging": {
    name: "CyMed Imaging",
    tagline: "Radiology Information System & PACS Integration",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "Integrated RIS with DICOM-native PACS connectivity, radiologist worklists, structured reporting, and AI-powered image analysis.",
    features: [
      "DICOM-native image management",
      "Radiologist worklist management",
      "Structured reporting (RSNA templates)",
      "AI-assisted image analysis",
      "PACS/VNA connectivity",
      "3D visualization support",
      "Critical finding alerts",
      "Peer review workflows",
      "Teleradiology support",
      "FHIR ImagingStudy integration",
    ],
    compliance: ["DICOM", "FHIR R4", "IHE Profiles", "LOINC"],
    editions: [
      { name: "Imaging Core", desc: "Basic RIS with PACS connectivity", features: ["RIS workflow", "DICOM viewer", "Basic reporting"] },
      { name: "Imaging Advanced", desc: "Full RIS with AI capabilities", features: ["All Core features", "AI image analysis", "3D visualization", "Teleradiology", "Advanced structured reporting"] },
    ],
    deployment: ["On-Premise", "Private Cloud", "Hybrid"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-pharmacy": {
    name: "CyMed Pharmacy",
    tagline: "Clinical Pharmacy Management System",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "End-to-end pharmacy management covering dispensing, clinical pharmacy review, drug interaction checking, inventory, and FHIR-based medication reconciliation.",
    features: [
      "E-prescription reception (FHIR)",
      "Clinical pharmacist review",
      "Drug-drug interaction checking",
      "Allergy alert system",
      "Inventory management (FIFO/FEFO)",
      "Narcotic & controlled substance tracking",
      "Automated dispensing cabinet integration",
      "IV admixture & chemotherapy preparation",
      "Pharmacy analytics & reporting",
      "Mobile pharmacist tools",
    ],
    compliance: ["FHIR R4", "ICD-11", "LOINC", "GS1 Barcoding"],
    editions: [
      { name: "Pharmacy Core", desc: "Retail & hospital pharmacy dispensing", features: ["Dispensing", "Inventory", "Drug interactions", "Basic reporting"] },
      { name: "Pharmacy Clinical", desc: "Full clinical pharmacy operations", features: ["All Core features", "Clinical review", "IV admixture", "Narcotic tracking", "Analytics"] },
    ],
    deployment: ["SaaS Cloud", "On-Premise"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-patient-portal": {
    name: "CyMed Patient Portal",
    tagline: "Patient Engagement & Self-Service Platform",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "FHIR-native patient portal enabling appointment booking, health records access, lab results, messaging with providers, and telehealth — accessible via web and mobile.",
    features: [
      "Online appointment booking",
      "Health records access (FHIR)",
      "Lab results & reports",
      "Secure provider messaging",
      "Telemedicine integration",
      "Medication tracking",
      "Vaccination records",
      "Bill payment",
      "Family account management",
      "Arabic & English interface",
    ],
    compliance: ["FHIR R4", "HIPAA Ready", "GDPR Ready"],
    editions: [
      { name: "Portal Starter", desc: "Core patient engagement", features: ["Appointments", "Records", "Lab results"] },
      { name: "Portal Full", desc: "Complete patient experience", features: ["All Starter", "Telemedicine", "Payments", "Family management"] },
    ],
    deployment: ["SaaS Cloud"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-provider-portal": {
    name: "CyMed Provider Portal",
    tagline: "Clinical Workforce Management Portal",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "Provider-facing portal for credential management, schedule management, clinical documentation, and performance analytics.",
    features: [
      "Provider credentialing & licensing",
      "Schedule & availability management",
      "Clinical documentation access",
      "Performance dashboards",
      "CME & training tracking",
      "Peer review participation",
      "Referral management",
      "Patient panel management",
      "Mobile provider app",
      "MFA & device registration",
    ],
    compliance: ["FHIR R4", "OAuth 2.1", "HIPAA Ready"],
    editions: [
      { name: "Provider Core", desc: "Schedule & documentation", features: ["Scheduling", "Records", "Dashboards"] },
      { name: "Provider Full", desc: "Complete provider experience", features: ["All Core", "CME tracking", "Analytics", "Referrals"] },
    ],
    deployment: ["SaaS Cloud", "On-Premise"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-revenue-cycle": {
    name: "CyMed Revenue Cycle",
    tagline: "Healthcare Revenue Cycle Management",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "Comprehensive RCM platform covering patient registration, insurance eligibility verification, medical coding, claims submission, denial management, and collections.",
    features: [
      "Patient financial counseling",
      "Insurance eligibility verification",
      "ICD-11 & CPT medical coding",
      "Claims submission & tracking",
      "Denial management & appeals",
      "Payment posting & reconciliation",
      "Collections management",
      "Payor contract management",
      "AR analytics & dashboards",
      "Integration with major insurers",
    ],
    compliance: ["ICD-11", "CPT", "FHIR R4", "X12 EDI"],
    editions: [
      { name: "RCM Core", desc: "Basic billing operations", features: ["Registration", "Coding", "Billing", "Claims"] },
      { name: "RCM Full", desc: "Complete revenue cycle", features: ["All Core", "Denial management", "Collections", "Analytics"] },
    ],
    deployment: ["SaaS Cloud", "On-Premise"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cymed-population-health": {
    name: "CyMed Population Health",
    tagline: "Population Health Analytics & Care Programs",
    category: "healthcare",
    categoryLabel: "CyMed Healthcare",
    description:
      "AI-powered population health management platform for risk stratification, chronic disease management, care gap identification, and population analytics.",
    features: [
      "Population risk stratification",
      "Chronic disease program management",
      "Care gap identification",
      "Social determinants of health (SDOH)",
      "Predictive analytics",
      "Care coordination workflows",
      "Patient outreach campaigns",
      "Quality measure reporting",
      "Public health reporting",
      "Geographic health mapping",
    ],
    compliance: ["FHIR R4", "HL7 QRDA", "ICD-11"],
    editions: [
      { name: "PopHealth Core", desc: "Analytics & reporting", features: ["Risk stratification", "Analytics", "Reporting"] },
      { name: "PopHealth Full", desc: "Complete population management", features: ["All Core", "Care programs", "Outreach", "SDOH", "AI"] },
    ],
    deployment: ["SaaS Cloud", "Private Cloud"],
    color: "emerald",
    accentClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
  "cycom": {
    name: "CyCom ERP",
    tagline: "Unified Enterprise Resource Planning Platform",
    category: "erp",
    categoryLabel: "CyCom Enterprise",
    description:
      "A comprehensive ERP platform unifying Finance, HR, Procurement, Inventory, Assets, Manufacturing, CRM, Retail, and Payroll in a single integrated system.",
    features: [
      "Financial management & accounting",
      "Human resources & payroll",
      "Procurement & vendor management",
      "Inventory & warehouse management",
      "Fixed asset management",
      "Manufacturing & production",
      "CRM & sales management",
      "Retail operations",
      "Business intelligence & analytics",
      "Multi-currency & multi-language",
    ],
    compliance: ["IFRS", "GAAP", "VAT/TAX compliant"],
    editions: [
      { name: "Business", desc: "SME operations", features: ["Finance", "HR", "Inventory", "CRM"] },
      { name: "Enterprise", desc: "Large organization operations", features: ["All Business", "Manufacturing", "Advanced analytics", "API access"] },
    ],
    deployment: ["SaaS Cloud", "On-Premise", "Hybrid"],
    color: "blue",
    accentClass: "text-blue-400 border-blue-500/20 bg-blue-500/5",
  },
  "cygov": {
    name: "CyGov",
    tagline: "Government Digital Transformation Platform",
    category: "government",
    categoryLabel: "CyGov Government",
    description:
      "Comprehensive digital government platform enabling citizen services, national registries, licensing, permits, digital identity, and government workflow automation.",
    features: [
      "Citizen services portal",
      "Online licensing & permitting",
      "National registries management",
      "Government workflow automation",
      "Digital document management",
      "Inter-agency integration",
      "E-payment & fee collection",
      "Audit trail & compliance",
      "Multilingual (EN/AR)",
      "WCAG 2.1 AA accessibility",
    ],
    compliance: ["GDPR", "ISO 27001 Ready", "eIDAS compliant"],
    editions: [
      { name: "Gov Starter", desc: "Core citizen services", features: ["Services portal", "Licensing", "Payments"] },
      { name: "Gov Enterprise", desc: "Full digital government", features: ["All Starter", "Registries", "Workflows", "Integration", "Analytics"] },
    ],
    deployment: ["Government Cloud", "On-Premise", "Air-Gapped"],
    color: "amber",
    accentClass: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  },
  "cyidentity": {
    name: "CyIdentity",
    tagline: "Identity & Access Management Platform",
    category: "identity",
    categoryLabel: "CyIdentity Platform",
    description:
      "Enterprise-grade IAM platform implementing OAuth 2.1, OpenID Connect, passkeys, SSO, RBAC, ABAC, and Zero Trust architecture across all CyberCom platforms.",
    features: [
      "OAuth 2.1 + PKCE authorization",
      "OpenID Connect (OIDC)",
      "Passkeys & FIDO2 support",
      "Single Sign-On (SSO)",
      "Role-Based Access Control (RBAC)",
      "Attribute-Based Access Control (ABAC)",
      "Zero Trust architecture",
      "MFA (TOTP, SMS, passkey)",
      "Device registration & management",
      "Audit logging & compliance",
    ],
    compliance: ["OAuth 2.1", "OIDC", "FIDO2", "WebAuthn"],
    editions: [
      { name: "Identity Core", desc: "OAuth 2.1 & SSO", features: ["OAuth 2.1", "OIDC", "SSO", "MFA"] },
      { name: "Identity Enterprise", desc: "Full Zero Trust IAM", features: ["All Core", "Passkeys", "RBAC/ABAC", "Zero Trust", "Audit"] },
    ],
    deployment: ["SaaS Cloud", "Private Cloud", "On-Premise"],
    color: "violet",
    accentClass: "text-violet-400 border-violet-500/20 bg-violet-500/5",
  },
  "cyintegrationhub": {
    name: "CyIntegrationHub",
    tagline: "Healthcare & Enterprise Integration Middleware",
    category: "integration",
    categoryLabel: "CyIntegrationHub Platform",
    description:
      "Comprehensive integration middleware supporting FHIR, HL7 v2/v3, DICOM, REST, Kafka, EDI, SOAP, LDAP, and SFTP — the connective tissue of the CyberCom ecosystem.",
    features: [
      "FHIR R4/R5 integration engine",
      "HL7 v2.x & v3 processing",
      "DICOM worklist & result integration",
      "REST API orchestration",
      "Apache Kafka event streaming",
      "EDI X12 processing",
      "SOAP/web service bridging",
      "LDAP directory integration",
      "SFTP file exchange",
      "Real-time monitoring dashboard",
    ],
    compliance: ["FHIR R4", "IHE Profiles", "HL7", "DICOM"],
    editions: [
      { name: "Hub Core", desc: "REST & FHIR integration", features: ["REST", "FHIR", "Basic transforms"] },
      { name: "Hub Full", desc: "Full protocol support", features: ["All Core", "HL7", "Kafka", "EDI", "DICOM", "Monitoring"] },
    ],
    deployment: ["SaaS Cloud", "On-Premise", "Hybrid"],
    color: "cyan",
    accentClass: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
  },
  "cyai": {
    name: "CyAI",
    tagline: "Artificial Intelligence & Intelligent Automation Platform",
    category: "ai",
    categoryLabel: "CyAI Platform",
    description:
      "AI platform delivering clinical AI, government AI, enterprise automation, predictive analytics, and NLP across the CyberCom ecosystem. Advisory-only by design — no autonomous clinical decisions.",
    features: [
      "Clinical AI (diagnosis assistance, triage)",
      "Government AI (fraud detection, compliance)",
      "Enterprise AI (process automation)",
      "Predictive analytics engine",
      "Natural language processing (NLP/NER)",
      "Computer vision (radiology, pathology)",
      "AI model management & governance",
      "Explainable AI (XAI) reports",
      "Federated learning support",
      "Real-time inference API",
    ],
    compliance: ["ISO 42001 AI Ready", "GDPR", "Explainability standards"],
    editions: [
      { name: "AI Core", desc: "Predictive analytics & NLP", features: ["Analytics", "NLP", "APIs"] },
      { name: "AI Platform", desc: "Full AI & automation", features: ["All Core", "Clinical AI", "Computer vision", "Model governance"] },
    ],
    deployment: ["SaaS Cloud", "Private Cloud", "On-Premise"],
    color: "pink",
    accentClass: "text-pink-400 border-pink-500/20 bg-pink-500/5",
  },
  "cydata": {
    name: "CyData",
    tagline: "Data Lakehouse & Analytics Platform",
    category: "data",
    categoryLabel: "CyData Platform",
    description:
      "Enterprise data platform providing lakehouse architecture, BI analytics, data governance, and population health analytics across all CyberCom data sources.",
    features: [
      "Data lakehouse architecture",
      "ETL/ELT pipelines",
      "Business intelligence dashboards",
      "Self-service analytics",
      "Data governance & cataloging",
      "Data quality management",
      "Population health analytics",
      "Real-time streaming analytics",
      "Predictive modeling",
      "Multi-tenant data isolation",
    ],
    compliance: ["GDPR", "ISO 27001 Ready"],
    editions: [
      { name: "Data Core", desc: "BI & analytics", features: ["BI dashboards", "ETL", "Basic governance"] },
      { name: "Data Enterprise", desc: "Full lakehouse platform", features: ["All Core", "Lakehouse", "Streaming", "ML integration"] },
    ],
    deployment: ["SaaS Cloud", "Private Cloud"],
    color: "teal",
    accentClass: "text-teal-400 border-teal-500/20 bg-teal-500/5",
  },
  "cyconnect": {
    name: "CyConnect",
    tagline: "Unified Communications & Collaboration Platform",
    category: "communications",
    categoryLabel: "CyConnect Platform",
    description:
      "Secure messaging, notifications, video, and collaboration platform integrated across the CyberCom ecosystem for healthcare, government, and enterprise contexts.",
    features: [
      "Secure clinical messaging (HIPAA-ready)",
      "Push & in-app notifications",
      "Video conferencing",
      "Team collaboration workspaces",
      "Document sharing",
      "Critical alert routing",
      "SMS & email gateway",
      "API-first architecture",
      "Audit logging",
      "Multi-tenant isolation",
    ],
    compliance: ["HIPAA Ready", "GDPR", "TLS 1.3 encryption"],
    editions: [
      { name: "Connect Core", desc: "Messaging & notifications", features: ["Messaging", "Notifications", "Alerts"] },
      { name: "Connect Full", desc: "Complete communications suite", features: ["All Core", "Video", "Collaboration", "SMS gateway"] },
    ],
    deployment: ["SaaS Cloud", "On-Premise"],
    color: "orange",
    accentClass: "text-orange-400 border-orange-500/20 bg-orange-500/5",
  },
  "cycitizen": {
    name: "CyCitizen",
    tagline: "Citizen Digital Experience Platform",
    category: "citizen",
    categoryLabel: "CyCitizen Platform",
    description:
      "Complete citizen digital experience platform providing a citizen portal, digital wallet, national identity services, and government service delivery.",
    features: [
      "Citizen self-service portal",
      "Digital wallet & documents",
      "National identity verification",
      "Government service catalog",
      "Online payments",
      "Document authentication",
      "Appointment booking for gov services",
      "Mobile-first (iOS & Android)",
      "Biometric authentication",
      "Offline-capable PWA",
    ],
    compliance: ["eIDAS", "GDPR", "FIDO2", "ISO 27001 Ready"],
    editions: [
      { name: "Citizen Core", desc: "Portal & payments", features: ["Portal", "Payments", "Services"] },
      { name: "Citizen Full", desc: "Complete citizen platform", features: ["All Core", "Digital wallet", "National ID", "Biometrics"] },
    ],
    deployment: ["Government Cloud", "On-Premise"],
    color: "indigo",
    accentClass: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
  },
};

const WORKFLOW_DATA: Record<string, { step: number; title: string; desc: string }[]> = {
  "cymed": [
    { step: 1, title: "Choose & Configure Module", desc: "Select CyMed products (Clinic, Hospital, Lab, Pharmacy, etc.) and configure for your facility type and specialty." },
    { step: 2, title: "Provision Tenant & Users", desc: "CyIdentity provisions your organization's tenant with role-based access for providers, nurses, staff, and administrators." },
    { step: 3, title: "Migrate & Integrate", desc: "Import existing patient records via FHIR or CSV migration tools. Connect lab analyzers, PACS, and external systems via CyIntegrationHub." },
    { step: 4, title: "Clinical Validation & Training", desc: "Complete UAT for all clinical workflows. Train staff using the CyberCom Academy curriculum." },
    { step: 5, title: "Go Live & Expand", desc: "Launch with hypercare support. Add additional modules as your facility grows — no data migration needed." },
  ],
  "cymed-clinic": [
    { step: 1, title: "Patient Registration", desc: "Staff registers patient with demographic data, insurance, and national ID. MRN auto-generated, FHIR Patient resource created." },
    { step: 2, title: "Appointment Booking", desc: "Patient or staff books appointment via portal or front desk. Intelligent scheduling assigns provider and room." },
    { step: 3, title: "Clinical Consultation", desc: "Provider conducts consultation with ICD-11 coded chief complaint, vitals, SOAP notes, and clinical decision support." },
    { step: 4, title: "Orders & Prescriptions", desc: "Provider issues lab orders (FHIR ServiceRequest), imaging orders, and e-prescriptions via FHIR MedicationRequest." },
    { step: 5, title: "Billing & Collection", desc: "Revenue cycle module generates claim, verifies insurance, submits to payor, and posts payment with ICD-11/CPT coding." },
  ],
  "cymed-hospital": [
    { step: 1, title: "Admission (ADT)", desc: "Patient admitted via ED or pre-admission. ADT event fires HL7 notification to all subscribed systems. Bed assigned." },
    { step: 2, title: "Inpatient Assessment", desc: "Nursing admission assessment completed. ICD-11 coded diagnoses documented. Treatment team assigned." },
    { step: 3, title: "Clinical Orders (CPOE)", desc: "Physician enters medication, lab, imaging, and procedure orders. Drug interaction check fires for all medication orders." },
    { step: 4, title: "Treatment & Nursing", desc: "Nursing station executes medication administration (MAR), documents vitals and care activities, manages IV and procedures." },
    { step: 5, title: "Discharge & Billing", desc: "Discharge summary generated, instructions printed in EN/AR. Insurance claim auto-generated from clinical documentation." },
  ],
  "cymed-laboratory": [
    { step: 1, title: "Receive Lab Order", desc: "FHIR ServiceRequest received from EMR. Order queued in LIS with LOINC test codes. Phlebotomist notified." },
    { step: 2, title: "Specimen Collection", desc: "Phlebotomist collects specimen with mobile app barcode scanning. Specimen labeled and tracked through processing." },
    { step: 3, title: "Analyzer Processing", desc: "Specimen processed by bidirectional analyzer interface. Results transmitted electronically to LIS in real time." },
    { step: 4, title: "Auto-Verification", desc: "Auto-verification rules (delta checks, Westgard QC) applied. Normal results auto-released; abnormals flagged for review." },
    { step: 5, title: "Result Delivery", desc: "FHIR Observation results delivered to ordering provider. Critical values trigger immediate alert via CyConnect." },
  ],
  "cymed-imaging": [
    { step: 1, title: "Order Imaging Study", desc: "FHIR ImagingStudy request received from EMR. RIS schedules study and assigns modality." },
    { step: 2, title: "Schedule & Acquire", desc: "DICOM worklist sends study parameters to modality. Images acquired and sent to PACS." },
    { step: 3, title: "PACS Processing", desc: "DICOM images received, archived, and available in radiologist worklist viewer with 3D visualization tools." },
    { step: 4, title: "Radiologist Reporting", desc: "Radiologist reads images, creates structured report using RSNA templates. AI-assisted analysis highlights findings." },
    { step: 5, title: "Result Delivery", desc: "Signed report delivered via FHIR DiagnosticReport to ordering provider. Critical findings trigger urgent alert." },
  ],
  "cymed-pharmacy": [
    { step: 1, title: "Receive E-Prescription", desc: "FHIR MedicationRequest received from prescribing provider. Order auto-queued in pharmacy dispensing workflow." },
    { step: 2, title: "Clinical Review", desc: "Clinical pharmacist reviews prescription for drug interactions (5 types), allergy conflicts, and dose appropriateness." },
    { step: 3, title: "Dispense & Label", desc: "Drug dispensed from inventory (FIFO/FEFO). Label printed in EN/AR with barcode for verification scanning." },
    { step: 4, title: "Patient Counseling", desc: "Pharmacist provides medication counseling. Digital consent recorded. Instructions delivered in patient's language." },
    { step: 5, title: "Record & Audit", desc: "Dispensing recorded in FHIR MedicationDispense. Inventory updated. Controlled substances logged for regulatory audit." },
  ],
  "cymed-patient-portal": [
    { step: 1, title: "Register & Verify", desc: "Patient registers with national ID or mobile number. Identity verified via CyIdentity. FHIR Patient record linked." },
    { step: 2, title: "Book Appointment", desc: "Patient selects specialty, provider, and time slot. Confirmation sent via SMS and email. Reminder automated." },
    { step: 3, title: "View Health Records", desc: "Patient accesses complete medical history, lab results, medications, and visit summaries — all FHIR-native." },
    { step: 4, title: "Communicate with Provider", desc: "Secure encrypted messaging with care team. Telehealth consultation launched for remote visits." },
    { step: 5, title: "Pay & Manage", desc: "Patient pays bills online, views insurance claims, manages family accounts, and downloads vaccination records." },
  ],
  "cymed-provider-portal": [
    { step: 1, title: "Login & Verify Credentials", desc: "Provider authenticates via CyIdentity MFA. Credential and license status verified. Device registered for secure access." },
    { step: 2, title: "Manage Schedule", desc: "Provider sets availability, manages appointment slots, and configures templates for different appointment types." },
    { step: 3, title: "Access Patient Records", desc: "Provider views assigned patient panel, pending orders, and clinical documentation through FHIR-secured APIs." },
    { step: 4, title: "Document & Sign", desc: "Provider completes clinical notes, signs orders, and approves results. Electronic signature validated and audit-trailed." },
    { step: 5, title: "Track Performance", desc: "Provider views personal dashboards — productivity, patient satisfaction, quality metrics, and CME hours." },
  ],
  "cymed-revenue-cycle": [
    { step: 1, title: "Registration & Financial Counseling", desc: "Financial counselor verifies patient identity, captures insurance details, and provides cost estimate before service." },
    { step: 2, title: "Eligibility Verification", desc: "Real-time insurance eligibility check via EDI 270/271. Coverage details, deductibles, and copay amounts verified." },
    { step: 3, title: "Coding & Charge Capture", desc: "ICD-11 diagnoses and CPT procedures automatically suggested from clinical documentation. Coding specialist reviews." },
    { step: 4, title: "Claims Submission", desc: "Clean claims submitted electronically to payors via EDI 837. Status tracked in real time. Rejections flagged immediately." },
    { step: 5, title: "Payment & Reconciliation", desc: "Remittances (EDI 835) auto-posted. Denials managed with appeal workflow. AR aged and collections prioritized." },
  ],
  "cymed-population-health": [
    { step: 1, title: "Data Ingestion", desc: "Clinical data from EMR, lab, imaging, and pharmacy aggregated. FHIR-based population registry created and refreshed." },
    { step: 2, title: "Risk Stratification", desc: "AI risk models score patients by chronic disease risk, readmission risk, and preventive care gaps. Cohorts identified." },
    { step: 3, title: "Care Gap Identification", desc: "Preventive screenings, medication adherence, and chronic disease management gaps identified per patient." },
    { step: 4, title: "Care Program Enrollment", desc: "High-risk patients enrolled in disease management programs. Care coordinators assigned and outreach scheduled." },
    { step: 5, title: "Outcome Reporting", desc: "Quality measures (HEDIS, JAWDA) tracked and reported. Public health dashboards available for health ministry reporting." },
  ],
  "cycom": [
    { step: 1, title: "Chart of Accounts Setup", desc: "Configure chart of accounts per IFRS/GAAP, cost centers, departments, and fiscal year. Multi-currency enabled." },
    { step: 2, title: "Transactional Operations", desc: "AP, AR, GL, inventory, procurement, and payroll transactions processed with automatic journal entries and tax calculations." },
    { step: 3, title: "HR & Payroll Processing", desc: "Employee onboarding, leave management, payroll calculation with local compliance, and benefits administration." },
    { step: 4, title: "Procurement & Inventory", desc: "Purchase orders issued, received, and matched to invoices (3-way match). Inventory tracked across warehouses." },
    { step: 5, title: "Reporting & BI", desc: "Financial statements, dashboards, and custom BI reports generated. Data exported to CyData for advanced analytics." },
  ],
  "cygov": [
    { step: 1, title: "Citizen Service Request", desc: "Citizen submits request via CyCitizen portal or in-person kiosk. Digital identity verified via CyIdentity." },
    { step: 2, title: "Document Verification", desc: "Supporting documents uploaded and verified against national registry. Anti-fraud checks performed automatically." },
    { step: 3, title: "Government Workflow", desc: "Request routed through government workflow engine. Internal departments review, approve, or request additional info." },
    { step: 4, title: "Payment & Fee Collection", desc: "Citizen notified of fees. Online payment processed via integrated payment gateway. Receipt auto-generated." },
    { step: 5, title: "Issue & Archive", desc: "Approved license, permit, or certificate issued digitally. Archived in national registry. Citizen notified via SMS/email." },
  ],
  "cyidentity": [
    { step: 1, title: "Register Application", desc: "Application registered in CyIdentity admin portal. OAuth 2.1 client credentials issued. Redirect URIs configured." },
    { step: 2, title: "Configure Realm & Policies", desc: "Authentication policies, MFA requirements, session limits, and RBAC/ABAC rules configured per tenant." },
    { step: 3, title: "User Provisioning", desc: "Users provisioned via SCIM or manual admin console. Roles assigned. Groups configured for attribute-based control." },
    { step: 4, title: "SSO & MFA Authentication", desc: "User authenticates via PKCE flow. MFA challenge issued (TOTP, passkey, or SMS). Session token issued and validated." },
    { step: 5, title: "Audit & Compliance", desc: "All authentication events hash-chain audited. Compliance reports generated. Break Glass access logged and alerted." },
  ],
  "cyintegrationhub": [
    { step: 1, title: "Connect Source System", desc: "Source system connected via REST, HL7, FHIR, DICOM, SOAP, SFTP, or Kafka. Credentials and endpoint configured." },
    { step: 2, title: "Map & Transform Data", desc: "Source message mapped to target schema using visual transformation editor. Terminology mapped (ICD-9→ICD-11)." },
    { step: 3, title: "Route to Target", desc: "Transformed message routed to target system(s). Content-based routing rules applied. Duplicate detection enabled." },
    { step: 4, title: "Monitor & Alert", desc: "All message flows monitored in real-time dashboard. Failures trigger alerts via CyConnect. SLA compliance tracked." },
    { step: 5, title: "Audit Trail", desc: "Every message transaction logged with content, timing, and status. Replays enabled for failed messages." },
  ],
  "cyai": [
    { step: 1, title: "Connect Data Sources", desc: "CyData and clinical data sources connected. Training datasets prepared with governance and privacy controls applied." },
    { step: 2, title: "Configure AI Models", desc: "Clinical or enterprise AI models selected or custom models uploaded. Explainability (XAI) requirements configured." },
    { step: 3, title: "Generate Advisory Output", desc: "AI generates advisory recommendations. Never autonomous — all outputs are advisory for human review." },
    { step: 4, title: "Clinician Review & Act", desc: "All AI recommendations reviewed and accepted/rejected by qualified clinicians or operators. Human approval required." },
    { step: 5, title: "Track & Improve", desc: "Acceptance rates, accuracy, and drift monitored. Model performance dashboards track quality over time." },
  ],
  "cydata": [
    { step: 1, title: "Connect Data Sources", desc: "CyMed, CyCom, CyGov, and external data sources connected via native connectors and CyIntegrationHub adapters." },
    { step: 2, title: "ETL Pipeline Execution", desc: "Data extracted, transformed, and loaded into the lakehouse. Schema registry validates structure. Data quality rules applied." },
    { step: 3, title: "Build BI Dashboards", desc: "Analysts build dashboards using drag-and-drop BI tools. Charts, KPIs, and population health maps configured." },
    { step: 4, title: "Self-Service Analytics", desc: "Business users query data in plain language or SQL. AI-assisted query generation available via CyAI integration." },
    { step: 5, title: "Export & Share", desc: "Reports scheduled and auto-delivered by email or API. Raw data exports in CSV, Parquet, or FHIR Bundle format." },
  ],
  "cyconnect": [
    { step: 1, title: "Configure Channels", desc: "Notification channels configured: push, email, SMS, in-app. Clinical alert routing rules set by severity and recipient role." },
    { step: 2, title: "Send Clinical Notifications", desc: "Critical lab values, medication alerts, and care reminders sent automatically. Priority queuing ensures critical alerts arrive first." },
    { step: 3, title: "Secure Clinical Messaging", desc: "HIPAA-ready encrypted messaging between care team members. Message read receipts, attachments, and group chat supported." },
    { step: 4, title: "Video Conferencing", desc: "Telehealth consultation or team meeting launched from the clinical workflow. Recording optional with consent." },
    { step: 5, title: "Monitor Delivery", desc: "Delivery rates, read rates, and alert response times tracked on operations dashboard. Failed deliveries auto-retried." },
  ],
  "cycitizen": [
    { step: 1, title: "Citizen Registration", desc: "Citizen registers with national ID, mobile number, or biometric. CyIdentity provisions citizen account with MFA." },
    { step: 2, title: "Identity Verification", desc: "National ID verified against government registry. Biometric face match optional. Digital identity certificate issued." },
    { step: 3, title: "Browse Service Catalog", desc: "Citizen browses available government services. AI chatbot guides citizen to correct service and requirements." },
    { step: 4, title: "Submit & Track Request", desc: "Request submitted with supporting documents. Citizen receives reference number and real-time status updates." },
    { step: 5, title: "Receive Digital Documents", desc: "Approved documents delivered to citizen's digital wallet. QR code verification available for physical presentation." },
  ],
};

const LAUNCH_URLS: Record<string, string> = {
  "cymed": process.env.NEXT_PUBLIC_HEALTH_URL ?? "https://health.cy-com.com",
  "cymed-hospital": process.env.NEXT_PUBLIC_HOSPITAL_URL ?? "https://hospital.cy-com.com",
  "cymed-clinic": process.env.NEXT_PUBLIC_CLINIC_URL ?? "https://clinic.cy-com.com",
  "cymed-laboratory": process.env.NEXT_PUBLIC_LAB_URL ?? "https://lab.cy-com.com",
  "cymed-imaging": process.env.NEXT_PUBLIC_IMAGING_URL ?? "https://imaging.cy-com.com",
  "cymed-pharmacy": process.env.NEXT_PUBLIC_PHARMACY_URL ?? "https://pharmacy.cy-com.com",
  "cymed-patient-portal": process.env.NEXT_PUBLIC_HEALTH_URL ?? "https://health.cy-com.com",
  "cymed-provider-portal": process.env.NEXT_PUBLIC_PROVIDER_URL ?? "https://provider.cy-com.com",
  "cymed-revenue-cycle": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/rcm`,
  "cymed-population-health": `${process.env.NEXT_PUBLIC_HEALTH_URL ?? "https://health.cy-com.com"}/population`,
  "cycom": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/erp`,
  "cygov": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/gov`,
  "cyidentity": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/identity`,
  "cyintegrationhub": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/integration`,
  "cyai": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/ai`,
  "cydata": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/data`,
  "cyconnect": `${process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com"}/connect`,
  "cycitizen": process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com",
};

export async function generateStaticParams() {
  return Object.keys(PRODUCT_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = PRODUCT_DATA[slug];
  if (!product) return {};

  return buildMetadata({
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    path: `/products/${slug}`,
    locale,
  });
}

const COLOR_MAP: Record<string, { badge: string; btn: string; icon: string; gradient: string }> = {
  emerald: {
    badge: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    btn: "bg-emerald-500 hover:bg-emerald-400 text-white",
    icon: "bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-emerald-900/20 to-transparent",
  },
  blue: {
    badge: "text-blue-400 border-blue-500/20 bg-blue-500/5",
    btn: "bg-blue-500 hover:bg-blue-400 text-white",
    icon: "bg-blue-500/10 border-blue-500/20",
    gradient: "from-blue-900/20 to-transparent",
  },
  amber: {
    badge: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    btn: "bg-amber-500 hover:bg-amber-400 text-white",
    icon: "bg-amber-500/10 border-amber-500/20",
    gradient: "from-amber-900/20 to-transparent",
  },
  violet: {
    badge: "text-violet-400 border-violet-500/20 bg-violet-500/5",
    btn: "bg-violet-500 hover:bg-violet-400 text-white",
    icon: "bg-violet-500/10 border-violet-500/20",
    gradient: "from-violet-900/20 to-transparent",
  },
  cyan: {
    badge: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    btn: "bg-cyan-500 hover:bg-cyan-400 text-cy-black",
    icon: "bg-cyan-500/10 border-cyan-500/20",
    gradient: "from-cyan-900/20 to-transparent",
  },
  pink: {
    badge: "text-pink-400 border-pink-500/20 bg-pink-500/5",
    btn: "bg-pink-500 hover:bg-pink-400 text-white",
    icon: "bg-pink-500/10 border-pink-500/20",
    gradient: "from-pink-900/20 to-transparent",
  },
  teal: {
    badge: "text-teal-400 border-teal-500/20 bg-teal-500/5",
    btn: "bg-teal-500 hover:bg-teal-400 text-white",
    icon: "bg-teal-500/10 border-teal-500/20",
    gradient: "from-teal-900/20 to-transparent",
  },
  orange: {
    badge: "text-orange-400 border-orange-500/20 bg-orange-500/5",
    btn: "bg-cy-orange hover:bg-cy-orange-light text-white",
    icon: "bg-cy-orange/10 border-cy-orange/20",
    gradient: "from-orange-900/20 to-transparent",
  },
  indigo: {
    badge: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    btn: "bg-indigo-500 hover:bg-indigo-400 text-white",
    icon: "bg-indigo-500/10 border-indigo-500/20",
    gradient: "from-indigo-900/20 to-transparent",
  },
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  const product = PRODUCT_DATA[slug];

  if (!product) notFound();

  const colors = COLOR_MAP[product.color] ?? COLOR_MAP.emerald;
  const l = locale as Locale;
  const workflows = WORKFLOW_DATA[slug] ?? [];
  const launchUrl = LAUNCH_URLS[slug] ?? (process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com");
  const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.cy-com.com";

  return (
    <div className="min-h-dvh pt-16">
      {/* Hero */}
      <div className={`relative py-24 overflow-hidden bg-gradient-to-br ${colors.gradient}`}>
        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-xs text-cy-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href={`/${l}`} className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link href={`/${l}/products`} className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="max-w-3xl">
            <span className={`product-badge mb-4 ${colors.badge}`}>
              {product.categoryLabel}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-white mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-cy-gray-400 mb-6">{product.tagline}</p>
            <p className="text-base text-cy-gray-400 leading-relaxed mb-8 max-w-2xl">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-8" aria-label="Compliance standards">
              {product.compliance.map((c) => (
                <span key={c} className={`product-badge ${colors.badge}`}>
                  <Check className="w-3 h-3" aria-hidden="true" />
                  {c}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${l}/demo?product=${slug}`}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${colors.btn}`}
              >
                Request a Demo
                <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <a
                href={launchUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 btn-secondary px-6 py-3 text-sm"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                Launch Product
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
              <a
                href={`${docsUrl}/products/${slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 btn-ghost px-5 py-3 text-sm"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                Documentation
                <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-products (CyMed platform overview) */}
      {product.subProducts && (
        <section className="py-20 bg-cy-dark/30" aria-labelledby="subproducts-heading">
          <div className="section-container">
            <h2 id="subproducts-heading" className="text-2xl font-heading font-semibold text-white mb-4">
              CyMed Product Suite
            </h2>
            <p className="text-cy-gray-400 mb-8">
              Nine integrated clinical products covering every care setting — all FHIR-native, all on one platform.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.subProducts.map((sp) => (
                <Link
                  key={sp.slug}
                  href={`/${l}/products/${sp.slug}`}
                  className="glass-card p-5 rounded-xl hover:border-cy-glass-bg-hover transition-all duration-150 cursor-pointer group"
                >
                  <div className="text-sm font-heading font-semibold text-white group-hover:text-gradient-orange mb-1 transition-colors">
                    {sp.name}
                  </div>
                  <div className="text-xs text-cy-gray-400 leading-relaxed mb-3">{sp.desc}</div>
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    Learn more
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20" aria-labelledby="features-heading">
        <div className="section-container">
          <h2 id="features-heading" className="text-2xl font-heading font-semibold text-white mb-8">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 glass-card p-4 rounded-xl">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${colors.icon} border`}>
                  <Check className="w-3 h-3 text-white" aria-hidden="true" />
                </div>
                <span className="text-sm text-cy-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      {workflows.length > 0 && (
        <section className="py-20 bg-cy-dark/30" aria-labelledby="workflows-heading">
          <div className="section-container">
            <h2 id="workflows-heading" className="text-2xl font-heading font-semibold text-white mb-4">
              How It Works
            </h2>
            <p className="text-cy-gray-400 mb-10">
              End-to-end workflow in {product.name}.
            </p>
            <div className="relative">
              <div className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cy-glass-border to-transparent" aria-hidden="true" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {workflows.map((w) => (
                  <div key={w.step} className="glass-card p-5 rounded-2xl">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-heading font-bold mb-4 border ${colors.icon} ${colors.badge.split(" ")[0]}`}>
                      {w.step}
                    </div>
                    <h3 className="text-sm font-heading font-semibold text-white mb-2">{w.title}</h3>
                    <p className="text-xs text-cy-gray-400 leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Platform Preview */}
      <section className="py-20" aria-labelledby="preview-heading">
        <div className="section-container">
          <h2 id="preview-heading" className="text-2xl font-heading font-semibold text-white mb-4">
            Platform Preview
          </h2>
          <p className="text-cy-gray-400 mb-8">
            A modern, dark-first clinical interface designed for precision and efficiency.
          </p>
          <div className="rounded-2xl border border-cy-glass-border bg-cy-dark/40 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-cy-glass-border bg-cy-dark/60">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-5 rounded-md bg-cy-glass-bg border border-cy-glass-border w-48" aria-hidden="true" />
              </div>
              <div className={`text-xs px-2.5 py-1 rounded-lg font-medium ${colors.badge}`}>{product.name}</div>
            </div>
            <div className="flex min-h-[300px]">
              <div className="w-44 border-r border-cy-glass-border p-3 space-y-1.5 hidden md:block" aria-hidden="true">
                {product.features.slice(0, 6).map((_, i) => (
                  <div key={i} className={`h-7 rounded-lg px-2.5 flex items-center ${i === 0 ? `${colors.icon} border` : ""}`}>
                    <div className={`h-2 rounded-full ${i === 0 ? colors.badge.split(" ")[0].replace("text-", "bg-") : "bg-cy-glass-border"}`} style={{ width: `${40 + i * 9}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex-1 p-5" aria-hidden="true">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="glass-card rounded-xl p-3">
                      <div className="h-2 w-16 rounded bg-cy-glass-border mb-2" />
                      <div className={`h-5 w-10 rounded ${colors.badge.split(" ")[0].replace("text-", "bg-")} opacity-60`} />
                    </div>
                  ))}
                </div>
                <div className="glass-card rounded-xl p-4 mb-3">
                  <div className="h-2 w-32 rounded bg-cy-glass-border mb-3" />
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-3 items-center mb-2">
                      <div className="h-7 w-7 rounded-lg bg-cy-glass-bg border border-cy-glass-border flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 rounded bg-cy-glass-border" style={{ width: `${50 + i * 12}%` }} />
                        <div className="h-1.5 rounded bg-cy-glass-border opacity-50" style={{ width: `${30 + i * 8}%` }} />
                      </div>
                      <div className={`h-5 w-12 rounded-full ${i === 0 ? `${colors.icon} border` : "bg-cy-glass-bg border border-cy-glass-border"}`} />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-xl p-3 h-20">
                    <div className="h-2 w-20 rounded bg-cy-glass-border mb-2" />
                    <div className="flex items-end gap-1 h-10">
                      {[60, 80, 55, 90, 70, 85, 65].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t ${i === 3 ? `${colors.icon} border` : "bg-cy-glass-bg border border-cy-glass-border"}`} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-3 h-20">
                    <div className="h-2 w-16 rounded bg-cy-glass-border mb-2" />
                    {[80, 60, 90].map((w, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1">
                        <div className={`h-2 rounded-full ${colors.icon} border`} style={{ width: `${w}%` }} />
                        <div className="h-2 w-6 rounded bg-cy-glass-border" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-cy-gray-500 mt-3 text-center">
            Illustrative UI preview.{" "}
            <a href={launchUrl} target="_blank" rel="noreferrer" className="text-cy-orange hover:text-cy-orange-light transition-colors cursor-pointer">
              Launch the live product
            </a>{" "}
            to explore the full interface.
          </p>
        </div>
      </section>

      {/* Editions */}
      <section className="py-20 bg-cy-dark/30" aria-labelledby="editions-heading">
        <div className="section-container">
          <h2 id="editions-heading" className="text-2xl font-heading font-semibold text-white mb-8">
            Editions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.editions.map((edition, i) => (
              <div key={edition.name} className={`glass-card p-6 rounded-2xl border ${i === product.editions.length - 1 ? `border-${product.color}-500/30` : "border-cy-glass-border"}`}>
                <h3 className="font-heading font-semibold text-white mb-1">{edition.name}</h3>
                <p className="text-sm text-cy-gray-400 mb-4">{edition.desc}</p>
                <ul className="space-y-2">
                  {edition.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-cy-gray-200">
                      <Check className="w-3.5 h-3.5 text-cy-orange flex-shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${l}/demo?product=${slug}&edition=${encodeURIComponent(edition.name)}`}
                  className="mt-6 btn-secondary w-full justify-center text-sm"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="py-20" aria-labelledby="deployment-heading">
        <div className="section-container">
          <h2 id="deployment-heading" className="text-2xl font-heading font-semibold text-white mb-6">
            Deployment Models
          </h2>
          <div className="flex flex-wrap gap-3">
            {product.deployment.map((d) => (
              <div key={d} className="flex items-center gap-2 glass-card px-5 py-3 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-cy-orange" aria-hidden="true" />
                <span className="text-sm font-medium text-white">{d}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 glass-card p-8 rounded-2xl">
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-lg font-heading font-semibold text-white mb-1">
                  Ready to see {product.name} in action?
                </h3>
                <p className="text-sm text-cy-gray-400">
                  Schedule a personalized demo or launch the product to explore it live.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <Link
                  href={`/${l}/demo?product=${slug}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${colors.btn}`}
                >
                  Request Demo
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
                <a
                  href={launchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 btn-secondary px-5 py-2.5 text-sm"
                >
                  <Play className="w-4 h-4" aria-hidden="true" />
                  Launch Product
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
                <a
                  href={`${docsUrl}/products/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 btn-ghost px-5 py-2.5 text-sm"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
