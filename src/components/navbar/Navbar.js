import React, { useContext } from 'react';
import { MovieContext } from '../../context/MovieContext';
import { IoSearch, IoMenu } from 'react-icons/io5';

import Link from 'next/link';

const Navbar = () => {
	const { movieList } = useContext(MovieContext);
	return (
		<div className='navbar sticky top-0 z-50 bg-base-100 px-5 py-3 border-b border-neutral'>
			<div className='navbar-start'>
				<a
					href='/'
					className='normal-case md:text-2xl text-primary font-bold'
				>
					Movie Night
				</a>
			</div>
			<div className='navbar-end gap-5'>
				<Link href={'/search'} className='hidden sm:btn'>
					<IoSearch size={30} />
				</Link>
				<Link
					href={'/watchlist/create'}
					className='hidden sm:btn sm:btn-secondary'
				>
					Watchlist: {movieList.length}
				</Link>
				<div className='dropdown dropdown-end sm:hidden'>
					<label tabIndex={0} className='btn'>
						<IoMenu size={25} />
					</label>
					<ul
						tabIndex={0}
						className='dropdown-content menu p-2 mt-4 shadow bg-neutral rounded-box w-52 gap-2'
					>
						<Link
							href={'/search'}
							className='btn btn-outline w-full'
						>
							Search
						</Link>
						<Link
							href={'/watchlist/create'}
							className='btn btn-secondary w-full'
						>
							Watchlist: {movieList.length}
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
