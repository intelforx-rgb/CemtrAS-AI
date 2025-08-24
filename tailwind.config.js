/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Only include font sizes that are actually used
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem', 
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      // Reduce color palette to only used colors
      colors: {
        // Keep only the colors actually used in the project
        slate: {
          300: '#cbd5e1',
          700: '#334155', 
          800: '#1e293b',
          900: '#0f172a'
        },
        yellow: {
          500: '#eab308'
        },
        blue: {
          600: '#2563eb',
          700: '#1d4ed8'
        },
        green: {
          600: '#16a34a'
        },
        red: {
          600: '#dc2626'
        },
        gray: {
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563'
        }
      }
    },
  },
  plugins: [],
}
