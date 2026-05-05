import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#09090B",
          panel: "#111113",
          card: "#18181B",
          elevated: "#1F1F23",
          border: "#27272A",
          hover: "#2D2D32",
        },
        accent: {
          blue: "#3B82F6",
          amber: "#F59E0B",
          green: "#22C55E",
          purple: "#A855F7",
          red: "#EF4444",
          cyan: "#06B6D4",
        },
        text: {
          primary: "#FAFAFA",
          secondary: "#A1A1AA",
          muted: "#71717A",
          accent: "#3B82F6",
        },
        chart: {
          hognestad: "#3B82F6",
          todeschini: "#F59E0B",
          parabola: "#22C55E",
          reference: "#A855F7",
          zone1: "rgba(59,130,246,0.12)",
          zone2: "rgba(245,158,11,0.12)",
          zone3: "rgba(239,68,68,0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
