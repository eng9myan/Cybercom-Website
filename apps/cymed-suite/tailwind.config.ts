import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Base surface — matches screenshot #0d0f14
        canvas: "hsl(220 20% 6%)",
        surface: {
          DEFAULT: "hsl(220 18% 9%)",
          raised: "hsl(220 16% 12%)",
          overlay: "hsl(220 14% 15%)",
        },
        border: "hsl(220 14% 18%)",
        input: "hsl(220 14% 18%)",
        ring: "hsl(217 91% 60%)",
        foreground: "hsl(210 40% 96%)",
        muted: {
          DEFAULT: "hsl(220 14% 14%)",
          foreground: "hsl(215 15% 65%)",
        },
        primary: {
          DEFAULT: "hsl(217 91% 60%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(220 16% 20%)",
          foreground: "hsl(210 40% 96%)",
        },
        accent: {
          DEFAULT: "hsl(24 95% 55%)",
          foreground: "hsl(210 40% 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(210 40% 98%)",
        },
        success: {
          DEFAULT: "hsl(142 71% 45%)",
          foreground: "hsl(210 40% 98%)",
        },
        warning: {
          DEFAULT: "hsl(38 92% 55%)",
          foreground: "hsl(220 26% 8%)",
        },
        info: {
          DEFAULT: "hsl(199 89% 55%)",
          foreground: "hsl(210 40% 98%)",
        },
        // Triage
        triage: {
          urgent: "hsl(0 84% 60%)",
          "semi-urgent": "hsl(38 92% 55%)",
          routine: "hsl(142 71% 45%)",
          esi1: "hsl(0 84% 55%)",
          esi2: "hsl(24 95% 55%)",
          esi3: "hsl(38 92% 55%)",
          esi4: "hsl(217 91% 60%)",
          esi5: "hsl(142 71% 45%)",
        },
        card: {
          DEFAULT: "hsl(220 18% 9%)",
          foreground: "hsl(210 40% 96%)",
        },
        popover: {
          DEFAULT: "hsl(220 16% 12%)",
          foreground: "hsl(210 40% 96%)",
        },
        // Product accents
        product: {
          hospital: "hsl(199 89% 55%)",
          clinic: "hsl(262 83% 65%)",
          pharmacy: "hsl(142 71% 45%)",
          laboratory: "hsl(280 65% 60%)",
          imaging: "hsl(217 91% 60%)",
          cyshop: "hsl(24 95% 55%)",
          erp: "hsl(340 82% 60%)",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      fontFamily: {
        sans: [
          "InterVariable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        arabic: ["Cairo", "Noto Sans Arabic", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.35), 0 0 0 1px rgb(255 255 255 / 0.04)",
        raised: "0 4px 20px -2px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.06)",
        glow: "0 0 40px -8px hsl(217 91% 60% / 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
