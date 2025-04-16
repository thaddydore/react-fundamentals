import { Link, Outlet } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
	return (
		<main>
			<nav className='nav'>
				<Link to='/'>Home</Link>
				<Link to='/todo'>Todo</Link>
			</nav>
			<Outlet />
		</main>
	);
};

export default Navbar;
