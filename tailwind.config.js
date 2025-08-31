/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f9fafb',
            tertiary: '#f3f4f6',
          },
          text: {
            primary: '#000000',
            secondary: '#111827',
            muted: '#374151',
          },
          border: '#e5e7eb',
        },
        // Dark mode colors
        dark: {
          bg: {
            primary: '#000000',
            secondary: '#0a0a0a',
            tertiary: '#111111',
          },
          text: {
            primary: '#ffffff',
            secondary: '#d1d5db',
            muted: '#9ca3af',
          },
          border: '#1f2937',
        },
        // Neon accent colors
        neon: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          emerald: '#10b981',
          orange: '#f59e0b',
          red: '#ef4444',
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 15s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'neon-glow': 'neon-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        'fadeInUp': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slideInRight': {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'neon-glow': {
          '0%, 100%': { 
            'box-shadow': '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6' 
          },
          '50%': { 
            'box-shadow': '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6' 
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
