/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#38bdf8',
        'spacial-gray': '#f2f1f6'
      },
      fontFamily: {
        MPLUSRounded1cMedium: ['MPLUSRounded1c-Medium', 'sans-serif'],
      }, //end of fontFamily

      inset: {
        '1/6': '16%',
        '1/7': '14.2%',
        '5/7': '71.428571428%',
        '1/8': '12.5%',
        '11/12': '91.6%',
      },

      translate: {
        'center': 'translate(-50%, -50%);',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },

      height: {
        '1/6': '16%',
        '1/7': '14.2%',
        '5/7': '71.428571428%',
        '1/8': '12.5%',
        '11/12': '91.6%',
      }
    },
  },
  plugins: [],
}