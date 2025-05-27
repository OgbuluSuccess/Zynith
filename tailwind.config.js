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
        'primary-dark': '#0f1a33',  // Added darker shade for hover
        secondary: '#21d397',
        'secondary-dark': '#18a376', // Added darker shade for hover
        accent: '#f7913a',
      },
    },
  },
  plugins: [],
}
