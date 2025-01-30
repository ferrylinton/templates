import errorHandler from '@/middlewares/error-handler';
import messageRouter from '@/routers/message-router';
import express from 'express';
import favicon from 'express-favicon';
import { fileURLToPath } from 'node:url';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const currentDir = isProd ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('trust proxy', 1);
app.use(favicon(path.join(currentDir, 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
	res.status(200).json({ message: 'Horas' });
});

app.get('/api/ping', (_req, res) => {
	res.status(200).json({ message: 'OK' });
});

app.get('/api/error', (_req, _res, next) => {
	setTimeout(() => {
		try {
			throw new Error('Error response message');
		} catch (err) {
			next(err);
		}
	}, 100);
});

app.use('/api', messageRouter);

app.use(errorHandler);

app.use((_req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

export default app;
