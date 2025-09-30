/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bc-pink': '#fc04cb',
        'bc-purple': '#b35dff',
        'bc-teal': '#00edc3',
        'bc-light-teal': '#e6fffa',
        'bc-blue': '#23075a',
        'bc-light-purple': '#f0e6ff',
        'bc-light-pink': '#ffe0f7',
        'bc-dark': '#1a1a1a',
        'bc-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #fc04cb 0%, #b35dff 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #00edc3 0%, #b35dff 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00edc3 0%, #00d4b0 100%)',
        'gradient-hover': 'linear-gradient(135deg, #e003b5 0%, #a04dee 100%)',
        'gradient-light': 'linear-gradient(135deg, #ffe0f7 0%, #f0e6ff 100%)',
      },
      fontFamily: {
        'sans': ['"BC Sans"', 'Helvetica', 'Arial', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['"BC Sans"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens: {
        'xs': '475px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}