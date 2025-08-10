/** @type {import('tailwindcss').Config} */
export const minify = true;
export const content = [
    './src/components/**/*.{tsx,ts,jsx,js}',
    './src/assets/**/**/*.{tsx,ts,jsx,js,svg}',
    './src/pages/**/*.{tsx,ts,jsx,js}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = 'class';
export const theme = {
    extend: {
        fontFamily: {
            sans: ['Nunito', 'sans-serif'],
            gilroy: ['Gilroy', 'sans-serif'],
        },
        height: {
            10.5: '2.625rem',
            6.25: '1.625rem',
        },
        width: {
            10.5: '2.625rem',
            128: '32rem',
        },
        spacing: {
            1.4: '0.35rem',
            2.8: '0.7rem',
            3.75: '0.938rem',
            3.8: '0.95rem',
            7.5: '1.875rem',
        },
        // Smart home dashboard specific utilities
        borderRadius: {
            '4xl': '2rem',
            '5xl': '2.5rem',
        },
        boxShadow: {
            'card': '0 4px 20px 0 rgba(0, 0, 0, 0.15)',
            'card-hover': '0 8px 30px 0 rgba(0, 0, 0, 0.25)',
            'glass': '0 8px 32px 0 rgba(0, 173, 181, 0.1)',
            'glow': '0 0 20px rgba(0, 173, 181, 0.3)',
        },
        backdropBlur: {
            xs: '2px',
        },
        animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'fade-in': 'fadeIn 0.5s ease-in-out',
            'slide-up': 'slideUp 0.3s ease-out',
            'scale-in': 'scaleIn 0.2s ease-out',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
            slideUp: {
                '0%': { transform: 'translateY(20px)', opacity: '0' },
                '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            scaleIn: {
                '0%': { transform: 'scale(0.95)', opacity: '0' },
                '100%': { transform: 'scale(1)', opacity: '1' },
            },
        },
    },
    colors: {
        // Dark theme color palette
        background: {
            DEFAULT: '#222831',
            paper: '#393E46'
        },
        text: {
            primary: '#EEEEEE',
            secondary: '#393E46',
        },
        primary: {
            DEFAULT: '#00ADB5',
            main: '#00ADB5',
            light: '#33BDC4',
            dark: '#007A80',
            50: '#E6F9FA',
            100: '#B3EDEE',
            200: '#80E0E3',
            300: '#4DD4D7',
            400: '#1AC8CC',
            500: '#00ADB5',
            600: '#008A91',
            700: '#00676D',
            800: '#004449',
            900: '#002225'
        },
        secondary: {
            DEFAULT: '#EEEEEE',
            main: '#EEEEEE',
            light: '#F5F5F5',
            dark: '#BDBDBD',
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121'
        },
        // Semantic colors
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',
        // Smart home specific colors
        device: {
            online: '#4CAF50',
            offline: '#F44336',
            warning: '#FF9800',
            idle: '#9E9E9E',
        },
        // Transparent versions
        transparent: 'transparent',
        current: 'currentColor',
        // Basic colors for compatibility
        white: '#FFFFFF',
        black: '#000000',
        gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121'
        }
    },
};
export const plugins = [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
]; 