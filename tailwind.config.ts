import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/(frontend)/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ocean & coast palette — drawn from False Bay
        sea: {
          50: '#f0f9fb',
          100: '#d9f0f4',
          200: '#b7e1ea',
          300: '#84cad9',
          400: '#4aacbf',
          500: '#2e91a5',
          600: '#29758b',
          700: '#276072',
          800: '#274f5e',
          900: '#244350',
          950: '#132b36',
        },
        // Warm stone — Simon's Town harbour walls
        stone: {
          50: '#faf8f5',
          100: '#f2ede6',
          200: '#e4d9cc',
          300: '#d3c0aa',
          400: '#bfa286',
          500: '#b08d6e',
          600: '#a37a5e',
          700: '#88644f',
          800: '#6f5244',
          900: '#5b443a',
          950: '#30231e',
        },
        // Fynbos accent — a warm earthy terracotta
        fynbos: {
          50: '#fdf6ef',
          100: '#fae9d9',
          200: '#f4d0b2',
          300: '#edb280',
          400: '#e48e4d',
          500: '#de742d',
          600: '#cf5c22',
          700: '#ac461e',
          800: '#893920',
          900: '#6f311d',
          950: '#3c170d',
        },
        // Deep navy — for text and contrast
        navy: {
          50: '#f3f6fa',
          100: '#e3eaf3',
          200: '#cddbea',
          300: '#abc3db',
          400: '#83a3c8',
          500: '#6688b9',
          600: '#5372ab',
          700: '#48619c',
          800: '#3f5180',
          900: '#374567',
          950: '#1a2234',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid type scale
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.25vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.35vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)',
        'fluid-xl': 'clamp(1.25rem, 1rem + 0.75vw, 1.75rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.1rem + 1.25vw, 2.25rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.2rem + 2vw, 3rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.3rem + 3vw, 4rem)',
        'fluid-hero': 'clamp(2.75rem, 1.5rem + 4vw, 5.5rem)',
      },
      spacing: {
        'section': 'clamp(4rem, 3rem + 4vw, 8rem)',
        'section-sm': 'clamp(2rem, 1.5rem + 2vw, 4rem)',
      },
      maxWidth: {
        'content': '72rem',
        'narrow': '48rem',
      },
      letterSpacing: {
        'display': '-0.02em',
        'wide-caps': '0.15em',
      },
      lineHeight: {
        'display': '1.1',
        'relaxed-body': '1.75',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
