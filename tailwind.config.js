/** @type {import('tailwindcss').Config} */
import { join } from 'path'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
export default {
  content: [join(__dirname, 'index.html'), join(__dirname, 'src/**/*.{vue,js,ts,jsx,tsx}')],
  theme: {
    extend: {},
  },
  plugins: [],
}
