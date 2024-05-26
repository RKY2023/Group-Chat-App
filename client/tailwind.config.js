/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "groupchat-bp": "755px"
      }
    },
  },
  // plugins: {
  //   '@tailwindcss/jit': {},
  //   autoprefixer: {},
  // },
  plugins: ["@tailwindcss/jit , autoprefixer"]
}