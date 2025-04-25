import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bagnard: ["Bagnard", "sans-serif"],
        sans: ["Lucida Grande", "Arial", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      lineHeight: {
        spacey: "2.1rem",
      },
      maxWidth: {
        "5.5xl": "68rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
