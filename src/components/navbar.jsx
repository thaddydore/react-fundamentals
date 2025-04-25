import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../themeProvider';
import './styles.css';
import { auth } from '../themeProvider';

const Navbar = () => {
	const { theme, toggleTheme } = useTheme();

	console.log(theme, 'theme');

	return (
		<main>
			<nav className='nav'>
				<Link to='/'>Home</Link>
				<Link to='/todo'>Todo</Link>
				<button className={`switch-button ${theme === 'light' ? 'light' : 'dark'}`} onClick={toggleTheme}>
					Swith theme
				</button>
			</nav>
			<Outlet />
		</main>
	);
};

export default auth(Navbar);
