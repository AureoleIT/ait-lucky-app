/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': "bg-gradient-to-r from-[#C8EFF1] via-[#B3D2E9] to-[#B9E4A7]",
        menubar: '#181818',
        card: '#212121',
        'secondary-text': '#B3B3B3',
        'primary-text': '#FFFFFF',
        'gray-dark': '#273444',
        gray: '#8492a6',
        'gray-light': '#d3dce6',
        accent: '#FE214B',
      },
    },
  },
  plugins: [],
}
