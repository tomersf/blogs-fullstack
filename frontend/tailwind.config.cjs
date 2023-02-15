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
        "primary-light": "#BFAB27",
        "secondary-light": "#F5DF4F",
        "dark-theme": "#2E2836",
        "primary-dark": "#134E46",
        "secondary-dark": "#098E7C",
      },
    },
  },
  plugins: [],
};
