import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { type Locale } from "@/lib/i18n";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Static product definitions — in production these come from the CyberCom Platform API
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
}> = {
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
      {
        name: "Clinic Starter",
        desc: "For small clinics up to 5 providers",
        features: ["Core EMR", "Scheduling", "Billing", "Patient records"],
      },
      {
        name: "Clinic Professional",
        desc: "For multi-specialty practices",
        features: ["All Starter features", "Multi-specialty", "Lab integration", "Pharmacy", "Analytics"],
      },
      {
        name: "Clinic Enterprise",
        desc: "For clinic chains and networks",
        features: ["All Professional features", "Multi-branch", "API access", "Custom workflows", "24/7 SLA"],
      },
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
      {
        name: "Hospital Core",
        desc: "For hospitals up to 200 beds",
        features: ["ADT", "EMR", "Nursing", "Billing", "Laboratory integration"],
      },
      {
        name: "Hospital Advanced",
        desc: "For hospitals 200-500 beds",
        features: ["All Core features", "OR Management", "ICU", "Blood Bank", "PACS integration"],
      },
      {
        name: "Hospital Enterprise",
        desc: "For large hospitals and health systems",
        features: ["All Advanced features", "Multi-facility", "Population health", "AI clinical decision support", "24/7 SLA"],
      },
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
      {
        name: "Lab Core",
        desc: "Clinical chemistry & hematology",
        features: ["Core test catalog", "Basic QC", "Analyzer interface", "FHIR results"],
      },
      {
        name: "Lab Full",
        desc: "Full-service laboratory",
        features: ["All Core features", "Microbiology", "Blood bank", "Auto-verification", "Advanced QC"],
      },
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
      {
        name: "Imaging Core",
        desc: "Basic RIS with PACS connectivity",
        features: ["RIS workflow", "DICOM viewer", "Basic reporting"],
      },
      {
        name: "Imaging Advanced",
        desc: "Full RIS with AI capabilities",
        features: ["All Core features", "AI image analysis", "3D visualization", "Teleradiology", "Advanced structured reporting"],
      },
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
      {
        name: "Pharmacy Core",
        desc: "Retail & hospital pharmacy dispensing",
        features: ["Dispensing", "Inventory", "Drug interactions", "Basic reporting"],
      },
      {
        name: "Pharmacy Clinical",
        desc: "Full clinical pharmacy operations",
        features: ["All Core features", "Clinical review", "IV admixture", "Narcotic tracking", "Analytics"],
      },
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
      "AI platform delivering clinical AI, government AI, enterprise automation, predictive analytics, and NLP across the CyberCom ecosystem.",
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

  return (
    <div className="min-h-dvh pt-16">
      {/* Hero */}
      <div className={`relative py-24 overflow-hidden bg-gradient-to-br ${colors.gradient}`}>
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-cy-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href={`/${l}`} className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${l}/products`} className="hover:text-white transition-colors">Products</Link>
            <span aria-hidden="true">/</span>
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

            {/* Compliance */}
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
              <Link href={`/${l}/contact`} className="btn-secondary">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

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
                  href={`/${l}/demo?product=${slug}&edition=${edition.name}`}
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

          {/* CTA */}
          <div className="mt-12 glass-card p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-heading font-semibold text-white mb-1">
                Ready to see {product.name} in action?
              </h3>
              <p className="text-sm text-cy-gray-400">
                Schedule a personalized demo with our {product.categoryLabel} specialists.
              </p>
            </div>
            <Link href={`/${l}/demo?product=${slug}`} className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${colors.btn}`}>
              Request Demo
              <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
