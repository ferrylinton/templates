import errorHandler from '@/middlewares/error-handler';
import todoRouter from '@/routers/todo-router';
import express from 'express';
import favicon from 'express-favicon';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getRandomNumber } from './utils/number-util';

const isProd = process.env.NODE_ENV === 'production';
const currentDir = isProd ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('trust proxy', 1);
app.use(favicon(path.join(currentDir, 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (_req, res) => {
	await new Promise(r => setTimeout(r, 5000));
	const id = getRandomNumber();
	const pid = process.pid;
	const date = new Date().toISOString();
	const message = `#${id} : Message from ProcessId : ${pid} at ${date}`;
	console.log(message);
	res.status(200).json({ id, pid, date });
});

app.get('/api/ping', (_req, res) => {
	res.status(200).json({ message: 'OK' });
});

app.use('/api', todoRouter);

app.use(errorHandler);

app.use((_req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

export default app;
