/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-light-100": "#FFE1E0",
        "primary-light-300": "#FFA6A3",
        "primary-light-500": "#FF6B66",
        "secondary-light-400": "#FFCD58",
        "secondary-light-500": "#FFC132",
        "dark-theme": "#2E2836",
        "primary-dark-100": "#136F63",
        "secondary-dark-400": "#B6D7B9",
      },
    },
  },
  plugins: [],
};
