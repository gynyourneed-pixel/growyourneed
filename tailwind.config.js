/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Light Theme Colors
      'gyn-bg-primary-light': '#e3e8f0',
      'gyn-bg-secondary-light': '#ffffff',
      'gyn-bg-tertiary-light': '#e9eaff',
      'gyn-text-primary-light': '#4a4a4a',
      'gyn-text-secondary-light': '#1d2a78',
      'gyn-border-primary-light': '#e9eaff',
      'gyn-border-secondary-light': '#1d2a78',
      'gyn-accent-light': '#f5a623',
      'gyn-sidebar-light': '#1d2a78',
      'gyn-sidebar-text-light': '#ffffff',
      'gyn-sidebar-interactive-light': '#3041c7',
      'gyn-bg-error-light': '#fee2e2',
      'gyn-border-error-light': '#ef4444',
      'gyn-text-error-light': '#991b1b',
      'gyn-bg-warning-light': '#fde8c5',
      'gyn-border-warning-light': '#f5a623',
      'gyn-text-warning-light': '#92400e',
      'gyn-bg-stat-green-light': '#dcfce7',
      'gyn-bg-stat-purple-light': '#f3e8ff',
      'gyn-bg-stat-tan-light': '#fde8c5',
      'gyn-text-positive-light': '#166534',
      'gyn-text-negative-light': '#991b1b',

      // Dark Theme Colors - Modern Refresh
      'gyn-bg-primary-dark': '#0f172a',
      'gyn-bg-secondary-dark': '#1e293b',
      'gyn-bg-tertiary-dark': '#334152',
      'gyn-text-primary-dark': '#cbd5e1',
      'gyn-text-secondary-dark': '#f1f5f9',
      'gyn-border-primary-dark': '#334152',
      'gyn-border-secondary-dark': '#475569',
      'gyn-accent-dark': '#f5a623',
      'gyn-sidebar-dark': '#0f172a',
      'gyn-sidebar-text-dark': '#f1f5f9',
      'gyn-sidebar-interactive-dark': '#1e293b',
      'gyn-bg-error-dark': '#7f1d1d',
      'gyn-border-error-dark': '#ef4444',
      'gyn-text-error-dark': '#fecaca',
      'gyn-bg-warning-dark': '#7c2d12',
      'gyn-border-warning-dark': '#f97316',
      'gyn-text-warning-dark': '#fed7aa',
      'gyn-bg-stat-green-dark': '#064e3b',
      'gyn-bg-stat-purple-dark': '#581c87',
      'gyn-bg-stat-tan-dark': '#7c2d12',
      'gyn-text-positive-dark': '#4ade80',
      'gyn-text-negative-dark': '#f87171',

      // Raw colors
      'gyn-tan': '#fde8c5',
      'gyn-blue-dark': '#1d2a78',
      
      // Standard Tailwind Colors
      'blue': {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      'purple': {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
      },
      'indigo': {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a6',
        900: '#312e81',
      },
      'gray': {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        850: '#1a202e',
        900: '#111827',
        950: '#030712',
      },
      'white': '#ffffff',
      'black': '#000000',
      'red': {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      'yellow': {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
      },
      'green': {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
    },
    extend: {
      backgroundImage: {
        'aurora-gradient': 'radial-gradient(ellipse at 75% 15%, #6366f1 0%, #0f172a 50%, #d946ef 100%)',
      },
      keyframes: {
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 15px 5px rgba(245, 166, 35, 0.5)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 25px 10px rgba(245, 166, 35, 0.7)' },
        },
        'click-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        }
      },
      animation: {
        aurora: 'aurora 15s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        scaleOut: 'scaleOut 0.3s ease-out',
        pulseGlow: 'pulseGlow 1.5s ease-in-out infinite',
        'click-pulse': 'click-pulse 0.3s ease-in-out',
      },
      screens: {
        'xxs': '320px',
        'xs': '375px',
        'xsm': '380px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      addUtilities({
        '.text-glow': {
          textShadow: `
            0 0 5px ${theme('colors.gyn-accent-light')},
            0 0 10px ${theme('colors.gyn-accent-light')}
          `,
        },
        '.dark .text-glow': {
          textShadow: `
            0 0 5px ${theme('colors.gyn-accent-dark')},
            0 0 10px ${theme('colors.gyn-accent-dark')}
          `,
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }
      })
    }
  ],
}
