/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#050A14',
        'secondary-bg': '#0D1526',
        'accent-primary': '#00D4FF',
        'accent-secondary': '#7B2FFF',
        'text-primary': '#E8F4FD',
        'text-secondary': '#8BA3C0',
        'success': '#00FF94',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
