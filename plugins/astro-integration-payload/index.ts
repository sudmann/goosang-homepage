import { type AstroIntegration } from "astro";
import { type Payload } from "payload";
import * as path from "path";

interface PayloadIntegrationArgs {
    /**
     * Absolute path to the built payload config file
     *
     * @type {string}
     * @memberof PayloadIntegrationArgs
     */
    builtConfigPath: string;
    
    /**
     * Function that will call payload init and returns a payload instance
     *
     * @memberof PayloadIntegrationArgs
     */
    init: () => Payload | Promise<Payload>
}

export function payload({  builtConfigPath, init }: PayloadIntegrationArgs): AstroIntegration {
    let errors: string[] = [];
    if (!path.isAbsolute(builtConfigPath)) {
        errors.push('astro-integration-payload: builtConfigPath must be absolute');
    }

    let mode: 'dev' | 'build' | 'preview';

    return {
        name: 'astro-integration-payload',
        hooks: {
            'astro:config:setup'({ config, addWatchFile, command, updateConfig, logger }) {
                mode = command;
                if (mode === 'dev') {
                    addWatchFile(builtConfigPath);
                }

                if (errors.length) {
                    errors.map(error => logger.error(error));
                    return;
                }
                
                logger.info(config.build.server.toString());
                logger.info(path.resolve('plugins/astro-integration-plugin')),
                logger.info(path.resolve('plugins/payload-plugin-astro')),
                updateConfig({
                    vite: {
                        ssr: {
                            external: [
                                config.outDir.toString(),
                                config.build.client.toString(),
                                config.build.server.toString(),
                                path.resolve('plugins/astro-integration-plugin'),
                                path.resolve('plugins/payload-plugin-astro'),
                            ].filter(Boolean)
                        }
                    }
                })
            },

            async 'astro:server:setup'({ server, logger }) {
                if (errors.length) {
                    return;
                }

                logger.info(process.cwd());

                if (mode === 'dev') {
                    const payload = await init();
                    if (payload.express) {
                        server.middlewares.use(payload.express);
                    }
                }
            }
        }
    }
}