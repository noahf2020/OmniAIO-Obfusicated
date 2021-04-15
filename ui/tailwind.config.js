module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      safelist: ['border-purple-400', 'border-green-400', 'border-red-400', 'border-yellow-400',
       'border-purple-600', 'text-green-600', 'text-yellow-300', 'w-56', 'w-52', 'w-44', 'w-36', 'from-gray-500', 'from-gray-600'],
      blocklist: [/^debug-/],
      keyframes: true,
      fontFace: true,
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'table-header': '#272727',
        'table-item': '#191919'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-css-filters')
  ],
}
