/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    }
  },
  plugins: [],
}

