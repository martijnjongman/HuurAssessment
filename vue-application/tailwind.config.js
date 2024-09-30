/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'brand-gray': '#808490',
        'brand-dark-gray': '#111827',
        'brand-light-gray': '#e5e7eb',
        'brand-blue': '#1644d0',
        'brand-pastel-blue': '#eff6ff',
      },
      fontFamily: {
        brandFont: ['Urbanist', 'sans-serif']
      },
    },
  },
  plugins: [],
}