
/* IMPORT */

import { resolve, join } from 'path'
import { defineConfig } from 'vite'

/* MAIN */

const config = defineConfig({
    // optimizeDeps: {
    //     include: ['../via.js'],
    // },

    esbuild: {
        jsx: 'automatic',
    },

    // base: "./",
    root: join(__dirname, "src"),
    build: {
        // commonjsOptions: {
        //     include: [/via.js /, /node_modules/],
        // },
        minify: false,
        rollupOptions: {
            input: {
                main: resolve(__dirname, './src/index.html'), // to force dir structured.
                "dom-in-worker": resolve(__dirname, './src/dom-in-worker/index.html'),
                "dom-worker": resolve(__dirname, './src/dom-in-worker/worker.tsx'),
                "worker-calls": resolve(__dirname, './src/worker-calls/index.html'),
                "call-worker": resolve(__dirname, './src/worker-calls/worker.ts')
            },
            output: {
                dir: resolve(__dirname, './dist'),
                // entryFileNames: assetInfo => {
                //     return assetInfo.name === 'worker'
                //         ? '[name].js'                  // put service worker in root
                //         : 'assets/js/[name]-[hash].js' // others in `assets/js/`
                // },
            }
        }
    }
})

/* EXPORT */

export default config
