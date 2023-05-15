import React, { useContext, useState } from 'react';
import { MovieContext } from '../../context/MovieContext';
import WatchlistCard from '@/components/card/WatchlistCard';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const CreateWatchlist = () => {
	const { movieList, setMovieList } = useContext(MovieContext);
	const [hostName, setHostName] = useState('');
	const [movieNightDate, setMovieNightDate] = useState('');
	const router = useRouter();

	const createWatchlist = async (e) => {
		e.preventDefault();
		const reducedMovies = movieList.map((movie) => {
			const { title, imdb_id } = movie;
			return { title, imdb_id };
		});

		const options = {
			method: 'POST',
			url: 'https://movie-night-server.herokuapp.com/watchlist/create',
			data: {
				movies: reducedMovies,
				host: hostName,
				movieNightDate: movieNightDate,
			},
		};

		await Axios.request(options)
			.then((response) => {
				if (response.data.watchlist) {
					setMovieList([]);
					router.push({
						pathname: '/watchlist/[details]',
						query: {
							details: `${response.data.watchlist}`,
						},
					});
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	return (
		<div className='container mx-auto p-5'>
			<h1 className='text-3xl w-full border-b-2 border-red-500 mb-4'>
				Watch List
			</h1>
			{movieList.length > 0 ? (
				<div className='grid lg:grid-cols-6 gap-5 w-full'>
					<div className='lg:col-span-4'>
						<div className='grid gap-10 w-full'>
							{movieList.map((item) => {
								return (
									<WatchlistCard
										key={item.imdb_id}
										title={item.title}
										description={item.description}
										image_url={item.banner}
										rating={item.rating}
										content_rating={item.content_rating}
										plot={item.plot}
									/>
								);
							})}
						</div>
					</div>
					<div className='lg:col-span-2 flex-shrink-0 w-full shadow-2xl bg-neutral text-white h-80'>
						<form onSubmit={createWatchlist} className='card-body'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Name</span>
								</label>
								<input
									type='text'
									className='input input-bordered'
									value={hostName}
									onChange={(e) =>
										setHostName(e.target.value)
									}
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>
										Movie Night Date
									</span>
								</label>
								<input
									type='date'
									placeholder='mm/dd/yyyy'
									className='input input-bordered'
									value={movieNightDate}
									onChange={(e) =>
										setMovieNightDate(e.target.value)
									}
								/>
							</div>
							<div className='form-control mt-6'>
								<button className='btn btn-info' type='submit'>
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className='h-full flex justify-center items-center text-2xl'>
					<span>Watchlist is Empty 😔</span>
				</div>
			)}
		</div>
	);
};

export default CreateWatchlist;
