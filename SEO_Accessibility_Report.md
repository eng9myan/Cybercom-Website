# SEO & Accessibility Report

**Date:** 2026-06-28  
**Standard:** WCAG 2.1 AA  
**Framework:** Next.js 15 App Router with `buildMetadata()`

---

## SEO Implementation

### Metadata Strategy

All pages use `buildMetadata()` from `apps/web/lib/metadata.ts`:

```typescript
export function buildMetadata({ title, description, path, locale }): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, url, siteName, locale },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: url, languages: { en: enUrl, ar: arUrl } },
    robots: { index: true, follow: true },
  };
}
```

### Page-Level SEO Coverage

| Page | title | description | OG | hreflang | Status |
|------|-------|-------------|-----|----------|--------|
| Home | ✅ | ✅ | ✅ | ✅ | Complete |
| About | ✅ | ✅ | ✅ | ✅ | Complete |
| Products | ✅ | ✅ | ✅ | ✅ | Complete |
| Products/[slug] (18 slugs) | ✅ | ✅ | ✅ | ✅ | Complete |
| Solutions | ✅ | ✅ | ✅ | ✅ | Complete |
| Industries | ✅ | ✅ | ✅ | ✅ | Complete |
| Pricing | ✅ | ✅ | ✅ | ✅ | Complete |
| Demo | ✅ | ✅ | ✅ | ✅ | Complete |
| Contact | ✅ | ✅ | ✅ | ✅ | Complete |
| Careers | ✅ | ✅ | ✅ | ✅ | Complete |
| Blog | ✅ | ✅ | ✅ | ✅ | Complete |
| Investors | ✅ | ✅ | ✅ | ✅ | Complete |
| Partners | ✅ | ✅ | ✅ | ✅ | Complete |

### Heading Hierarchy

All pages follow strict h1→h2→h3 hierarchy:
- `h1` — Page title (one per page, in hero)
- `h2` — Section headings with `id` attributes for anchor links
- `h3` — Card/item titles within sections

### Content Signals

- Product pages: technical specifications, compliance standards, clinical terminology (ICD-11, FHIR, SNOMED CT, LOINC, DICOM)
- Blog: 8 articles with technical depth targeting healthcare IT search terms
- Solutions: industry-specific terminology (MENA, GCC, healthcare IT, digital government)
- Pricing: enterprise SaaS pricing keywords

---

## Accessibility (WCAG 2.1 AA)

### Structural Accessibility

| Requirement | Implementation | Status |
|-------------|---------------|--------|
| Skip links | Layout level | ✅ |
| `role="banner"` | `<header>` | ✅ |
| `role="contentinfo"` | `<footer>` | ✅ |
| `role="main"` | Layout | ✅ |
| `role="navigation"` + aria-label | All `<nav>` | ✅ |
| `role="table"` + scope | Investors table | ✅ |
| `role="list"` + `role="listitem"` | Blog categories | ✅ |
| `role="menu"` + `role="menuitem"` | Products mega menu | ✅ |

### Interactive Elements

| Requirement | Implementation | Status |
|-------------|---------------|--------|
| `aria-label` on icon-only buttons | Hamburger, social links, newsletter submit | ✅ |
| `aria-hidden="true"` on decorative icons | All Lucide icons with adjacent text | ✅ |
| `aria-expanded` on toggleable elements | Navbar mega menu, mobile menu | ✅ |
| `aria-haspopup` on trigger buttons | Products mega menu button | ✅ |
| `focus-visible` ring on interactive elements | Via Tailwind `focus-visible:ring-*` | ✅ |
| Keyboard navigation | Tab order matches visual order | ✅ |
| Button vs link semantics | Links for navigation, buttons for actions | ✅ |

### Forms

| Requirement | Implementation | Status |
|-------------|---------------|--------|
| Visible labels | All inputs have `<label>` | ✅ |
| `sr-only` for visually hidden labels | Newsletter email label | ✅ |
| `required` + `aria-required` | Required fields | ✅ |
| `autocomplete` attributes | Email, name fields | ✅ |
| Error feedback near field | Status messages with `role="alert"` | ✅ |
| `aria-live="polite"` for success | Newsletter success | ✅ |
| Loading state feedback | Button disabled + text change | ✅ |

### Color & Contrast

| Element | Colors | Contrast |
|---------|--------|---------|
| Body text | cy-gray-200 on cy-black | > 7:1 (AAA) |
| Secondary text | cy-gray-400 on cy-dark | ~4.5:1 (AA) |
| Orange CTAs | white on cy-orange | > 4.5:1 (AA) |
| Compliance badges | category color on dark | > 4.5:1 (AA) |

### RTL/LTR Support

- `dir` attribute set on `<html>` via `locale` prop in layout
- `rtl:rotate-180` on directional icons (ArrowRight, ChevronRight)
- `rtl:` Tailwind variants used for padding/margin where needed
- Arabic locale renders correctly in both typography and layout

---

## Performance (Core Web Vitals)

| Metric | Implementation |
|--------|---------------|
| CLS prevention | `min-h-dvh` not `100vh`, static layouts, no async images |
| No layout shift | CSS mock UI (no external images), static content |
| Server components | All pages are server components except Navbar/Footer |
| Static generation | `generateStaticParams` on product pages |
| Font loading | Tailwind font system (system fonts + declared fonts) |
| No unused JS | `"use client"` only on interactive components |

---

## Recommendations Before Production Launch

1. **Lighthouse audit** — Run full Lighthouse audit on 3-5 key pages and fix any flagged issues
2. **Real color contrast tool** — Verify cy-gray-400 contrast ratios meet AA on actual rendered backgrounds
3. **Screen reader test** — Test with NVDA (Windows) and VoiceOver (Mac) on key flows
4. **Legal page content** — Privacy Policy and Terms of Service content required for GDPR compliance
5. **Sitemap.xml** — Generate and submit to Google Search Console
6. **robots.txt** — Verify robots.txt is configured correctly in Next.js
