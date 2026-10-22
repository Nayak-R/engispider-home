import type { Config } from "tailwindcss";

/**
 * Bound to the CSS custom properties in app/globals.css, which stays the
 * single source of truth for the design tokens. Literal hex appears only
 * where Tailwind needs to compute an opacity modifier (`bg-accent/10`),
 * which cannot work through a var().
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      colors: {
        accent: {
          50: "#FFF6ED",
          100: "#FFE8D1",
          200: "#FECFA6",
          300: "#FDB36F",
          400: "#FB923C",
          500: "#FB7C1F",
          600: "#EA6A0C",
          700: "#C2520A",
          800: "#9A4110",
          900: "#7C3710",
          DEFAULT: "#FB7C1F",
          /** Text-safe accent on a light ground — 4.66:1. */
          ink: "#C2520A",
        },

        canvas: "#FFFFFF",
        band: "#F7F9FC",
        well: "#EFF3F8",
        hairline: {
          DEFAULT: "#E4EAF2",
          mid: "#D3DCE8",
          strong: "#B9C5D6",
        },
        ink: "#0A0F1A",
        body: "#475569",
        muted: "#64748B",
        faint: "#94A3B8",
      },

      fontSize: {
        "f-2xs": "var(--step--2)",
        "f-xs": "var(--step--1)",
        "f-base": "var(--step-0)",
        "f-lg": "var(--step-1)",
        "f-xl": "var(--step-2)",
        "f-2xl": "var(--step-3)",
        "f-3xl": "var(--step-4)",
        "f-4xl": "var(--step-5)",
        "f-5xl": "var(--step-6)",
        "f-6xl": "var(--step-7)",
        "f-7xl": "var(--step-8)",
        "f-8xl": "var(--step-9)",
      },

      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        DEFAULT: "var(--r)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },

      maxWidth: {
        page: "var(--container)",
        measure: "var(--measure)",
      },

      transitionTimingFunction: {
        out: "var(--ease)",
        io: "var(--ease-io)",
      },
    },
  },
  plugins: [],
};

export default config;
