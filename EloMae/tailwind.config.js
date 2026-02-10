import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Primary Colors
                'primary': {
                    100: '#D8CCF9',
                    200: '#C5A3FF',
                    300: '#A489F4',
                    400: '#8566E0',
                    500: '#7456CD',
                    600: '#A55EFC',
                    700: '#7D40C8',
                    800: '#6B62FB',
                    900: '#C6C3FF',
                },
                // Secondary Colors
                'secondary': {
                    100: '#69A658',
                    200: '#CF4545',
                    300: '#B83838',
                },
                // Neutral Colors
                'neutral': {
                    100: '#FAFAFA',
                    200: '#F9F6FF',
                    300: '#E1E1E1',
                    400: '#E0E0E0',
			        500: '#D9D9D9',
                    600: '#B0B0B0',
                    700: '#838383',
			        800: '#2F2F2F',
                    900: '#1C1C1C',
                },
            },
        },
    },

    plugins: [forms],
};
