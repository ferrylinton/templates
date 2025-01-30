import { TODO_COLLECTION } from '@/configs/db-constant';
import { getCollection } from '@/configs/mongodb';
import { Todo } from '@/types/todo-type';
import { mapToObject } from '@/utils/json-util';
import { ObjectId } from 'mongodb';

export const findTodoes = async (): Promise<Todo[]> => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	const todoes = await todoCollection.find().sort({ createdAt: -1 }).toArray();
	return todoes.map(todo => mapToObject(todo));
};

export const countTodoes = async (): Promise<number> => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	return await todoCollection.countDocuments();
};

export const findTodoById = async (_id: string) => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	const todo = await todoCollection.findOne({ _id: new ObjectId(_id) });
	return todo ? mapToObject(todo) : null;
};

export const createTodo = async (task: string) => {
	const todo: Omit<Todo, 'id'> = {
		task,
		done: false,
		createdAt: new Date(),
	};
	const todoCollection = await getCollection<Omit<Todo, 'id'>>(TODO_COLLECTION);
	return await todoCollection.insertOne(todo);
};

export const updateTodo = async (id: string) => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	const updatedAt = new Date();
	const done = true;
	return await todoCollection.updateOne({ _id: new ObjectId(id) }, { $set: { done, updatedAt } });
};

export const deleteTodoById = async (id: string) => {
	const todoCollection = await getCollection<Todo>(TODO_COLLECTION);
	return await todoCollection.deleteOne({ _id: new ObjectId(id) });
};
