/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto-slab": ["Roboto Slab", "sans-serif"],
      },
      backgroundColor: {
        "primary-500": "#4299e1", // Blue-500
        "primary-600": "#3182ce", // Blue-600
        "primary-700": "#2b6cb0", // Blue-700
        gray: "#f5f5f5",
        hibot: "#ff521c",
      },
      textColor: {
        "primary-500": "#4299e1", // Blue-500
        "primary-600": "#3182ce", // Blue-600
        "primary-700": "#2b6cb0", // Blue-700
      },
    },
  },
  plugins: [],
};
