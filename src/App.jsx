import { createBrowserRouter } from 'react-router-dom';
import Todo from './components/todo';
import EditTodo from './components/editTodo';

export const routes = createBrowserRouter([
	{
		path: '/',
		Component: Todo,
	},
	{
		path: 'edit/:id',
		Component: EditTodo,
	},
]);
