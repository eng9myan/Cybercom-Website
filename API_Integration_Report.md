# API Integration Report

**Date:** 2026-06-28  
**Package:** `@cybercom/api` (`packages/api/src/`)

---

## Summary

The website uses a dedicated `@cybercom/api` package as the complete client-side API layer. All forms connect through this layer. Environment variables drive all URLs with safe fallbacks.

---

## API Client Architecture

```
packages/api/src/
├── client.ts         # Axios/fetch base client with base URL + auth headers
├── contact.ts        # Contact form + newsletter subscription
├── demo.ts           # Demo request submission
├── products.ts       # Product data endpoints (optional, currently static)
└── index.ts          # Barrel exports
```

---

## API Surface Used by Website

### Demo Request
```typescript
import { demoApi } from "@cybercom/api";
await demoApi.requestDemo({ 
  full_name, email, phone, job_title, company, 
  company_size, country, product_interests, message,
  preferred_time, gdpr_consent 
});
// Returns: { reference_number: string }
```

**Used in:** `apps/web/app/[locale]/demo/page.tsx` via `<DemoSection>`

### Contact Form
```typescript
import { contactApi } from "@cybercom/api";
await contactApi.submitContact({
  full_name, email, phone, department, message, gdpr_consent
});
```

**Used in:** `apps/web/app/[locale]/contact/page.tsx`

### Newsletter Subscription
```typescript
import { contactApi } from "@cybercom/api";
await contactApi.subscribeNewsletter({
  email, source: "footer", gdpr_consent: true
});
```

**Used in:** `apps/web/components/layout/Footer.tsx`

---

## Environment Variables

| Variable | Default Fallback | Usage |
|----------|-----------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.cy-com.com` | API base URL |
| `NEXT_PUBLIC_PORTAL_URL` | `https://portal.cy-com.com` | Customer portal |
| `NEXT_PUBLIC_HOSPITAL_URL` | `https://hospital.cy-com.com` | CyMed Hospital |
| `NEXT_PUBLIC_CLINIC_URL` | `https://clinic.cy-com.com` | CyMed Clinic |
| `NEXT_PUBLIC_LAB_URL` | `https://lab.cy-com.com` | CyMed Laboratory |
| `NEXT_PUBLIC_IMAGING_URL` | `https://imaging.cy-com.com` | CyMed Imaging |
| `NEXT_PUBLIC_PHARMACY_URL` | `https://pharmacy.cy-com.com` | CyMed Pharmacy |
| `NEXT_PUBLIC_HEALTH_URL` | `https://health.cy-com.com` | Patient Portal / Health |
| `NEXT_PUBLIC_PROVIDER_URL` | `https://provider.cy-com.com` | Provider Portal |
| `NEXT_PUBLIC_DOCS_URL` | `https://docs.cy-com.com` | Documentation |

All product launch URLs use `?? "fallback"` — site remains functional even without env vars set.

---

## Error Handling Pattern

All API calls follow the try/catch status pattern used in forms:

```typescript
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
try {
  await apiCall(payload);
  setStatus("success");
} catch {
  setStatus("error");
  setTimeout(() => setStatus("idle"), 4000);
}
```

- Loading state: Button disabled + spinner/text change
- Success state: Success message with reference number (demo) or "Subscribed!" (newsletter)
- Error state: Error message displayed, auto-reset to idle after 4s

---

## No Duplicate Backend Logic

Per architecture rules:
- Product data is static on the frontend (`PRODUCT_DATA` constant) — no product API calls
- Blog articles are static — no CMS API calls
- Pricing is static — no pricing API calls
- All dynamic data (demo requests, contacts, newsletters) goes through `@cybercom/api`

---

## Pre-Production Checklist

- [ ] Set `NEXT_PUBLIC_API_URL` to production backend URL
- [ ] Set all `NEXT_PUBLIC_*_URL` subdomain vars
- [ ] Verify CORS policy on backend for `cy-com.com` origin
- [ ] Test demo form end-to-end
- [ ] Test contact form end-to-end
- [ ] Test newsletter subscription
- [ ] Verify API error responses return correct HTTP status codes
