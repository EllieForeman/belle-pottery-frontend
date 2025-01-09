import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true, // Optional: Centers the container horizontally
      padding: "1rem", // Optional: Adds padding inside the container
      screens: {
        sm: "100%", // Full width for small screens
        md: "100%", // No max-width at the 768px breakpoint
        lg: "1024px", // Define max-width for larger breakpoints if needed
        xl: "1280px",
      },
    },
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
