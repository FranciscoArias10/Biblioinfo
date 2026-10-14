/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#E08738',
          hover: '#C9732B',
          light: '#F5A962',
          dark: '#B4621C',
        },
        dark: {
          bg: '#141312',
          surface: '#1C1A18',
          band: '#1C1A18',
          card: '#1A1816',
          header: 'rgba(20, 19, 18, 0.92)',
          border: '#2B2724',
          borderStrong: '#4A433E',
          text: '#F3ECE2',
          muted: '#B9AFA5',
          dim: '#8E857C',
          body: '#D6CCC1',
          footer: '#0E0D0C',
        },
        paper: {
          bg: '#FBF7F1',
          surface: '#FFFFFF',
          band: '#F3ECE2',
          card: '#FFFFFF',
          header: 'rgba(251, 247, 241, 0.92)',
          border: '#E6DCCF',
          borderStrong: '#D4C6B5',
          text: '#1E1A17',
          muted: '#5E534A',
          dim: '#74675C',
          body: '#3D352F',
          brown: '#8C5E48',
          footer: '#1E1A17',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 18px 30px -16px rgba(0, 0, 0, 0.55)',
        'float-dark': '0 24px 50px -20px rgba(0, 0, 0, 0.7)',
        'float-light': '0 24px 44px -22px rgba(90, 55, 30, 0.35)',
        'card-light': '0 1px 2px rgba(90, 55, 30, 0.06), 0 12px 28px -18px rgba(90, 55, 30, 0.22)',
      },
    },
  },
  plugins: [],
}
