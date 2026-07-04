import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, LOCALE_META, type Locale } from "@/i18n/routing";
import { RoleProvider } from "@/components/shell/role-provider";
import { SidebarProvider } from "@/components/shell/sidebar-provider";

export const metadata: Metadata = {
  title: "CyberCom Suite",
  description: "Every module. One plane.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const dir = LOCALE_META[locale as Locale].dir;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className="dark">
      <body className="min-h-dvh bg-canvas text-foreground antialiased">
        <NextIntlClientProvider>
          <RoleProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </RoleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
