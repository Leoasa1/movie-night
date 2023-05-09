import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Axios from 'axios';
import Image from 'next/image';
import Loader from '@/components/loader/Loader';
import { API_URL } from '@/config/index.js';

const Modal = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}
	const handleOutsideClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className='fixed inset-0 flex items-center justify-center z-10'
			onClick={handleOutsideClick}
		>
			<div className='bg-black bg-opacity-80 absolute inset-0'></div>
			<div className='bg-secondary p-6 w-full max-w-md m-8 rounded-lg shadow-lg z-50'>
				{children}
			</div>
		</div>
	);
};

const Watchlist = () => {
	const inputRef = useRef();
	const router = useRouter();
	const [fullUrl, setFullUrl] = useState('');
	const [host, setHost] = useState('');
	const [movieList, setMovieList] = useState([]);
	const [allVotes, setAllVotes] = useState([]);
	const [canVote, setCanVote] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [username, setUsername] = useState('');

	const { details } = router.query;

	const handleCopy = async () => {
		try {
			// Use the Clipboard API's writeText method to copy the text
			await navigator.clipboard.writeText(inputRef.current.value);
			console.log('Text copied to clipboard');
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const getWatchlist = async () => {
		const options = {
			method: 'GET',
			url: `${API_URL}/watchlist/`,
			params: {
				watchlistId: details,
			},
			withCredentials: true,
		};
		await Axios.request(options)
			.then((response) => {
				setMovieList(response.data.movieList);
				setHost(response.data.host);
				setAllVotes(response.data.allVotes);
				if (response.data.canVote === true) {
					setCanVote(true);
					setShowPopup(true);
				}
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	const MovieCard = ({ movie }) => {
		const addVote = async () => {
			const options = {
				method: 'PUT',
				url: `${API_URL}/watchlist/vote`,
				data: {
					title: movie.title,
					imdb_id: movie.imdb_id,
					user: username,
					vote: 1,
					watchlistId: details,
				},
				withCredentials: true,
			};

			await Axios.request(options)
				.then((response) => {
					if (response.status === 200) router.reload();
				})
				.catch((error) => console.log(error));
		};

		return (
			<div className='bg-gray-800 shadow-xl grid grid-cols-5 w-full'>
				<figure className='col-span-2 lg:col-span-2'>
					<Image
						className='w-40 md:w-64 h-64 md:h-80'
						src={movie.banner}
						alt='Movie Image'
						width={300}
						height={500}
						object-fit='cover'
					/>
				</figure>
				<div className='card-body col-span-3'>
					<h2 className='card-title'>{movie.title}</h2>
					<div>Year: {movie.release}</div>
					<div className='flex gap-4 text-white'>
						<div className='badge badge-info w-28 px-2'>
							Rating: {movie.rating}
						</div>
						<div className='badge badge-neutral w-28 px-2'>
							{movie.content_rating}
						</div>
					</div>
					<p>{movie.plot}</p>
					<a className='link link-secondary' href={movie.trailer}>
						Movie Trailer
					</a>
					{canVote ? (
						<div className='card-actions justify-end'>
							<button
								className='btn btn-accent text-md'
								onClick={addVote}
							>
								Vote: 👍
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		);
	};

	useEffect(() => {
		if (!details) return;
		setFullUrl(window.location.href);
		getWatchlist(details);
	}, [details]);

	return (
		<>
			{movieList.length > 0 ? (
				<div className='p-10'>
					<Modal show={showPopup} onClose={() => setShowPopup(false)}>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (username) setShowPopup(false);
							}}
						>
							<label className='label'>
								<span className='text-black'>Name</span>
							</label>
							<input
								type='text'
								className='input input-bordered mb-5 w-full'
								placeholder='John Doe'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<button className='btn w-full' type='submit'>
								Continue
							</button>
						</form>
					</Modal>
					<h1 className='mb-5 text-xl'>
						<span className='text-primary'> Created By:</span>{' '}
						{host}
					</h1>
					<div className='mb-5 text-xl'>
						<label className='text-primary'>
							Share link with friends
						</label>
						<div className='form-control'>
							<div className='input-group'>
								<input
									ref={inputRef}
									type='text'
									value={fullUrl}
									className='input input-bordered w-full'
									readOnly
								/>
								<button
									className='btn btn-square'
									onClick={handleCopy}
								>
									Copy
								</button>
							</div>
						</div>
					</div>
					<h2 className='text-xl text-primary border-b mb-5 border-primary'>
						Movies
					</h2>
					<div className='grid lg:grid-cols-2 gap-10'>
						{movieList.map((movieItem) => {
							return (
								<MovieCard
									key={movieItem.imdb_id}
									movie={movieItem}
								/>
							);
						})}
					</div>
					<h2 className='text-xl text-primary border-b my-5 border-primary'>
						Votes
					</h2>
					<div className='w-full'>
						{allVotes.map((vote) => {
							return (
								<div
									key={vote.user}
									className='w-full grid grid-cols-2'
								>
									<div>{vote.movieTitle}</div>
									<div>{vote.user}</div>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<div className='h-screen'>
					<Loader />
				</div>
			)}
		</>
	);
};

export default Watchlist;
