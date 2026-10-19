/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#EDEDED",
        muted: "#8A8A8A",
        surface: "#141414",
        borderSubtle: "rgba(255, 255, 255, 0.08)",
        borderHover: "rgba(255, 255, 255, 0.22)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widestEditorial: "0.22em",
        tightHeading: "-0.035em",
      },
      animation: {
        'ambient-pulse': 'ambientPulse 14s ease-in-out infinite alternate',
      },
      keyframes: {
        ambientPulse: {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(4%, -3%) scale(1.1)' },
          '100%': { transform: 'translate(-3%, 3%) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};
