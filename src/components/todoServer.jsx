import { useState } from 'react';
import TodoList from './todoList';
import './styles.css';
import { request } from '../util/request';
import { useQuery, useMutation } from '@tanstack/react-query';

// fecth method  or axios

const Todo = () => {
	const [todo, setTodo] = useState('');

	const { data, isLoading, error, isError, refetch } = useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const { data } = await request.get('/todos');
			return data;
		},
	});

	const postTodoMutation = useMutation({
		mutationFn: async todo => {
			const { data } = await request.post('/todos', todo);
			return data;
		},
		onSuccess: () => {
			refetch();
			setTodo('');
			alert('Todo added successfully');
		},
		onError: error => {
			const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
			alert(errorMessage);
		},
	});

	const markCompleteMutation = useMutation({
		mutationFn: async id => {
			return await request.put(`/todos/${id}`, {
				completed: true,
			});
		},
		onSuccess: () => {
			refetch();
			alert('Todo completed successfully');
		},
		onError: error => {
			const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
			alert(errorMessage);
		},
	});

	const trashMutation = useMutation({
		mutationFn: async id => {
			return await request.delete(`/todos/${id}`);
		},
		onSuccess: () => {
			refetch();
			alert('Todo deleted successfully');
		},
		onError: error => {
			const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
			alert(errorMessage);
		},
	});

	const todos = data || [];

	const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;

	const handleInputChange = e => {
		const { value } = e.target;
		setTodo(value);
	};

	const handleAddTodo = e => {
		e.preventDefault();
		if (!todo) return;
		postTodoMutation.mutate({ name: todo });
	};

	const handleMarkComplete = id => {
		markCompleteMutation.mutate(id);
	};

	const handleTrash = id => {
		trashMutation.mutate(id);
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
						disabled={postTodoMutation.isLoading}
					/>
					<button type='submit' className='btn' disabled={postTodoMutation.isLoading}>
						{postTodoMutation.isLoading ? 'Creating...' : 'Add'}
					</button>
				</form>

				{isLoading && <p>Loading...</p>}
				{isError && <p className='error'>{errorMessage}</p>}
				{todos.length === 0 && !isLoading && <p className='empty'>No todos available</p>}
				<TodoList
					todos={todos}
					handleMarkComplete={handleMarkComplete}
					handleTrash={handleTrash}
					isDeleting={trashMutation.isLoading}
				/>
			</div>
		</main>
	);
};

export default Todo;
