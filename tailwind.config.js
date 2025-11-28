/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './src/**/*.{ts,tsx,js,jsx}',
        './public/index.html',
    ],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'var(--color-border)', /* slate-200 */
                input: 'var(--color-input)', /* slate-200 */
                ring: 'var(--color-ring)', /* blue-600 */
                background: 'var(--color-background)', /* gray-50 */
                foreground: 'var(--color-foreground)', /* slate-800 */
                primary: {
                    DEFAULT: 'var(--color-primary)', /* blue-600 */
                    foreground: 'var(--color-primary-foreground)', /* white */
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)', /* slate-500 */
                    foreground: 'var(--color-secondary-foreground)', /* white */
                },
                accent: {
                    DEFAULT: 'var(--color-accent)', /* amber-500 */
                    foreground: 'var(--color-accent-foreground)', /* slate-800 */
                },
                destructive: {
                    DEFAULT: 'var(--color-destructive)', /* red-500 */
                    foreground: 'var(--color-destructive-foreground)', /* white */
                },
                error: {
                    DEFAULT: 'var(--color-error)', /* red-500 */
                    foreground: 'var(--color-error-foreground)', /* white */
                },
                success: {
                    DEFAULT: 'var(--color-success)', /* emerald-500 */
                    foreground: 'var(--color-success-foreground)', /* white */
                },
                warning: {
                    DEFAULT: 'var(--color-warning)', /* amber-500 */
                    foreground: 'var(--color-warning-foreground)', /* slate-800 */
                },
                muted: {
                    DEFAULT: 'var(--color-muted)', /* slate-100 */
                    foreground: 'var(--color-muted-foreground)', /* slate-500 */
                },
                card: {
                    DEFAULT: 'var(--color-card)', /* white */
                    foreground: 'var(--color-card-foreground)', /* slate-800 */
                },
                popover: {
                    DEFAULT: 'var(--color-popover)', /* white */
                    foreground: 'var(--color-popover-foreground)', /* slate-800 */
                },
                text: {
                    primary: 'var(--color-text-primary)', /* slate-800 */
                    secondary: 'var(--color-text-secondary)', /* slate-500 */
                },
            },
            borderRadius: {
                lg: 'var(--radius-lg)', /* 12px */
                md: 'var(--radius-md)', /* 8px */
                sm: 'var(--radius-sm)', /* 6px */
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
            },
            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
            },
            transitionDuration: {
                '150': '150ms',
                '200': '200ms',
                '300': '300ms',
            },
            transitionTimingFunction: {
                'smooth': 'ease-out',
                'layout': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                'fade-in': 'fade-in 200ms ease-out',
                'slide-in-right': 'slide-in-right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                'slide-in-left': 'slide-in-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                'scale-in': 'scale-in 150ms ease-out',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('tailwindcss-animate'),
    ],
};