# @cybercom/cymed-suite

CyberCom Suite dashboards — 7 products, one shell, dark mode, AR/EN + RTL.

## Products

| Product | Route | Modules |
|---|---|---|
| CyMed Hospital | `/hospital` | 22 (Admission, ED, EMR, Nurse, OR, ICU, Pharmacy, Blood Bank, Dietary, ERP subset, AI Scribe, Sepsis, Deterioration) |
| CyMed Clinic | `/clinic` | 21 (Reception, Appointments, Triage, Consultations, Telemed, Insurance, Labs, Referrals, CDS, Portal, ERP subset, AI Scribe, No-show) |
| CyMed Pharmacy | `/pharmacy` | 13 (POS, Verification, Interactions, Narcotics, e-Rx, DUR, Inventory, Procurement, Billing, HR, Finance, Reports) |
| CyMed Laboratory | `/laboratory` | 16 (Orders, Samples, LIS, Auto-verify, QC, Micro, Blood Bank, Analyzer, Delivery, Billing, Inventory, Procurement, HR, Finance, Reports) |
| CyMed Imaging | `/imaging` | 15 (Worklist, Scheduling, PACS, Reporting, AI Analysis, Teleradiology, 3D, Contrast, Assets, Maintenance, Billing, HR, Finance, Reports) |
| CyShop | `/cyshop` | 16 (POS, KDS, Tables, Online Orders, Delivery, Menu, Loyalty, Portal, ZATCA, Inventory, Procurement, HR, Attendance, CRM, Reports) |
| CyCom ERP | `/erp` | 20 (Accounting, AP/AR, HR, Payroll, Inventory, Procurement, CRM, Projects, Fleet, CMMS, PLM, Quality, Manufacturing, Warehousing, Recruitment, Marketing, Helpdesk, e-Sign, BI) |

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript strict
- Tailwind CSS 3.4 + shadcn-style Radix primitives
- TanStack Table for grids
- Recharts for analytics
- Framer Motion for count-up + shell transitions
- Lucide icons
- next-intl for AR/EN + RTL
- All mock data — no backend

## Design tokens

- Base surface `#0d0f14` per hospital-dashboard reference
- Product accents: hospital / clinic / pharmacy / laboratory / imaging / cyshop / erp
- Status colors: triage (urgent/semi-urgent/routine), ESI 1–5, standard status badges
- Dark mode only

## Architecture

```
apps/cymed-suite/src/
├── app/
│   ├── layout.tsx                      Root
│   ├── page.tsx                        → /en
│   ├── [locale]/
│   │   ├── layout.tsx                  Providers (i18n, role, sidebar, theme)
│   │   ├── page.tsx                    Landing (product picker)
│   │   └── [product]/
│   │       ├── layout.tsx              Shell (sidebar + topbar)
│   │       ├── page.tsx                Product dashboard (dispatched)
│   │       └── [module]/page.tsx       Module (registry + scaffold fallback)
│   └── globals.css
├── components/
│   ├── ui/                             Radix-based primitives (button, card, badge, dialog, table, …)
│   ├── shell/                          Sidebar, Topbar, RoleProvider, SidebarProvider
│   ├── data/                           StatCard, DataTable, PageHeader, StatusBadge, TriageBadge, EsiBadge
│   ├── charts/                         LineTrend, AreaTrend, BarComparison, DonutSplit (Recharts)
│   └── modules/module-scaffold.tsx     Generic fallback for any un-implemented module
├── config/
│   ├── products.ts                     Product + module registry (drives sidebar, routes, roles)
│   └── roles.ts                        Role catalog + permission helpers
├── features/
│   ├── {product}/dashboard.tsx         Bespoke dashboard per product
│   ├── {product}/modules/*.tsx         Signature modules per product
│   └── module-registry.ts              Slug → component mapping
├── mock/                               Realistic seeded mock data
├── i18n/                               next-intl routing + messages (en, ar)
└── middleware.ts                       Locale routing
```

## Roles

Switching the role selector in the top bar shows/hides modules in the sidebar in real time. Roles: admin, physician, nurse, reception, pharmacist, lab-tech, radiologist, finance, hr, operations, it, cashier, chef, waiter.

## Dev

```
pnpm install
pnpm --filter @cybercom/cymed-suite dev
# open http://localhost:3007/en
```

## Notes

- Signature modules are fully rendered per product.
- Modules marked `scaffold: true` in `config/products.ts` fall through to the generic `ModuleScaffold` which produces realistic mock KPIs + trend + records table seeded by the module slug so each looks distinct + stable.
- Extending: add a new file under `features/{product}/modules/*.tsx` and register it in `features/module-registry.ts`. Remove `scaffold: true` from the module entry when a bespoke page exists.
