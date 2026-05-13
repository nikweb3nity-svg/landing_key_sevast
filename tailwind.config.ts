import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554"
        },
        graphite: {
          950: "#050813",
          900: "#08111f",
          850: "#0d1727",
          800: "#111d2f"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(37, 99, 235, 0.22)",
        "soft-blue": "0 24px 70px rgba(15, 54, 128, 0.28)"
      }
    },
  },
  plugins: [],
};

export default config;
