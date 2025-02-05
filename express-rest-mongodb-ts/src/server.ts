import app from '@/app';
import { NODE_ENV, PORT } from '@/configs/constant';

(async () => {
	try {
		console.log('[SERVER] starting HTTP server...');
		const server = app.listen(parseInt(PORT), () => {
			console.log(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
			console.log(`[SERVER] NODE_ENV = ${NODE_ENV}`);
		});

		process.on('SIGTERM', () => {
			console.log('[SERVER] SIGTERM signal received: closing HTTP server...');
			server.close(() => {
				console.log('SERVER] HTTP server closed.');
			});
		});

		process.on('SIGINT', () => {
			console.log('[SERVER] SIGINT signal received: closing HTTP server...');
		});
	} catch (error) {
		console.error('[SERVER] Error during shutdown:', error);
		process.exit(1);
	}
})();
