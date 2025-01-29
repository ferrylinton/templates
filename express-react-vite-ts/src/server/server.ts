import express from 'express';
import app from '@/server/app';
import { PORT } from './config/constant';

const callback = () => {
	console.log(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
};

const main = async () => {
	try {
		app.listen(parseInt(PORT), callback);

		if (process.env.NODE_ENV !== 'production') {
			console.log('#### Import ViteDevServe on Development mode ####');
			console.log('#### This code will be removed after compiled ####');
			const viteDevServer = await import('vite').then(vite =>
				vite.createServer({
					server: { middlewareMode: true },
				})
			);
			app.use(viteDevServer.middlewares);
		}

		if (process.env.NODE_ENV === 'production') {
			app.use('/assets', express.static('client/assets', { immutable: true, maxAge: '1y' }));
			app.use(express.static('client', { maxAge: '1h' }));
		}
	} catch (error) {
		console.error(error);
		process.exit();
	}
};

main();
