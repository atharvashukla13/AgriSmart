export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#98FF98",
        accentBrown: "#8B5E3C",
        accentBlue: "#87CEEB",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
