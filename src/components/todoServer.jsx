import { useState, useEffect } from 'react';
import TodoList from './todoList';
import './styles.css';
import { request } from '../util/request';

// fecth method  or axios

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');
	const [loading, setLoading] = useState(true);
	const [iscreating, setIsCreating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchTodos('/todos');
	}, []);

	async function fetchTodos(url) {
		setLoading(true);
		setError(null);

		try {
			const { data: todo } = await request.get(url);

			setTodos(todo);
		} catch (error) {
			const errorMessage = error.response.data.message ? error.response.data.message : error.message;
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}

	const handleInputChange = e => {
		const { value } = e.target;
		setTodo(value);
	};

	const handleAddTodo = async e => {
		e.preventDefault();
		if (!todo) return;
		setError(null);
		setIsCreating(true);

		try {
			const { data: newTodo } = await request.post('/todos', { name: todo });

			setTodos(prevTodos => [...prevTodos, newTodo]);

			setTodo('');
			alert('Todo added successfully');
		} catch (error) {
			const errorMessage = error.response.data.message ? error.response.data.message : error.message;
			setError(errorMessage);
		} finally {
			setIsCreating(false);
		}
	};

	const handleMarkComplete = async id => {
		try {
			await request.get(`/todos/${id}`);

			setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, completed: true } : todo)));
		} catch (error) {
			const errorMessage = error.response.data.message ? error.response.data.message : error.message;
			setError(errorMessage);
		}
	};

	const handleTrash = async id => {
		setError(null);
		setIsDeleting(true);
		try {
			await request.delete(`/todos/${id}`);

			setTodos(prev => prev.filter(todo => todo.id !== id));
			alert('Todo deleted successfully');
		} catch (error) {
			const errorMessage = error.response.data.message ? error.response.data.message : error.message;
			setError(errorMessage);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<main className='container'>
			<div className='todo'>
				<h1 className='heading'>Todo List</h1>
				<form onSubmit={handleAddTodo}>
					<input
						type='text'
						placeholder='Add a new task'
						onChange={handleInputChange}
						value={todo}
						className='input'
						disabled={iscreating}
					/>
					<button type='submit' className='btn' disabled={iscreating}>
						{iscreating ? 'Creating...' : 'Add'}
					</button>
				</form>

				{loading && <p>Loading...</p>}
				{error && <p className='error'>{error}</p>}
				{todos.length === 0 && !loading && <p className='empty'>No todos available</p>}
				<TodoList
					todos={todos}
					handleMarkComplete={handleMarkComplete}
					handleTrash={handleTrash}
					isDeleting={isDeleting}
				/>
			</div>
		</main>
	);
};

export default Todo;
