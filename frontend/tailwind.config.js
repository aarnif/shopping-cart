/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
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
      fadeFromDown: {
        "0%": { opacity: 0, transform: "translateY(100px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
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
      rotate45degrees: {
        "0%": { transform: "rotate(0deg)" },
        "50%": { transform: "rotate(45deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
      rotate360degrees: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "fade-in": "fadeIn 0.3s ease-in-out",
      "fade-from-down": "fadeFromDown 0.5s ease-in-out",
      "scale-in": "scaleIn 0.3s ease-in-out",
      "zoom-in-and-out": "zoomInAndOut 0.5s ease-in-out",
      "hop-in": "hopIn 1s ease-in-out",
      "rotate-45-degrees": "rotate45degrees 1s ease-in-out",
      "rotate-infinite": "rotate360degrees 0.8s linear infinite",
    },
  },
  plugins: [],
};
