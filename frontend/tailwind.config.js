/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F6B4F', // soft forest green
          light: '#3C8462',
          dark: '#214D38',
        },
        secondary: {
          DEFAULT: '#8FD9A8', // mint
          light: '#B7E4C7',
          dark: '#6BBF88',
        },
        accent: {
          DEFAULT: '#F4E9D8', // warm earth/sand
          dark: '#E8C39E',
        },
        background: {
          DEFAULT: '#F7FAF7', // very light sage
          alt: '#FAFFFB',
        },
        text: {
          DEFAULT: '#1F2D24', // dark slate green
          muted: '#4A6254',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(47, 107, 79, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(47, 107, 79, 0.12)',
      }
    },
  },
  plugins: [],
}
