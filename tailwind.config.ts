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
        bagnard: ["broadsheet", "sans-serif"],
        sans: [
          "linotype-sabon",
          "var(--source-sans)",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
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
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
