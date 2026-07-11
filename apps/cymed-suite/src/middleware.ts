import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Must match bare product paths too (e.g. "/hospital"), not just "/" and
  // "/en|ar/:path*" -- routing.localePrefix is "always", so every product's
  // canonical URL (see products.ts subdomain field, e.g.
  // "cymed.cy-com.com/hospital") only resolves if this middleware runs on
  // the un-prefixed path and redirects it to "/en/hospital". The previous
  // matcher skipped bare paths entirely, so they fell through to Next's
  // file-based router (no page outside src/app/[locale]/...) and 404'd.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
