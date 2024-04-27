import { viteBundler } from "@payloadcms/bundler-vite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig, } from "payload/config";
import path from "path";
import { webpackBundler } from "@payloadcms/bundler-webpack";

export default buildConfig({
    admin: {
        bundler: webpackBundler(),
        buildPath: path.resolve(process.cwd(), '.build/payload-client'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI
        }
    }),
    editor: slateEditor({})
})