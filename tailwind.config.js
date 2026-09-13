/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EBF5',
          100: '#C5CCE6',
          200: '#8E9CCF',
          300: '#576BAA',
          400: '#2E4288',
          500: '#1A2550',
          600: '#121C42',
          700: '#0A1128',
          800: '#070D1E',
          900: '#050814',
        },
        saffron: {
          50: '#FDF5EB',
          100: '#FAE6D0',
          200: '#F4CC9E',
          300: '#EDB069',
          400: '#E89E4F',
          500: '#E08E45',
          600: '#C2742F',
          700: '#9C5A22',
          800: '#7A4720',
          900: '#5E3819',
        },
        gold: {
          400: '#D4AF37',
          500: '#C49B2A',
          600: '#A67D1E',
        },
        cream: '#FAFAFC',
        surface: '#F1F3F9',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(10, 17, 40, 0.08)',
        card: '0 8px 40px -12px rgba(10, 17, 40, 0.15)',
        glow: '0 0 40px -8px rgba(224, 142, 69, 0.35)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
