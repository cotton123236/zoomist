/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

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
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        base: ['Inter', 'Noto Sans TC', 'sans-serif'],
        code: ['Roboto Mono', 'monospace'],
        playfair: ['Playfair Display', 'serif']
      },
      colors: {
        gray: {
          50: '#f4f4f4',
          100: '#dddddd',
          200: '#aaaaaa',
          300: '#999999',
          400: '#777777',
          500: '#666666',
          600: '#555555',
          700: '#444444',
          800: '#333333',
          900: '#222222',
          950: '#141414'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
      // fontSize: {
      //   // h1
      //   h1: [rem(28), 1.2],
      //   'h1-md': [rem(32), 1.2],
      //   'h1-lg': [rem(36), 1.2],
      //   // h2
      //   h2: [rem(28), 1.2],
      //   'h2-md': [rem(32), 1.2],
      //   'h2-lg': [rem(24), 1.2],
      //   // h3
      //   h3: [rem(24), 1.3],
      //   'h3-md': [rem(28), 1.3],
      //   'h3-lg': [rem(32), 1.3],
      //   // h4
      //   h4: [rem(20), 1.3],
      //   'h4-md': [rem(22), 1.4],
      //   'h4-lg': [rem(24), 1.4],
      //   // h5
      //   h5: [rem(18), 1.4],
      //   'h5-md': [rem(18), 1.5],
      //   'h5-lg': [rem(20), 1.5],
      //   // h6
      //   h6: [rem(16), 1.5],
      //   'h6-md': [rem(16), 1.6],
      //   'h6-lg': [rem(18), 1.6]
      // }
    }
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('tailwindcss-animate'),
    plugin(({ addVariant }) => {
      addVariant('hover-only', '@media (hover: hover)')
    })
  ]
}
