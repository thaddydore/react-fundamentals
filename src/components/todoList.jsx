import './styles.css';
import { useNavigate } from 'react-router-dom';

const TodoList = ({ todos, handleMarkComplete, handleTrash }) => {
	const navigate = useNavigate();

	const handleEditTodo = id => {
		navigate(`/edit/${id}`);
	};

	return (
		<ul className='ul'>
			{todos.map(todo => (
				<li key={todo.id} className='li'>
					<div className='wrapper'>
						<span className='todoItem'>{todo.name}</span>
						<span className='todoItem'>{todo.date}</span>
					</div>

					<div className='wrapper'>
						<span className={todo.completed ? 'completed' : 'notCompleted'}>
							{todo.completed ? 'Completed' : 'Not Completed'}
						</span>

						{!todo.completed && (
							<button className='markComplete' onClick={() => handleMarkComplete(todo.id)}>
								&#10004;
							</button>
						)}

						<button className='trash' onClick={() => handleTrash(todo.id)}>
							&#128465;
						</button>
						<button className='trash' onClick={() => handleEditTodo(todo.id)}>
							&#9999;
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
