const { colors, fontFamily } = require('tailwindcss/defaultTheme')

const colorsPrimary = { ...colors.teal }
const boxShadowOutlineColor = `${colorsPrimary['500']}77`

module.exports = {
  theme: {
    boxShadow: {
      outline: `0 0 0 3px ${boxShadowOutlineColor}`
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        primary: colorsPrimary
      },
      fontFamily: {
        brand: ['Willful', ...fontFamily.sans]
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem'
      }
    },
    fontFamily: {
      sans: ['Hind', ...fontFamily.sans]
    }
  },
  variants: {},
  plugins: []
}
