import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f1",
          100: "#ffe1e1",
          200: "#ffc7c7",
          300: "#ffa0a0",
          400: "#f87171",
          500: "#ef4444",  // modern red
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d"
        },
        ink: "#0b0f19",     // deep charcoal
        steel: "#1f2937",   // slate
        gold: "#f59e0b"     // warm accent
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, rgba(220,38,38,1) 0%, rgba(239,68,68,1) 35%, rgba(15,23,42,1) 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.0) 100%)"
      },
      boxShadow: {
        glow: "0 0 24px rgba(239,68,68,0.35)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
