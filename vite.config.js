import { resolve, relative, extname } from 'path'
import { defineConfig } from 'vite'
import { glob } from 'glob'
import handlebarsPlugin from 'vite-plugin-handlebars'
import data from './src/data'

const root = 'src/html'

const entries = {}
const htmlPages = glob.sync(`${root}/**/*.html`).forEach(p => {
    let relPath = relative(root, p)

    entries[relPath] = p
})

export default defineConfig({
    plugins: [
        handlebarsPlugin({
            partialDirectory: [
                resolve(__dirname, 'src', 'html', 'hbs'),
            ],

            context: {
                ...data,
                env: process.env.NODE_ENV
            },

            helpers: {
                eq: function(v1, v2){
                    return (v1 === v2)
                },
                notEq: function(v1, v2){
                    return (v1 != v2)
                },
            }
        })
    ],
    root,
    publicDir: resolve(__dirname, 'public'),
    resolve: {
        alias: {
            '@/': resolve(__dirname, 'src'),
        },
    },
    optimizeDeps: {
        entries: Object.keys(entries),
    },
    build: {
        target: 'esnext',
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: entries,
            external: ['apexchart', 'alpinejs'],
            output: {
                assetFileNames: (chunkInfo) => {
                     let outDir = ''

                    if (/css$/.test(chunkInfo.name)) {
                        outDir = 'css'
                    }
                    
                    return `${outDir}/[name][extname]`;
                },
                chunkFileNames: 'js/[name]-[hash].js'
            }
        },
    },
}) 