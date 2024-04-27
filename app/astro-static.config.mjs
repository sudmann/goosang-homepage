import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
    srcDir: './src',
    publicDir: './public',
    compressHTML: false,
    outDir: '../.dist/static/astro',
    output: 'static',
    integrations: [
        tailwind({ configFile: 'app/tailwind.config.mjs' })
    ],
     vite: {
        cacheDir: '../node_modules/.vite',
    },
})