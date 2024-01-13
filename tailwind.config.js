/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      ubuntuMono: ['Ubuntu Mono', 'monospace'],
      Kanit:["Kanit", "sans-serif"],
      Poppins:['Poppins', "sans-serif"]
    },
  },
  plugins: [],
}

