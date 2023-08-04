module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",
        secondary: "#00FF00",
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for sidebar layout
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
