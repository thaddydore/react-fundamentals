import { createContext, useState, useEffect, useContext } from 'react';

// hihger oder component

export const auth = Component => {
	const AuthComponent = props => {
		const isAuthenticated = true;

		console.log('AuthComponent');
		return isAuthenticated ? <Component {...props} /> : <Navigate to='/login' />;
		// return <Component {...props} />;
	};

	return AuthComponent;
};

const ThemeContext = createContext({
	dark: {
		primary: '#000',
		secondary: '#fff',
		background: '#fff',
		text: '#000',
	},
	light: {
		primary: '#fff',
		secondary: '#000',
		background: '#000',
		text: '#fff',
	},

	theme: 'light',
});

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');
	const [isInitialRender, setIsInitialRender] = useState(true);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			setTheme(storedTheme);
		} else {
			localStorage.setItem('theme', theme);
		}
	}, []);

	useEffect(() => {
		if (isInitialRender) {
			setIsInitialRender(false);
			return;
		}

		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
				dark: {
					primary: '#000',
					secondary: '#fff',
					background: '#fff',
					text: '#000',
				},
				light: {
					primary: '#fff',
					secondary: '#000',
					background: '#000',
					text: '#fff',
				},
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
