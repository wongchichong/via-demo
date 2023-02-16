
/* IMPORT */

import { resolve, join } from 'path'
import { defineConfig } from 'vite'

/* MAIN */

const config = defineConfig({
    esbuild: {
        jsx: 'automatic',
    },

    root: join(__dirname, "src/dom-in-worker"),

    optimizeDeps: {
        exclude: ['voby']
    }
})

/* EXPORT */

export default config
