/** @type {import ('tailwindcss').Config } */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F5F5F5",
          200: "#EBEBEB",
          300: "#E0E0E0",
          400: "#D6D6D6",
          500: "#CCCCCC"
        },
        secondary: {
          100: "#2D3142",
          200: "#292D3D",
          300: "#212431",
          400: "#181B25",
          500: "#101219"
        },
        accent: {
          100: "#F3A07C",
          200: "#F1926A",
          300: "#EF8354",
          400: "#EE7744",
          500: "#EC6A32"
        }
      },
      backgroundImage: {
        chat: "url(/chat_bg.svg"
      }
    }
  },
  plugins: []
};
