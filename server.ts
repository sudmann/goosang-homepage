import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import payload from "payload";
import express from "express";
import { astro } from "./plugins/payload-plugin-astro";

// Load environment variables from `.env` file
dotenvExpand.expand(dotenv.config());

const port = process.env.PORT || 4444;
const app = express();

export async function initPayload() {
    await payload.init({
        secret: process.env.PAYLOAD_SECRET!,
        express: app,
    });
    return payload;
}

async function serve() {
    console.log(process.cwd());
    await initPayload();

    await astro({
        express: app,
        serverEntrypoint: `${process.cwd()}/.build/astro/server/entry.mjs`,
        clientDir: `${process.cwd()}/.build/astro/client`,
    });

    app.listen(port, async () => {
        console.log(`Express app listening on port ${port}`);
    })
}

if (process.argv[2] === '--serve') {
    serve()
}