/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a0d0d',
        deep: '#2b0e10',
        crimson: '#9a1b1b',
        rose: '#c2242f',
        scarlet: '#e0213a',
        petal: '#ff5a66',
        ivory: '#f6efe6',
        cream: '#e9ddd0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
};
