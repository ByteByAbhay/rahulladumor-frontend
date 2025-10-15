/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1B365D', // Enterprise navy (primary) - slate-800
        'secondary': '#2E5984', // Supporting hierarchy (secondary) - slate-700
        'accent': '#FF9900', // AWS orange (accent) - orange-500
        'background': '#FFFFFF', // Clean canvas (background) - white
        'surface': '#F8FAFC', // Subtle section separation (surface) - slate-50
        'text-primary': '#1A202C', // Maximum contrast (text-primary) - gray-900
        'text-secondary': '#4A5568', // Supporting details (text-secondary) - gray-600
        'success': '#38A169', // Positive metrics (success) - green-500
        'warning': '#ED8936', // Scarcity messaging (warning) - orange-400
        'error': '#E53E3E', // Form validation (error) - red-500
        'border': '#E2E8F0', // Form inputs and cards (border) - gray-200
        'border-focus': '#FF9900', // CTA focus states (border-focus) - orange-500
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.6' }],        // 16px - body text
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1.2' }],         // 48px - h2
        '6xl': ['3.5rem', { lineHeight: '1.2' }],       // 56px - h1
        '7xl': ['4.5rem', { lineHeight: '1.1' }],       // 72px - hero
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.03em',
      },
      boxShadow: {
        'nav': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'cta': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite',
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-in': 'slideIn 300ms ease-in-out',
        'spin-reverse': 'spin 1s linear infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      zIndex: {
        'nav': '100',
        'menu': '200',
        'modal': '300',
      },
    },
  },
  plugins: [],
}