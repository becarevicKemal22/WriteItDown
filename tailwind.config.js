/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                title: ['"Montserrat"'],
                body: ['"Open Sans"'],
            },
            dropShadow: {
                'side': '10px 0 10px rgba(0, 0, 0, 0.25)',
            },
            colors: {
                'primary': '#5F55D2',
                'primary-light': '#7B6FFB',
                'primary-dark': '#4D3EEB',
                'tag': '#d3d0ff',
                'primary-lighter': '#EDEBFE',
                'gray-225': "#E0E3E7",
            },
            fontSize: {
                'tiny': '0.8rem',
            },
            'animation': {
                'skeleton':'skeleton 3s ease infinite',
            },
            'keyframes': {
                'skeleton': {
                    '0%, 100%': {
                        'background-size':'200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size':'200% 200%',
                        'background-position': 'right center'
                    }
                },
            }
        },
    },
    plugins: [],
}
