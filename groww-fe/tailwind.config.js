module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionDelay: {
        400: "400ms",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
};
