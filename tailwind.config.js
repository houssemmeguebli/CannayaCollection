/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#D4C5B9',
        beige: {
          50: '#FAF8F5',
          100: '#F5F1EC',
          200: '#EBE4DA',
          300: '#D4C5B9',
          400: '#C4B5A9'
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      }
    }
  },
  plugins: []
}
