/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        nunito: ['"Nunito"', "sans-serif"],
      },
      colors: {
        sandyBeige: "#E6CCB2",
        oliveGreen: "#6B8E23",
        terracotta: "#D17A5A",
        slateGrey: "#708090",
        clayBrown: "#8B4513",
        home: "#f4efe9",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
