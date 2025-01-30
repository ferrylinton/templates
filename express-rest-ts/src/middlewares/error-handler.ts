import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	try {
		console.error(err.stack);
		const status = err.statusCode || 500;
		const message = err.message || 'Something went wrong';
		res.status(status).json({
			message,
			stack: err.stack,
		});
	} catch (error: any) {
		console.error(error);
		res.status(500);
		return res.json({ message: error.message });
	}
};

export default errorHandler;
