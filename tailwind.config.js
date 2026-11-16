/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        ink: "#042A4F",
        cobalt: { DEFAULT: "#0A46C2", dark: "#0639A6" },
        celeste: { DEFAULT: "#A8C7FA", soft: "#8AB4F8" },
        paper: { DEFAULT: "#F7F5EE", dim: "#EFECE2" },
        body: "#475569",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      maxWidth: { site: "76rem" },
    },
  },
  plugins: [],
}
