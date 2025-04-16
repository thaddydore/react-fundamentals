import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

const EditTodo = () => {
	const [todo, setTodo] = useState({});
	const [todoName, setTodoName] = useState('');
	const [todos, setTodos] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos')) || [];
		const todoToEdit = todos.find(todo => todo.id === parseInt(id));
		setTodoName(todoToEdit.name);
		setTodo(todoToEdit);
		setTodos(todos);
	}, []);

	const handleInputChange = e => {
		const { value } = e.target;
		setTodoName(value);
	};

	const handleAddTodo = e => {
		e.preventDefault();

		const editedTodo = {
			...todo,
			name: todoName,
		};

		const updatedTodos = todos.map(t => (t.id === todo.id ? editedTodo : t));
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
		setTodos(updatedTodos);
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
						value={todoName}
						className='input'
					/>
					<button type='submit' className='btn'>
						Edit Todo
					</button>
				</form>
			</div>
		</main>
	);
};

export default EditTodo;
