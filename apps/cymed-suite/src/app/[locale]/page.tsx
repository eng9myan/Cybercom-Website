import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const ACCENT_BG: Record<string, string> = {
  hospital: "from-product-hospital/20 to-product-hospital/5 border-product-hospital/30 text-product-hospital",
  clinic: "from-product-clinic/20 to-product-clinic/5 border-product-clinic/30 text-product-clinic",
  pharmacy: "from-product-pharmacy/20 to-product-pharmacy/5 border-product-pharmacy/30 text-product-pharmacy",
  laboratory: "from-product-laboratory/20 to-product-laboratory/5 border-product-laboratory/30 text-product-laboratory",
  imaging: "from-product-imaging/20 to-product-imaging/5 border-product-imaging/30 text-product-imaging",
  cyshop: "from-product-cyshop/20 to-product-cyshop/5 border-product-cyshop/30 text-product-cyshop",
  erp: "from-product-erp/20 to-product-erp/5 border-product-erp/30 text-product-erp",
};

export default async function Landing({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 py-16">
      <div className="mb-10 flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-raised px-3 py-1 text-2xs uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-3 w-3 text-accent" /> Beta preview
        </div>
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("landing.title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("landing.subtitle")}</p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.slug}
              href={`/${locale}/${p.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 transition-all hover:-translate-y-0.5 hover:shadow-raised",
                ACCENT_BG[p.accent]
              )}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-lg bg-canvas/60",
                    "border border-current/30"
                  )}
                >
                  <Icon className="h-5 w-5 text-current" />
                </div>
                <ArrowRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1 rtl-flip" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
                <p className="mt-3 text-xs text-current opacity-90">{p.hero}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.modules.slice(0, 4).map((m) => (
                  <span
                    key={m.slug}
                    className="rounded bg-canvas/40 px-1.5 py-0.5 text-2xs text-muted-foreground ring-1 ring-inset ring-border/40"
                  >
                    {m.title}
                  </span>
                ))}
                {p.modules.length > 4 ? (
                  <span className="rounded bg-canvas/40 px-1.5 py-0.5 text-2xs text-muted-foreground ring-1 ring-inset ring-border/40">
                    +{p.modules.length - 4}
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium">Locale:</span>
        {(["en", "ar"] as const).map((l) => (
          <Link
            key={l}
            href={`/${l}`}
            className={cn(
              "rounded-md border border-border px-2 py-0.5 uppercase transition-colors hover:bg-surface-raised hover:text-foreground",
              l === locale && "bg-surface-raised text-foreground"
            )}
          >
            {l}
          </Link>
        ))}
      </div>
    </main>
  );
}
