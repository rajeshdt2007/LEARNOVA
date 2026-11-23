/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#f4f7f8',
          100: '#e4ebed',
          200: '#cbd8dc',
          300: '#a6bdc4',
          400: '#8ba4ad',
          500: '#758f99',
          600: '#5e757e',
          700: '#4c5f67',
          800: '#3e4d53',
          900: '#2d373c',
          950: '#1b2226',
        },
        fluid: {
          light: '#f8fafc',
          silver: '#e2e8f0',
          chrome: '#94a3b8',
          deep: '#334155',
          dark: '#0f172a',
        },
        neon: {
          cyan: '#06b6d4',
          mint: '#10b981',
          glow: '#38bdf8',
          teal: '#14b8a6',
        },
        moss: {
          light: '#6ee7b7',
          DEFAULT: '#10b981',
          deep: '#064e3b',
        },
        brand: {
          50: '#f0f5ff',
          100: '#e0ecff',
          200: '#b9d5ff',
          300: '#7cb3ff',
          400: '#388bfd',
          500: '#1d63ed',
          600: '#1246ce',
          700: '#0f36a5',
          800: '#112f86',
          900: '#0b1d53',
          950: '#060f2e',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(6, 182, 212, 0.65), 0 0 50px rgba(6, 182, 212, 0.35)',
        'neon-hover': '0 0 35px rgba(6, 182, 212, 0.85), 0 0 70px rgba(6, 182, 212, 0.5)',
        'glass-frame': '0 30px 60px -12px rgba(15, 23, 42, 0.35), 0 18px 36px -18px rgba(15, 23, 42, 0.25)',
        'hud-glow': '0 0 20px rgba(6, 182, 212, 0.35), inset 0 0 15px rgba(6, 182, 212, 0.15)',
        'glass-card': '0 8px 32px 0 rgba(15, 23, 42, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(6,182,212,0.8))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(6,182,212,1))' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
