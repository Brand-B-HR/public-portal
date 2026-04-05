/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        sky: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        surface: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
        },
        accent: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 30%, #e0f2fe 60%, #f0f9ff 100%)",
        "card-gradient":
          "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        "section-gradient":
          "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      },
      boxShadow: {
        soft:  "0 2px 15px -3px rgba(59,130,246,0.08), 0 10px 20px -2px rgba(59,130,246,0.04)",
        card:  "0 4px 24px -4px rgba(59,130,246,0.10), 0 1px 4px rgba(0,0,0,0.03)",
        hover: "0 12px 40px -8px rgba(59,130,246,0.20), 0 4px 12px rgba(0,0,0,0.05)",
        glow:  "0 0 40px -10px rgba(59,130,246,0.30)",
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        "float":      "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "spin-slow":  "spin 20s linear infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "slide-up":   "slideUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
