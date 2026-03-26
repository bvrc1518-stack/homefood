import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f0',
          100: '#ffefd6',
          200: '#ffd9a8',
          300: '#ffbe70',
          400: '#ff9a36',
          500: '#ff7d0f',
          600: '#f06005',
          700: '#c74606',
          800: '#9e380d',
          900: '#7f300e',
          950: '#451504',
        },
        warm: {
          50: '#fdf8f0',
          100: '#faecd8',
          200: '#f4d5a8',
          300: '#ecb870',
          400: '#e2943a',
          500: '#d97a1a',
          600: '#c06110',
          700: '#9f4c10',
          800: '#813d14',
          900: '#6b3414',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
