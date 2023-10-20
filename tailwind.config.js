/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lBgMain:'#efeeee',
        dBgMain:'#16151a',

        socialBlue: '#218DFA',
        darkModeBlue: '#0f172a',

        dNavBg: '#1f1d25',
        lNavBg: '#e7e7e9',

        dCardBg: '#1f1e25',
        lCardBg: '#F9F7F7',

        headerBg: '#222431',

        dCardBg2: '#15203b',
        lCardBg2: '#F9F7F7',

        lTextPrimary:'#101010',
        dTextPrimary:'#EEEEEE',

        lTextSecondary:'#818181',
        dTextSecondary:'#c5c5c5',
      },
      screens: {
        'sm': '640px', // Adjust this value to make the 'sm' breakpoint wider
        'NavMq': '900px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      maxHeight: {
        '120': '36rem', // custom maxHeight class
      },
      fontFamily: {
        font1: ['Inter', 'sans-serif'],
        font2: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

