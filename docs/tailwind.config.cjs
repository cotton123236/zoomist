/** @type {import('tailwindcss').Config} */

const rem = (pixel) => {
  return (pixel / 16).toString() + 'rem'
}

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: rem(640),
      md: rem(768),
      lg: rem(1024),
      xl: rem(1280),
      '2xl': rem(1440)
    },
    extend: {
      fontFamily: {
        base: ['Inter', 'Noto Sans TC', 'sans-serif'],
        code: ['Roboto Mono', 'monospace']
      },
      colors: {
        gray: {
          50: '#f4f4f4',
          100: '#d4d4d4',
          200: '#aaaaaa',
          300: '#999999',
          400: '#777777',
          500: '#666666',
          600: '#555555',
          700: '#444444',
          800: '#333333',
          900: '#222222',
          950: '#141414'
        }
      }
    }
  },
  plugins: ['prettier-plugin-tailwindcss']
}
