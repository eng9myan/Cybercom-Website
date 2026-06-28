import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => <p {...props}>{children}</p>,
    form: ({ children, ...props }: React.HTMLProps<HTMLFormElement>) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock @cybercom/api
vi.mock("@cybercom/api", () => ({
  demoApi: {
    submit: vi.fn().mockResolvedValue({ id: "1", reference_number: "CYB-123456", status: "pending", created_at: new Date().toISOString() }),
  },
  contactApi: {
    send: vi.fn().mockResolvedValue({ id: "1", ticket_number: "TKT-001", status: "open", created_at: new Date().toISOString() }),
    subscribeNewsletter: vi.fn().mockResolvedValue({ id: "1", status: "subscribed", created_at: new Date().toISOString() }),
  },
  productsApi: {
    list: vi.fn().mockResolvedValue({ data: [], count: 0 }),
    featured: vi.fn().mockResolvedValue({ data: [], count: 0 }),
  },
}));
