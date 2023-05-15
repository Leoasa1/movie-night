import React from 'react';
import Head from 'next/head';
import Navbar from '../navbar/Navbar';
import { ToastContainer } from 'react-toastify';

const Layout = ({ title, description, children }) => {
	return (
		<div className='bg-base-100 text-white'>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
			</Head>
			<Navbar />
			<ToastContainer theme='colored' position='top-center' />
			{children}
		</div>
	);
};

export default Layout;

Layout.defaultProps = {
	title: 'Movie Night',
	description: 'Get to plan your movie nights.',
};
