import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import Image from 'next/image';
import Loader from '@/components/loader/Loader';
import AddWatchlist from '@/components/addWatchlist/AddWatchlist';

const index = () => {
	const router = useRouter();
	const [movie, setMovie] = useState({});
	const [isloading, setLoading] = useState(true);

	const { details } = router.query;

	const getMovieDetails = async (movieId) => {
		const options = {
			method: 'GET',
			url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieId}`,
			headers: {
				'content-type': 'application/octet-stream',
				'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
				'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
			},
		};
		await Axios.request(options)
			.then((response) => {
				setMovie(response.data.results);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (!details) return;
		getMovieDetails(details);
	}, [details]);

	return (
		<>
			{isloading ? (
				<div className='h-screen'>
					<Loader />
				</div>
			) : (
				<div className='container mx-auto py-10 md:px-12 lg:px-32'>
					<div className='grid md:grid-cols-6 mb-20 gap-10'>
						<div className='col-span-2'>
							<Image
								className='w-full h-96'
								src={
									movie
										? movie.banner
										: '/default_thumbnail.svg'
								}
								alt='Movie Image'
								width={300}
								height={500}
								object-fit='cover'
							/>
						</div>
						<div className='flex flex-col gap-4 col-span-4'>
							<h1 className='text-4xl font-bold'>
								{movie.title}
							</h1>
							<div className='flex gap-4 text-white'>
								<div className='badge badge-info w-28 px-2'>
									Rating: {movie.rating}
								</div>
								<div className='badge badge-neutral w-28 px-2'>
									{movie.content_rating}
								</div>
							</div>
							<p>{movie.description}</p>
							<AddWatchlist movieId={details} />
						</div>
					</div>
					<div>
						<iframe
							className='w-full h-96'
							src={movie.trailer}
							title='W3Schools Free Online Web Tutorials'
							allowFullScreen='true'
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default index;
