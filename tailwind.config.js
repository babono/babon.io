/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0182C6',
        secondary: '#ED4D2D',
        accent: '#FED900',
        dark: '#252525',
        background: '#ffffff',
        foreground: '#252525',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
