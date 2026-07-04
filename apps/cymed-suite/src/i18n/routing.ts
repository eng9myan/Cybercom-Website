import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar"] as const,
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const LOCALE_META: Record<Locale, { dir: "ltr" | "rtl"; label: string; nativeLabel: string }> = {
  en: { dir: "ltr", label: "English", nativeLabel: "English" },
  ar: { dir: "rtl", label: "Arabic", nativeLabel: "العربية" },
};
