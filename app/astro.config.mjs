import { defineConfig } from 'astro/config';
import nodeAdapter from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import { payload } from '../plugins/astro-integration-payload';
import { initPayload } from '../server';

// https://astro.build/config
export default defineConfig({
    srcDir: './src',
    publicDir: './public',
    compressHTML: false,
    outDir: '../.build/astro',
    output: 'hybrid',
    build: {
        client: '../.build/astro/client',
        server: '../.build/astro/server',
        assets: 'assets'
    },
    vite: {
        cacheDir: '../node_modules/.vite',
    },
    adapter: nodeAdapter({ mode: "middleware" }),
    integrations: [
        tailwind({
            configFile: 'app/tailwind.config.mjs',
        }),
        payload({
            builtConfigPath: process.cwd() + `/.build/cms/payload.config.cjs`,
            init: initPayload,
        })
    ]
});
