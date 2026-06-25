"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import { type Locale } from "@/lib/i18n";

interface HeroProps {
  locale: Locale;
}

const COMPLIANCE_BADGES = [
  { label: "FHIR R4", color: "text-cy-cyan border-cy-cyan/20 bg-cy-cyan/5" },
  { label: "ICD-11", color: "text-cy-orange border-cy-orange/20 bg-cy-orange/5" },
  { label: "SNOMED CT", color: "text-violet-400 border-violet-400/20 bg-violet-400/5" },
  { label: "OIDC", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" },
  { label: "HIPAA Ready", color: "text-sky-400 border-sky-400/20 bg-sky-400/5" },
];

const STATS = [
  { value: "9", label: "Integrated Platforms", sub: "One unified ecosystem" },
  { value: "FHIR", label: "Native Standard", sub: "R4 & R5 compliant" },
  { value: "OAuth 2.1", label: "Security Standard", sub: "Zero Trust architecture" },
];

export function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center pt-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="glow-orb w-[800px] h-[800px] -top-64 left-1/2 -translate-x-1/2 bg-cy-orange/8 animate-glow-pulse" />
        <div className="glow-orb w-[600px] h-[600px] top-1/3 -left-64 bg-cy-cyan/6" />
        <div className="glow-orb w-[400px] h-[400px] bottom-0 right-0 bg-violet-500/5" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cy-orange/20 bg-cy-orange/5 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cy-orange animate-pulse" aria-hidden="true" />
          <span className="text-xs font-medium text-cy-orange tracking-wider uppercase">
            {t("tagline")}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          id="hero-heading"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-semibold text-white leading-[1.05] tracking-tight max-w-5xl mx-auto"
        >
          <span className="block">{t("headline1")}</span>
          <span className="block">{t("headline2")}</span>
          <span className="block text-gradient">{t("headline3")}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mt-6 text-lg sm:text-xl text-cy-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* Compliance badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
          aria-label="Compliance and standards certifications"
        >
          {COMPLIANCE_BADGES.map((badge) => (
            <span
              key={badge.label}
              className={`product-badge text-xs ${badge.color}`}
            >
              {badge.label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href={`/${locale}/demo`}
            className="btn-primary text-base px-8 py-3.5 group"
          >
            {t("cta.demo")}
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180"
              aria-hidden="true"
            />
          </Link>
          <Link
            href={`/${locale}/products`}
            className="btn-secondary text-base px-8 py-3.5 group"
          >
            {t("cta.explore")}
            <ChevronRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px bg-cy-glass-border max-w-3xl mx-auto rounded-2xl overflow-hidden border border-cy-glass-border"
          role="list"
          aria-label="Platform highlights"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-cy-dark/80 backdrop-blur-sm p-6 text-center"
              role="listitem"
            >
              <div className="font-heading font-bold text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-cy-gray-200">{stat.label}</div>
              <div className="text-xs text-cy-gray-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-cy-glass-border to-transparent animate-pulse" />
        <span className="text-2xs text-cy-gray-600 uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}
