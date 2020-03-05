const defaults = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        brand: ['Willful', ...defaults.fontFamily.sans]
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem'
      }
    },
    fontFamily: {
      sans: ['Hind', ...defaults.fontFamily.sans]
    }
  },
  variants: {},
  plugins: []
}
