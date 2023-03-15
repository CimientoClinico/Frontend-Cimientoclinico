/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","./src/**/*.jsx"],
  darkMode:"class",
  theme: {
    extend: {},
    fontFamily:{
      'nunito': ['Nunito Sans']
    },
    scale: {
      '110': '1.10',
    }
  },
  plugins: [],
}
