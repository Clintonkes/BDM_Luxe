import { site } from './src/config/site.js';

/** Colours and fonts come from src/config/site.js. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { xs: '420px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    extend: {
      colors: {
        ...site.colors,
        // Tints derived from the brand palette for borders and hovers.
        'ink-2': '#191B16',
        'loam-2': '#353027',
        'bone-dim': '#CFC7B6',
        danger: '#FF9B85',
      },
      fontFamily: {
        display: [`"${site.fonts.display}"`, 'Georgia', 'serif'],
        sans: [`"${site.fonts.body}"`, 'system-ui', 'sans-serif'],
      },
      maxWidth: { frame: '88rem' },
      letterSpacing: { label: '0.18em' },
      keyframes: {
        pageIn: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'none' } },
        stripe: { from: { transform: 'scaleY(0.2)' }, to: { transform: 'scaleY(1)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'page-in': 'pageIn 0.55s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};
