import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"]
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent-2) / <alpha-value>)",
        accent3: "rgb(var(--accent-3) / <alpha-value>)"
      },
      boxShadow: {
        sharp: "0 24px 80px rgb(var(--shadow) / 0.18)"
      },
      keyframes: {
        toastEnter: {
          "0%": { transform: "translateX(-80px) scale(0.9)", opacity: "0" },
          "30%": { opacity: "1", transform: "translateX(-40px) scale(0.95)" },
          "50%": { opacity: "0.2" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateX(0) scale(1)", opacity: "1" }
        },
        toastLeave: {
          "0%": { transform: "translateX(0) scale(1)", opacity: "1" },
          "30%": { opacity: "0.2" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(-80px) scale(0.9)", opacity: "0" }
        },
        toastProgress: {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" }
        },
        mesh: {
          "0%, 100%": { backgroundPosition: "0% 50%, 100% 30%, 50% 100%" },
          "50%": { backgroundPosition: "100% 40%, 20% 70%, 30% 10%" }
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.75)", opacity: "0.35" }
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" }
        },
        nameShimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" }
        }
      },
      animation: {
        mesh: "mesh 18s ease-in-out infinite",
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        bounceSoft: "bounceSoft 1.8s ease-in-out infinite",
        nameShimmer: "nameShimmer 4s linear infinite",
        toastEnter: "toastEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        toastLeave: "toastLeave 0.4s ease-in forwards",
        toastProgress: "toastProgress 3.5s linear forwards"
      }
    }
  },
  plugins: []
};

export default config;
