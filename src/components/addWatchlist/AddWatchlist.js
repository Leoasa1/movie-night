import React, { useContext, useState } from 'react';
import { MovieContext } from '../../context/MovieContext';
import Axios from 'axios';

const AddWatchlist = ({ movieId }) => {
	const { movieList, setMovieList } = useContext(MovieContext);
	const [isAdded, setIsAdded] = useState(false);

	const getMovieDetails = async () => {
		const options = {
			method: 'GET',
			url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieId}`,
			headers: {
				'content-type': 'application/octet-stream',
				'X-RapidAPI-Key':
					process.env.X_RAPIDAPI_KEY ||
					process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,
				'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
			},
		};
		try {
			const response = await Axios.request(options);
			return response.data.results;
		} catch (error) {
			console.log(error);
		}
	};
	const addMovieToList = async () => {
		const selectedMovie = await getMovieDetails();
		setMovieList([...movieList, selectedMovie]);
		setIsAdded(true);
	};

	const isMovieAdded = movieList.some((movie) => movie.imdb_id === movieId);

	return (
		<>
			{!isMovieAdded && (
				<button
					className='btn btn-secondary w-44'
					onClick={addMovieToList}
					disabled={isAdded}
				>
					{isAdded ? 'Added!' : 'Add to Watchlist'}
				</button>
			)}
		</>
	);
};

export default AddWatchlist;
