import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'express-favicon';
import { fileURLToPath } from 'node:url';
import path from 'path';
import messageRouter from './routers/message-router';

const currentDir =
	process.env.NODE_ENV === 'production'
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set('trust proxy', 1);

app.use(favicon(path.join(currentDir, 'favicon.ico')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_, res) => {
	res.send('Hello Vite + React + TypeScript!');
});

app.use('/api', messageRouter);

export default app;
