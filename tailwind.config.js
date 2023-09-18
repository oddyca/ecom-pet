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
      'icon-blue': '#617A98',
      'stroke-blue': '#E7EDF6',
      'stroke-light-blue': '#E5EDF6',
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};

export default Config;
