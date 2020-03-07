const { colors, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        primary: { ...colors.teal }
      },
      fontFamily: {
        brand: ['Willful', ...fontFamily.sans]
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem'
      },
      textColor: {
        default: 'var(--color-text-default)'
      },
      backgroundColor: {
        default: 'var(--color-bg-default)'
      }
    },
    fontFamily: {
      sans: ['Hind', ...fontFamily.sans]
    }
  },
  variants: {},
  plugins: []
}
