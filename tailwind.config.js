/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        text: '#1a1a1a',
        neutral: '#6b7280',
        primary: {
          DEFAULT: '#4A7C59',
          50: '#eef5f1',
          100: '#d6e8de',
          200: '#add1bd',
          300: '#84ba9c',
          400: '#5ba37b',
          500: '#4A7C59',
          600: '#3D6548',
          700: '#304E38',
          800: '#233728',
          900: '#162118',
        },
        accent: {
          DEFAULT: '#b8860b',
          50: '#fdf8ec',
          100: '#fbf1d9',
          200: '#f7e3b3',
          300: '#f3d58d',
          400: '#dfa84e',
          500: '#b8860b',
          600: '#936908',
          700: '#6e4f06',
          800: '#4a3504',
          900: '#251c02',
        },
        warm: {
          DEFAULT: '#c19a6b',
          50: '#fdf9f4',
          100: '#faf3e9',
          200: '#f5e7d3',
          300: '#f0dbbd',
          400: '#e8c791',
          500: '#c19a6b',
          600: '#9b7a54',
          700: '#755b3f',
          800: '#4f3c2a',
          900: '#2a1d15',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#4a4a4a',
          subtle: '#8a8a8a',
          faint: '#d4d4d4',
        },
        paper: {
          DEFAULT: '#faf8f5',
          white: '#ffffff',
          cream: '#f5f0e8',
        }
      },
      fontFamily: {
        display: ['"Noto Serif SC"', 'serif'],
        body: ['"Noto Sans SC"', 'sans-serif'],
        mono: ['monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        'content': '75rem',
        'prose-wide': '75ch',
      },
      minHeight: {
        'hero': '92vh',
        'screen-80': '80vh',
        'screen-60': '60vh',
        'screen-40': '40vh',
      },
      height: {
        'hero': '92vh',
        'screen-80': '80vh',
        'screen-60': '60vh',
        'screen-40': '40vh',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'progress': 'progress 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.1)' },
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,0.06)',
        'medium': '0 4px 40px rgba(0,0,0,0.08)',
        'elevated': '0 8px 60px rgba(0,0,0,0.12)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.1), 0 8px 40px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
