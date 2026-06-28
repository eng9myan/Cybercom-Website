import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { type Locale } from "@/lib/i18n";
import { ArrowRight, Key, CreditCard, Headphones, Download, BarChart2, Settings, Shield, CheckCircle } from "lucide-react";

interface PortalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PortalPageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return buildMetadata({
    title: "Customer Portal — CyberCom Platform",
    description:
      "Manage your CyberCom licenses, subscriptions, support tickets, and billing from one secure customer portal. Available 24/7 for all CyberCom customers.",
    path: "/portal",
    locale,
  });
}

const CAPABILITIES = [
  {
    icon: Key,
    title: "License Management",
    desc: "Activate, deactivate, and renew your product licenses. Generate offline tokens for air-gapped deployments. View usage across facilities.",
  },
  {
    icon: CreditCard,
    title: "Billing & Subscriptions",
    desc: "View invoices, manage subscription billing cycles, update payment methods, and download tax receipts in multiple currencies.",
  },
  {
    icon: Headphones,
    title: "Support Center",
    desc: "Submit and track support tickets with SLA tracking. Attach screenshots and logs. Chat directly with assigned support engineers.",
  },
  {
    icon: Download,
    title: "Software Downloads",
    desc: "Access certified installers, patches, hotfixes, and release notes. Download on-premise deployment packages and migration tools.",
  },
  {
    icon: BarChart2,
    title: "Usage Analytics",
    desc: "Monitor active sessions, user counts, feature utilization, and compliance status across all your deployed products.",
  },
  {
    icon: Settings,
    title: "White Label Config",
    desc: "Configure custom branding, logos, colors, and domain names for your CyberCom deployment. Manage email templates and login pages.",
  },
];

const ACCESS_LEVELS = [
  {
    level: "Viewer",
    desc: "Read-only access to licenses, invoices, and system status",
    features: ["View licenses", "View invoices", "System status", "Documentation"],
  },
  {
    level: "Standard",
    featured: true,
    desc: "Full access for IT administrators and operations teams",
    features: ["All Viewer features", "Submit support tickets", "Download software", "View analytics"],
  },
  {
    level: "Admin",
    desc: "Full control for account owners and technical leads",
    features: ["All Standard features", "Manage licenses", "Manage billing", "Configure white label", "Manage portal users"],
  },
];

const SUPPORT_SLAS = [
  { priority: "Critical", response: "1 hour", resolution: "4 hours", badge: "bg-red-500/10 text-red-400 border-red-500/20" },
  { priority: "High", response: "4 hours", resolution: "1 business day", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { priority: "Medium", response: "1 business day", resolution: "3 business days", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { priority: "Low", response: "2 business days", resolution: "5 business days", badge: "bg-cy-glass-bg text-cy-gray-400 border-cy-glass-border" },
];

export default async function PortalPage({ params }: PortalPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.cy-com.com";

  return (
    <div className="min-h-dvh pt-16">
      {/* Hero */}
      <div className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-orb w-[600px] h-[600px] -top-32 right-0 bg-cy-orange/5" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="product-badge text-cy-orange border-cy-orange/20 bg-cy-orange/5 mb-6">
              Customer Portal
            </span>
            <h1 className="text-5xl lg:text-6xl font-heading font-semibold text-white mb-6 leading-tight">
              Everything you need,{" "}
              <span className="text-gradient">in one place</span>
            </h1>
            <p className="text-xl text-cy-gray-400 mb-10 leading-relaxed">
              The CyberCom Customer Portal gives your team full control over licenses,
              subscriptions, support, and software — available 24/7 from any device.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={portalUrl}
                className="btn-primary px-8 py-3"
                target="_blank"
                rel="noreferrer"
              >
                Sign in to Portal
                <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <Link href={`/${l}/demo`} className="btn-secondary px-8 py-3">
                Request Access
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <section className="py-20 bg-cy-dark/30" aria-labelledby="capabilities-heading">
        <div className="section-container">
          <h2 id="capabilities-heading" className="text-3xl font-heading font-semibold text-white mb-4 text-center">
            Portal capabilities
          </h2>
          <p className="text-cy-gray-400 text-center mb-12 max-w-2xl mx-auto">
            One portal. Complete lifecycle management for every CyberCom product your organization runs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.title} className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-cy-glass-bg border border-cy-glass-border flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cy-orange" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-cy-gray-400 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Access levels */}
      <section className="py-20" aria-labelledby="access-heading">
        <div className="section-container">
          <h2 id="access-heading" className="text-3xl font-heading font-semibold text-white mb-4 text-center">
            Role-based access
          </h2>
          <p className="text-cy-gray-400 text-center mb-12 max-w-xl mx-auto">
            Grant each team member the right level of access. Managed by your portal admin.
          </p>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {ACCESS_LEVELS.map((al) => (
              <div
                key={al.level}
                className={`glass-card p-6 rounded-2xl flex flex-col ${al.featured ? "border-cy-orange/40" : "border-cy-glass-border"}`}
              >
                {al.featured && (
                  <span className="text-2xs font-semibold text-cy-orange mb-3">Recommended</span>
                )}
                <h3 className="text-lg font-heading font-semibold text-white mb-1">{al.level}</h3>
                <p className="text-xs text-cy-gray-400 mb-5">{al.desc}</p>
                <ul className="space-y-2 flex-1">
                  {al.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-cy-gray-200">
                      <CheckCircle className="w-3.5 h-3.5 text-cy-orange flex-shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support SLAs */}
      <section className="py-20 bg-cy-dark/30" aria-labelledby="sla-heading">
        <div className="section-container max-w-3xl">
          <h2 id="sla-heading" className="text-3xl font-heading font-semibold text-white mb-4 text-center">
            Support SLAs
          </h2>
          <p className="text-cy-gray-400 text-center mb-10">
            All support tickets submitted via the portal are tracked with guaranteed response and resolution times.
          </p>
          <div className="space-y-3">
            {SUPPORT_SLAS.map((sla) => (
              <div key={sla.priority} className="glass-card p-5 rounded-xl flex items-center gap-5">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${sla.badge} min-w-[80px] text-center`}>
                  {sla.priority}
                </span>
                <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-cy-gray-400 text-xs">First Response</span>
                    <div className="text-white font-medium">{sla.response}</div>
                  </div>
                  <div>
                    <span className="text-cy-gray-400 text-xs">Resolution Target</span>
                    <div className="text-white font-medium">{sla.resolution}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20" aria-labelledby="security-heading">
        <div className="section-container">
          <div className="glass-card p-10 lg:p-14 rounded-3xl grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 id="security-heading" className="text-3xl font-heading font-semibold text-white mb-4">
                Enterprise-grade security
              </h2>
              <p className="text-cy-gray-400 leading-relaxed mb-6">
                The portal is protected by CyIdentity — CyberCom's Zero Trust identity platform.
                All sessions are MFA-enforced, audit-logged, and scoped to your tenant.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={portalUrl} className="btn-primary px-8 py-3" target="_blank" rel="noreferrer">
                  Access Portal
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </a>
                <Link href={`/${l}/contact`} className="btn-secondary px-8 py-3">
                  Contact Support
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {[
                "MFA-enforced login (TOTP, passkeys, WebAuthn)",
                "SSO integration with corporate IdPs (SAML, OIDC)",
                "All actions audit-logged with user + IP + timestamp",
                "Session-scoped to your tenant — cross-tenant isolation",
                "SOC 2 Type II compliant platform",
                "GDPR and PDPL data protection controls",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-cy-gray-300">
                  <Shield className="w-4 h-4 text-cy-orange flex-shrink-0" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
