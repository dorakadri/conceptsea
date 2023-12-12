/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        exo: ['Exo', 'sans-serif'],
        dancing:['Dancing Script', 'cursive'],
        shantell:['Shantell Sans', 'cursive'],
      },
      colors: {
        'primary-blue': '#5A81FA',
        'Secondary-Blue': '#2B308B',
        'light-blue': '#CEDEFF',
        'light-gray':'rgb(105,110,130)',
      }
    },
  },
  plugins: [],
}
