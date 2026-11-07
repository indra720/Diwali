/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          metallic: '#ffd700',
          rich: '#dfa637',
          champagne: '#f7e7ce',
          glow: '#ffea79'
        },
        diwali: {
          midnight: '#050714',
          deepBlue: '#0a1027',
          royalNavy: '#0f1738',
          crimson: '#6b0f1a',
          maroon: '#4a0812',
          flame: '#ff5722',
          amber: '#ff9800',
          saffron: '#ff7700',
          marigold: '#ffa000',
          lotus: '#ff4081',
          goldDark: '#362800'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(234, 179, 8, 0.45)',
        'gold-glow-lg': '0 0 50px rgba(250, 204, 21, 0.65)',
        'flame-glow': '0 0 30px rgba(255, 119, 0, 0.7)',
        'book-deep': '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(218, 165, 32, 0.25)',
      },
      animation: {
        'flame-flicker': 'flameFlicker 1.8s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        flameFlicker: {
          '0%': { transform: 'scale(1) skewX(0deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.08, 0.96) skewX(-2deg)', opacity: '1' },
          '50%': { transform: 'scale(0.97, 1.05) skewX(2deg)', opacity: '0.9' },
          '75%': { transform: 'scale(1.04, 0.98) skewX(-1deg)', opacity: '1' },
          '100%': { transform: 'scale(1.02, 1.02) skewX(1deg)', opacity: '0.96' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
