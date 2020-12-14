const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    colors: {
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
