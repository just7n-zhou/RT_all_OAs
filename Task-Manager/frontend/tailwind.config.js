/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#4f46e5', // Indigo-600 for the "Task Master" theme
      }
    },
  },
  plugins: [],
}