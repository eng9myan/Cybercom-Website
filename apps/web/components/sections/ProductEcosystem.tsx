"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProductEcosystemProps {
  locale: Locale;
}

const PRODUCTS = [
  {
    id: "cymed",
    name: "CyMed",
    slug: "cymed-clinic",
    tagline: "Healthcare Platform",
    color: "from-emerald-500 to-teal-500",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "bg-emerald-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-emerald-400">
        <path d="M9 12h6m-3-3v6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
    capabilities: ["ICD-11 Native", "FHIR R4/R5", "AI Clinical", "Multi-Tenant"],
    products: ["Clinic", "Hospital", "Laboratory", "Imaging", "Pharmacy"],
  },
  {
    id: "cycom",
    name: "CyCom",
    slug: "cycom",
    tagline: "ERP Platform",
    color: "from-blue-500 to-indigo-500",
    border: "border-blue-500/20 hover:border-blue-500/40",
    glow: "bg-blue-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-blue-400">
        <path d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" />
      </svg>
    ),
    capabilities: ["Finance", "HR & Payroll", "Procurement", "Manufacturing"],
    products: ["Finance", "HR", "CRM", "Inventory", "Manufacturing"],
  },
  {
    id: "cygov",
    name: "CyGov",
    slug: "cygov",
    tagline: "Government Platform",
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/20 hover:border-amber-500/40",
    glow: "bg-amber-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-amber-400">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V13h6v8" />
      </svg>
    ),
    capabilities: ["Citizen Services", "National Registries", "Digital ID", "E-Permits"],
    products: ["Services", "Licensing", "Registries", "Workflows"],
  },
  {
    id: "cyidentity",
    name: "CyIdentity",
    slug: "cyidentity",
    tagline: "Identity Platform",
    color: "from-violet-500 to-purple-500",
    border: "border-violet-500/20 hover:border-violet-500/40",
    glow: "bg-violet-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-violet-400">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    capabilities: ["OAuth 2.1", "OIDC", "Passkeys", "Zero Trust"],
    products: ["SSO", "RBAC", "ABAC", "MFA"],
  },
  {
    id: "cyintegrationhub",
    name: "CyIntegrationHub",
    slug: "cyintegrationhub",
    tagline: "Integration Platform",
    color: "from-cyan-500 to-sky-500",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    glow: "bg-cyan-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-cyan-400">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
      </svg>
    ),
    capabilities: ["FHIR", "HL7 v2/v3", "DICOM", "Kafka"],
    products: ["REST", "SOAP", "LDAP", "EDI", "SFTP"],
  },
  {
    id: "cyai",
    name: "CyAI",
    slug: "cyai",
    tagline: "AI Platform",
    color: "from-pink-500 to-rose-500",
    border: "border-pink-500/20 hover:border-pink-500/40",
    glow: "bg-pink-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-pink-400">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 12c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
    capabilities: ["Clinical AI", "Predictive", "NLP", "Computer Vision"],
    products: ["Clinical", "Government", "Enterprise", "Analytics"],
  },
  {
    id: "cydata",
    name: "CyData",
    slug: "cydata",
    tagline: "Data Platform",
    color: "from-teal-500 to-green-500",
    border: "border-teal-500/20 hover:border-teal-500/40",
    glow: "bg-teal-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-teal-400">
        <path d="M21 5c0 1.657-4.03 3-9 3S3 6.657 3 5m18 0c0-1.657-4.03-3-9-3S3 3.343 3 5m18 0v7M3 5v7m18 0c0 1.657-4.03 3-9 3s-9-1.343-9-3m18 0v7c0 1.657-4.03 3-9 3s-9-1.343-9-3v-7" />
      </svg>
    ),
    capabilities: ["Lakehouse", "BI Analytics", "Data Gov", "Population Health"],
    products: ["Lakehouse", "Analytics", "BI", "Governance"],
  },
  {
    id: "cyconnect",
    name: "CyConnect",
    slug: "cyconnect",
    tagline: "Communications Platform",
    color: "from-orange-500 to-yellow-500",
    border: "border-orange-500/20 hover:border-orange-500/40",
    glow: "bg-orange-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange-400">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      </svg>
    ),
    capabilities: ["Messaging", "Notifications", "Video", "Collaboration"],
    products: ["Messaging", "Alerts", "Video", "Chat"],
  },
  {
    id: "cycitizen",
    name: "CyCitizen",
    slug: "cycitizen",
    tagline: "Citizen Platform",
    color: "from-indigo-500 to-blue-500",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    glow: "bg-indigo-500/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-indigo-400">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    capabilities: ["Citizen Portal", "Digital Wallet", "National ID", "Gov Services"],
    products: ["Portal", "Wallet", "Identity", "Services"],
  },
];

export function ProductEcosystem({ locale }: ProductEcosystemProps) {
  const t = useTranslations("products");
  const shouldReduce = useReducedMotion();
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  return (
    <section className="py-32 relative" aria-labelledby="ecosystem-heading">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="glow-orb w-[600px] h-[600px] top-0 right-0 bg-cy-cyan/4" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-cy-orange mb-3 uppercase tracking-wider">Platform Suite</p>
            <h2 id="ecosystem-heading" className="text-4xl lg:text-5xl font-heading font-semibold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-cy-gray-400 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/${locale}/products/${product.slug}`}
                className={cn(
                  "glass-card block p-6 rounded-2xl border transition-all duration-300 group cursor-pointer",
                  product.border
                )}
                onMouseEnter={() => setActiveProduct(product.id)}
                onMouseLeave={() => setActiveProduct(null)}
                aria-label={`${product.name} — ${product.tagline}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", product.glow, "border border-current/10")}>
                    {product.icon}
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-cy-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 rtl:rotate-180"
                    aria-hidden="true"
                  />
                </div>

                {/* Name */}
                <div className={cn("text-lg font-heading font-semibold bg-gradient-to-r bg-clip-text text-transparent mb-0.5", product.color)}>
                  {product.name}
                </div>
                <div className="text-xs text-cy-gray-400 mb-3 font-medium">{product.tagline}</div>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1.5">
                  {product.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-2xs px-2 py-0.5 rounded-md bg-cy-glass-bg border border-cy-glass-border text-cy-gray-400"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                {/* Products list — shown on hover */}
                <AnimatePresence>
                  {activeProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-cy-glass-border">
                        <div className="flex flex-wrap gap-1">
                          {product.products.map((p) => (
                            <span key={p} className="text-2xs text-cy-gray-400 px-1.5 py-0.5 rounded bg-cy-glass-bg">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href={`/${locale}/products`} className="btn-secondary px-8 py-3">
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
