/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4B483',
          dark: '#B8915A',
        },
        cream: {
          DEFAULT: '#F5EFE6',
          light: '#FAF6F1',
          dark: '#EDE4D6',
        },
        charcoal: {
          DEFAULT: '#1C1C1C',
          light: '#2A2A2A',
          dark: '#0F0F0F',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
}
