import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddWatchlist from '../addWatchlist/AddWatchlist';

const Card = ({ movieId, primaryImage }) => {
	return (
		<div className='relative card w-auto h-96 shadow-xl'>
			<Image
				className='w-64 h-96'
				src={primaryImage.url}
				alt='Movie Image'
				width={300}
				height={500}
				object-fit='cover'
			/>
			<div className='absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-500'>
				<div className='grid gap-4 content-center justify-items-center items-center h-full bg-neutral bg-opacity-50'>
					<Link
						href={{
							pathname: '/movie/[details]',
							query: {
								details: `${movieId}`,
							},
						}}
						className='btn btn-primary w-44'
						onClick={() =>
							sessionStorage.setItem('selected-movie', movieId)
						}
					>
						Details
					</Link>
					<AddWatchlist movieId={movieId} />
				</div>
			</div>
		</div>
	);
};

export default Card;
