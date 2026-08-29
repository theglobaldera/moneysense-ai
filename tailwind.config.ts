import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep green — money, growth, stability (primary brand + CTAs)
        forest: {
          50: "#eef6f0",
          100: "#d6ebdc",
          200: "#aed7b9",
          300: "#7fbd93",
          400: "#4f9d6d",
          500: "#2f7d4f",
          600: "#1f6440",
          700: "#195035",
          800: "#153f2b",
          900: "#0f2e20",
        },
        // Warm off-white — approachable background
        cream: {
          50: "#fffdf8",
          100: "#fbf7ee",
          200: "#f5eeda",
        },
        // Dark charcoal — primary text
        charcoal: {
          900: "#1c211f",
          700: "#333b37",
          500: "#5b655f",
          300: "#8d968f",
        },
        // Soft green — cards, highlights, success
        sage: {
          50: "#f1f7f1",
          100: "#e2efe2",
          200: "#c8e0c9",
        },
        // Warm accent — personality / CTAs
        amber: {
          400: "#f4a83d",
          500: "#ee9420",
          600: "#d97c0c",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(21, 63, 43, 0.08)",
        card: "0 4px 20px rgba(21, 63, 43, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
