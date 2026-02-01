/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ["var(--font-audiowide)"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};