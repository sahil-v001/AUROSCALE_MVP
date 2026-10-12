import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        foreground: "#FAFAFA",
        auro: {
          dark: "#09090B",
          card: "#121215",
          panel: "#18181B",
          border: "#27272A",
          borderLight: "#3F3F46",
          purple: "#A855F7",
          blue: "#3B82F6",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
          teal: "#14B8A6",
        },
      },
      fontFamily: {
        brand: ["var(--font-brand)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
