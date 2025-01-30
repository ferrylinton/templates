import {
	countTodoes,
	createTodo,
	deleteTodoById,
	findTodoById,
	findTodoes,
	updateTodo,
} from '@/services/todo-service';
import express, { NextFunction, Request, Response } from 'express';

const getTodoesHandler = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const todoes = await findTodoes();
		res.status(200).json(todoes);
	} catch (error) {
		next(error);
	}
};

const postTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const total = await countTodoes();

		if (total >= 20) {
			res.status(400).json({
				errorMaxData: 'errorMaxData',
			});
		} else {
			const todo = await createTodo(req.body.task);
			res.status(201).json(todo);
		}
	} catch (error) {
		next(error);
	}
};

const getTodoByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const todo = await findTodoById(req.params.id);
		if (todo) {
			res.status(200).json(todo);
		} else {
			res.status(404).json({ message: 'Data is not found' });
		}
	} catch (error) {
		next(error);
	}
};

const putTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updateResult = await updateTodo(req.params.id);
		res.status(200).json(updateResult);
	} catch (error) {
		next(error);
	}
};

const deleteTodoHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deleteResult = await deleteTodoById(req.params.id);
		res.status(200).json(deleteResult);
	} catch (error) {
		next(error);
	}
};

const router = express.Router();

router.get('/todoes', getTodoesHandler);
router.post('/todoes', postTodoHandler);
router.get('/todoes/:id', getTodoByIdHandler);
router.put('/todoes/:id', putTodoHandler);
router.delete('/todoes/:id', deleteTodoHandler);

export default router;
