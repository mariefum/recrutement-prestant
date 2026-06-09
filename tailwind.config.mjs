/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    // Direction artistique : luxe sobre et minéral.
    // Beige / sable / pierre / blanc cassé, accent bronze, encre bleu nuit (logo).
    extend: {
      colors: {
        // Fonds clairs minéraux
        blanc: '#FCFAF6',
        sable: '#F4EFE7',
        creme: '#EDE7DC',
        // Tons pierre
        pierre: {
          100: '#E8E2D7',
          200: '#D9D2C5',
          300: '#C4BBAB',
          400: '#A99F8D',
          500: '#8C8273',
          600: '#6E665A',
        },
        // Encre — bleu nuit du logo
        encre: {
          DEFAULT: '#14323C',
          800: '#1B3E49',
          700: '#274F5B',
          600: '#37636F',
        },
        // Accent bronze
        bronze: {
          DEFAULT: '#A67C52',
          light: '#BB9268',
          dark: '#8A663F',
        },
      },
      fontFamily: {
        // Montserrat exclusivement (self-host via @fontsource).
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
      },
      letterSpacing: {
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.18em',
        mega: '0.3em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1s ease both',
      },
    },
  },
  plugins: [],
};
