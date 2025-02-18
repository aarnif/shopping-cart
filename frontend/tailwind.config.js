/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      "roboto-condensed": ["Roboto Condensed", "sans-serif"],
    },
    backgroundImage: {
      hero: "url('/images/hero.webp')",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      scaleIn: {
        "0%": { transform: "scale(0)" },
        "100%": { transform: "scale(1)" },
      },
      zoomInAndOut: {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.5)" },
        "100%": { transform: "scale(1)" },
      },
      hopIn: {
        "0%": { opacity: 0, transform: "translateY(100px)" },
        "50%": { opacity: 0.5, transform: "translateY(-40px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
    animation: {
      "fade-in": "fadeIn 0.3s ease-in-out",
      "scale-in": "scaleIn 0.3s ease-in-out",
      "zoom-in-and-out": "zoomInAndOut 0.5s ease-in-out",
      "hop-in": "hopIn 1s ease-in-out",
    },
  },
  plugins: [],
};
