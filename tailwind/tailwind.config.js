/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../hirespot/templates/**/*.html',
    '../hirespot/**/*.py'  // optional if you use Tailwind in Django strings
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
