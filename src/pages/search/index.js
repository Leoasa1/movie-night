import React, { useContext, useState, useId, useEffect } from 'react';
import Select from 'react-select';
import Axios from 'axios';
import Card from '@/components/card/Card';
import Loader from '@/components/loader/Loader';
import { API_URL } from '@/config/index.js';

const index = () => {
	const [genre, setGenre] = useState();
	const [movies, setMovies] = useState({});
	const [isLoading, setLoading] = useState(false);

	const getMovies = async (e) => {
		e.preventDefault();
		const options = {
			method: 'GET',
			url: `${API_URL}/movies/search-by-genre`,
			params: {
				genre: genre.value,
			},
		};
		setLoading(true);
		await Axios.request(options)
			.then((response) => {
				setMovies(response.data);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};

	const customStyles = {
		control: (base) => ({
			...base,
			background: '#374151',
			color: '#ffffff',
			height: '45px',
		}),
		menu: (base) => ({
			...base,
			background: '#252a33',
		}),
		option: (base) => ({
			...base,
			color: '#fff',
			'&:hover': {
				color: '#000',
			},
		}),
		singleValue: (provided) => ({
			...provided,
			color: '#fff',
		}),
	};

	const movieOptions = [
		{ value: 'Drama', label: 'Drama' },
		{ value: 'Thriller', label: 'Thriller' },
		{ value: 'Comedy', label: 'Comedy' },
		{ value: 'Fantasy', label: 'Fantasy' },
		{ value: 'Romance', label: 'Romance' },
		{ value: 'Action', label: 'Action' },
		{ value: 'Mystery', label: 'Mystery' },
		{ value: 'Crime', label: 'Crime' },
		{ value: 'Adventure', label: 'Adventure' },
		{ value: 'Horror', label: 'Horror' },
		{ value: 'Sci-Fi', label: 'Sci-Fi' },
		{ value: 'Animation', label: 'Animation' },
		{ value: 'Western', label: 'Western' },
	];

	useEffect(() => {});

	return (
		<>
			<div className='py-10 max-w-xl mx-auto text-center'>
				<h1 className='text-4xl'>Search by Genre</h1>
				<form
					className='max-w-xl text-start flex flex-col gap-3 my-10'
					onSubmit={getMovies}
				>
					<Select
						styles={customStyles}
						className='text-white'
						options={movieOptions}
						onChange={(selectedCategory) =>
							setGenre(selectedCategory)
						}
						instanceId={useId()}
					/>
					<button type='submit' className='btn btn-primary'>
						Search
					</button>
				</form>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{movies.length > 0 ? (
						<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-x-5 md:gap-y-10 p-4 md:p-10 justify-items-center'>
							{/* Render the cards once the movies data is loaded */}
							{movies.map((item) => {
								return (
									<Card
										key={item.id}
										primaryImage={item.primaryImage}
										movieId={item.id}
									/>
								);
							})}
						</div>
					) : (
						<></>
					)}
				</>
			)}
		</>
	);
};

export default index;
