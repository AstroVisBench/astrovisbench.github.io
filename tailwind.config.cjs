/** @type {import('tailwindcss').Config} */
var defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{astro,mdx,ts,tsx}",
    './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}',
    './node_modules/primereact/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Serif"].concat(defaultTheme.fontFamily.sans),
        title: ["Roboto Serif"].concat(defaultTheme.fontFamily.sans),
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
