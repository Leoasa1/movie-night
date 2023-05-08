import React from 'react';
import Image from 'next/image';
import { MovieContext } from '../../context/MovieContext';
import { useContext } from 'react';

const WatchlistCard = ({ title, rating, content_rating, image_url, plot }) => {
	const { movieList, setMovieList } = useContext(MovieContext);

	const removeMovie = () => {
		const updatedMovies = movieList.filter(
			(movie) => movie.title !== title
		);
		setMovieList(updatedMovies);
	};

	return (
		<div className='bg-gray-800 shadow-xl grid grid-cols-5 lg:grid-cols-8 w-full'>
			<figure className='col-span-2 lg:col-span-2'>
				<Image
					className='w-40 md:w-64 h-64 md:h-80'
					src={image_url}
					alt='Movie Image'
					width={300}
					height={500}
					object-fit='cover'
				/>
			</figure>
			<div className='card-body col-span-3 lg:col-span-6'>
				<h2 className='card-title'>{title}</h2>
				<div className='flex gap-4 text-white'>
					<div className='badge badge-info w-28 px-2'>
						Rating: {rating}
					</div>
					<div className='badge badge-neutral w-28 px-2'>
						{content_rating}
					</div>
				</div>
				<p>{plot}</p>
				<div className='card-actions justify-end'>
					<button className='btn btn-primary' onClick={removeMovie}>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
};

export default WatchlistCard;
