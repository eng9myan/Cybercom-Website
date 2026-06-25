import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, localeMetadata, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: {
      default: "CyberCom Revolution",
      template: `%s | CyberCom Revolution`,
    },
    description: locale === "ar"
      ? "تحويل الرعاية الصحية والحكومة والمؤسسات عبر المنصات الذكية."
      : "Transforming Healthcare, Government and Enterprise through intelligent platforms.",
    other: { "lang": locale },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const meta = localeMetadata[locale as Locale];

  return (
    <html lang={locale} dir={meta.dir} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {locale === "ar" && (
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        )}
      </head>
      <body className="bg-cy-black text-white antialiased font-body min-h-dvh flex flex-col">
        <a href="#main-content" className="skip-link">
          {locale === "ar" ? "تخطي إلى المحتوى الرئيسي" : "Skip to main content"}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale as Locale} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
