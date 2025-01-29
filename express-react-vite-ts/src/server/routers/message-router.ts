import express, { NextFunction, Request, Response } from 'express';

const getMessage = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		await new Promise(r => setTimeout(r, 1000));
		res.status(200).json({
			message: 'Horas !!!',
		});
	} catch (error) {
		next(error);
	}
};

const router = express.Router();

router.get('/messages', getMessage);

export default router;
