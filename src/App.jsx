import { createBrowserRouter } from 'react-router-dom';
import Todo from './components/todo';
import EditTodo from './components/editTodo';
import TodoServer from './components/todoServer';
import Navbar from './components/navbar';

export const routes = createBrowserRouter([
	{
		path: '/',
		Component: Navbar,
		children: [
			{
				path: '/',
				Component: Todo,
			},
			{
				path: 'edit/:id',
				Component: EditTodo,
			},
			{
				path: 'todo',
				Component: TodoServer,
			},
		],
	},
]);
