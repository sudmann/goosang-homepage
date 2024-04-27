import daisyUiPlugin from "daisyui";

/** @type { import('tailwindcss').Config } */
export default {
    //presets: baseTailwindConfig,
    content: [
        'app/src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,svelte,vue}'
    ],
    theme: { 
        extend: {}
    },
    plugins: [daisyUiPlugin],
    daisyui: {
        themes: [
            "dark",
            {
                "darkpink": {
                    "color-scheme": "dark",
                    "primary": "#ff00ff",
                    "primary-content": "#ffffff",
                    "secondary": "#d4d4d4",
                    "accent": "00ff00",
                    "neutral": "171717",
                    "base-100": "0a0a0a",
                }
            }
        ]
    }
}