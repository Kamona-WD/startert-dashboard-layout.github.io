import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
import twPlugin from './tw-plugin'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './src/**/*.{astro,js,ts}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Cairo', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        forms,
        twPlugin,
        iconsPlugin({
            collections: getIconCollections(['tabler']),
        })
    ],
}

