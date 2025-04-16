import { useState, useEffect } from 'react';
import TodoList from './todoList';
import './styles.css';

// fecth method  or axios

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');

	useEffect(() => {});

	const handleInputChange = e => {
		const { value } = e.target;
		setTodo(value);
	};

	const handleAddTodo = e => {
		e.preventDefault();
		if (!todo) return;

		const newTodo = {
			id: Date.now(),
			name: todo,
			completed: false,
			date: new Date().toLocaleDateString(),
		};

		setTodos(prevTodos => [...prevTodos, newTodo]);
		localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
		setTodo('');
	};

	const handleMarkComplete = id => {
		setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, completed: true } : todo)));
	};

	const handleTrash = id => {
		setTodos(prev => prev.filter(todo => todo.id !== id));
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
					/>
					<button type='submit' className='btn'>
						Add Todo
					</button>
				</form>
				<TodoList todos={todos} handleMarkComplete={handleMarkComplete} handleTrash={handleTrash} />
			</div>
		</main>
	);
};

export default Todo;
