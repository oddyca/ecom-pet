/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react';

const colors = require('tailwindcss/colors');

const Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      ...colors,
      black: '#2D2D2D',
      'icon-blue': '#617A98',
      'stroke-blue': '#E7EDF6',
      'stroke-light-blue': '#E5EDF6',
      'link-blue': '#70A3E1',
    },
    flex: {
      embla: '0 0 100%',
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    defaultTheme: 'light',
    themes: {
      'sort-light': {
        extend: 'light',
        colors: {
          primary: {
            DEFAULT: '#617A98', // 617A98
            foreground: '#FFFFFF', // F7F9FF
            background: '#FFFFFF',
          },
          focus: '#FFFFFF',
        },
      },
    },
  })],
};

export default Config;
