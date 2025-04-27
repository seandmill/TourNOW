import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this glob based on your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
