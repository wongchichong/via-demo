
/* IMPORT */

import { resolve, join } from 'path'
import { defineConfig } from 'vite'

/* MAIN */

const config = defineConfig({
    esbuild: {
        jsx: 'automatic',
    },

    root: join(__dirname, "src/worker-calls"),
})

/* EXPORT */

export default config
