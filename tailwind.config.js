/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        redHat: ['"Red Hat Display"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient': 'linear-gradient(90deg, rgba(102,0,204,1) 0%, rgba(179,0,89,1) 100%)',
      },
    },
  },
  plugins: [],
};
