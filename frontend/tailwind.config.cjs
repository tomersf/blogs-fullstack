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
        "primary-light": "#F5DF4F",
        "secondary-light": "#BFAB27",
        "dark-theme": "#2E2836",
        "primary-dark": "#ecf0f3",
        "secondary-dark": "#4b70e2",
      },
    },
    screens: {
      xxs: "280px",
      sm: "640px",
      md: "1060px",
      lg: "1600px",
    },
  },
  plugins: [],
};
