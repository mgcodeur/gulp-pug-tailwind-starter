import { plugins as configPlugins } from './config/app.config.js'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

const allPlugins = {
  typography,
  forms,
  containerQueries
}

const activePlugins = Object.keys(allPlugins)
  .filter((key) => configPlugins[key])
  .map((key) => allPlugins[key])

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,pug}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: activePlugins,
  mode: 'jit'
}
