/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wuxia: {
          bg: '#0c0d10',
          panel: 'rgba(23, 20, 26, 0.88)',
          border: '#855e2d',
          gold: '#e6b349',
          goldLight: '#fbe285',
          goldDark: '#a36d22',
          red: '#c02c28',
          redDark: '#751310',
          jade: '#2d8f6d',
          jadeLight: '#59caa0',
          slate: '#272635',
          ink: '#111015',
          parchment: '#f0e6d2',
        }
      },
      fontFamily: {
        wuxia: ['Cinzel', 'Noto Serif SC', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'wuxia-gold': '0 0 15px rgba(230, 179, 73, 0.35)',
        'wuxia-red': '0 0 15px rgba(192, 44, 40, 0.45)',
        'wuxia-jade': '0 0 15px rgba(45, 143, 109, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}
