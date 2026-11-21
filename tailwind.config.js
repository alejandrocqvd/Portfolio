/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: token("bg"),
        surface: token("surface"),
        ink: token("text"),
        muted: token("muted"),
        accent: token("accent"),
        error: token("error"),
      },
      fontFamily: {
        sans: ["var(--font-body)", "Hello Script", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        control: "8px",
        media: "10px",
        overlay: "16px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      screens: {
        "3xl": "1800px",
        "4xl": "3000px",
      },
    },
  },
  plugins: [],
};
