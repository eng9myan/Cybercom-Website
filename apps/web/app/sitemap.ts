import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

const routes = [
  "",
  "/about",
  "/blog",
  "/careers",
  "/contact",
  "/demo",
  "/industries",
  "/investors",
  "/marketplace",
  "/partners",
  "/pricing",
  "/products",
  "/solutions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ["en", "ar"].flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en${route}`,
          ar: `${siteConfig.url}/ar${route}`,
        },
      },
    })),
  );
}
