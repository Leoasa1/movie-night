import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Card from '@/components/card/Card';
import Loader from '@/components/loader/Loader';
import { API_URL } from '@/config/index.js';
import { toast } from 'react-toastify';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const getMovies = async () => {
		const options = {
			method: 'GET',
			url: `${API_URL}/movies/random`,
			timeout: 5000,
		};

		await Axios.request(options)
			.then((response) => {
				setMovies(response.data);
				setLoading(false);
			})
			.catch((error) => {
				toast.error(error);
				setTimeout(() => {
					getMovies();
				}, 20000);
			});
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<>
			{isLoading ? (
				<div className='h-screen'>
					<Loader />
				</div>
			) : (
				<>
					<h3 className='border-b-2 border-primary mx-5 lg:mx-20 my-5 text-xl'>
						Genre - {movies.randomGenre}
					</h3>
					<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-x-5 md:gap-y-10 p-4 md:p-10 justify-items-center'>
						{/* Render the cards once the movies data is loaded */}
						{movies.movies.map((item) => {
							return (
								<Card
									key={item.id}
									primaryImage={item.primaryImage}
									movieId={item.id}
								/>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
