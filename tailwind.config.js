/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#38bdf8',
        'spacial-gray': '#f2f1f6',
        'spacial-blue': '#3474eb'
      },
      fontFamily: {
        MPLUSRounded1c_Medium: ['MPLUSRounded1c_Medium', 'sans-serif'],
        SuezOne_Regular: ['SuezOne_Regular', 'sans-serif'],
        Alef_Regular: ['Alef_Regular', 'sans-serif'],
        Kanit_Medium: ['Kanit_Medium', 'sans-serif'],
        Kanit_SemiBold: ['Kanit_SemiBold', 'sans-serif'],
        Geneva01: ['Geneva01', 'sans-serif'],
        Alef_Bold: ['Alef_Bold', 'sans-serif'],
      }, //end of fontFamily

      inset: {
        '1/6': '16%',
        '1/7': '14.2%',
        '2/7': '28.57%',
        '3/7': '42.8571429%',
        '4/7': '57.14%',
        '5/7': '71.428571428%',
        '1/8': '12.5%',
        '11/12': '91.6%',
      },

      translate: {
        'center': 'translate(-50%, -50%);',
        '1/7': '14.2%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },

      height: {
        '1/6': '16%',
        '1/7': '14.2%',
        '2/7': '28.57%',
        '3/7': '42.8571429%',
        '4/7': '57.14%',
        '5/7': '71.428571428%',
        '6/7': '85.714%',
        '1/8': '12.5%',
        '3/8': '37.5%',
        '5/8': '62.5%',
        '87.5': '62.5%',
        '11/12': '91.6%',
        '11/12': '91.6%',
      }
    },
  },
  plugins: [],
}