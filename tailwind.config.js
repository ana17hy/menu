/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#fff7ec',
        butter: '#f8e8c9',
        blush: '#eeb9bd',
        rosewood: '#9d5c65',
        sage: '#a8b99d',
        sageDark: '#6f8267',
        ink: '#423c37',
        linen: '#fffdf8',
        clay: '#c98266',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(126, 92, 84, 0.14)',
        petal: '0 12px 30px rgba(238, 185, 189, 0.28)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        appear: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        appear: 'appear 0.45s ease-out both',
      },
    },
  },
  plugins: [],
};
