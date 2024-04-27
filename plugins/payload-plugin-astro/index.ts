import express from "express";
import path from "path";
import fs from "fs/promises";

interface AstroPluginArgs {
    express: ReturnType<typeof express>;
    serverEntrypoint: string,
    clientDir: string;
    staticOptions?: any;
}

export async function astro({ express: app, serverEntrypoint, clientDir, staticOptions = {}}: AstroPluginArgs): Promise<ReturnType<typeof express> | void> {
    if (!path.isAbsolute(serverEntrypoint)) throw new Error('serverEntry must be an absolute path')
	if (!path.isAbsolute(clientDir)) throw new Error('clientDir must be an absolute path')

    const { handler } = await import (serverEntrypoint /* @vite-ignore */);
    app.use(handler);

    // serve astro static files
    app.use('/', express.static(clientDir, staticOptions));	
    
    // astro 404s don't work in production, so we fix it here
	try {
		const static404 = await fs.readFile(path.join(clientDir, '404.html'))
		app.use(function (req, res, next) {
			res.status(404).send(static404.toString())
		})	
	} catch(e) {
		console.log('Using basic 404, add a 404.html page and retry')
	}
	
	return app
}