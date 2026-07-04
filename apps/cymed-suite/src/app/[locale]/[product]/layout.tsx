import { notFound } from "next/navigation";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { getProduct } from "@/config/products";
import type { Locale } from "@/i18n/routing";

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product: productSlug } = await params;
  const product = getProduct(productSlug);
  if (!product) notFound();

  return (
    <div className="flex min-h-dvh">
      <Sidebar product={product} locale={locale} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar product={product} locale={locale as Locale} />
        <main className="flex-1 overflow-x-hidden bg-canvas p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
