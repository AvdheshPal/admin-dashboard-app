/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1/2': '50%',
      },
      animation: {
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  plugins: [],
}

