/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "rgba(4,19,187)",
          secondary: "rgba(238,239,254)"
        }
      }
    ]
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "250px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        header: "64px auto", // 👈 for the navbar layout. adds grid-rows-header class
      },
      colors: {
        primary: "rgba(4,19,187)",
        secondary: "rgba(238,239,254)"
       },
    },
  },
  plugins: [require("daisyui")],
}
