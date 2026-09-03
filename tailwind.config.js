/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#f4f1ea',
        'brand-gray': '#555555',
        'whatsapp-green': '#25D366'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Fallback for the serif font used in headings
        sans: ['"Inter"', 'sans-serif'], // Fallback for body font
      }
    },
  },
  plugins: [],
}
