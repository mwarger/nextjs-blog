const typography = require('@tailwindcss/typography')

module.exports = {
  darkMode: 'class',
  purge: {
    content: ['./src/**/*.tsx'],
    options: {
      safelist: ['dark'],
    },
  },
  theme: {
    extend: {
      colors: {},
      typography: (theme) => ({
        dark: {
          css: {
            color: 'white',
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [],
}
