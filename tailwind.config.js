/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#192a56',
        'primary-light': '#1c2e59',
        secondary: '#21d397',
        accent: '#f7913a',
      },
    },
  },
  plugins: [],
}
