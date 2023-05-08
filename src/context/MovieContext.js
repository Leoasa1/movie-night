import { createContext, useContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
	const [movieList, setMovieList] = useState([]);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		if (typeof localStorage !== 'undefined') {
			const storedMovieList = JSON.parse(
				localStorage.getItem('movieList')
			);
			if (storedMovieList) {
				setMovieList(storedMovieList);
			}
		}
	}, []);

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
		} else if (typeof localStorage !== 'undefined') {
			localStorage.setItem('movieList', JSON.stringify(movieList));
		}
	}, [movieList]);

	return (
		<MovieContext.Provider value={{ movieList, setMovieList }}>
			{children}
		</MovieContext.Provider>
	);
};

export function useAppContext() {
	return useContext(MovieContext);
}
