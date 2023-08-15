/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1200px",
    },
    extend: {
      colors: {
        white: "#ffffff",
        black: "#1c1c1c",
        gray: "#7d7d7d",
        "color-bg": "#f5f6f8",
        "black-primary": "#333333",
        "blue-100": "#e1eaf4",
        "blue-200": "#c9ddf4",
        "blue-300": "#a8cffc",
        blue: "#1875ff",
        "blue-dark": "#135ecc",
        "red-300": "#fecaca",
        "red-dark": "#dc2626",
      },
    },
  },
  plugins: [require("daisyui")],
};
