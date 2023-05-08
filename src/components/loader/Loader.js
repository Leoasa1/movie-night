import React from 'react';

const Loader = () => {
	return (
		<div className='h-full flex justify-center items-center'>
			<div className='flex space-x-3 ml-3'>
				<div
					className='w-6 h-6 bg-red-500 rounded-full animate-pulse'
					style={{ animationDelay: '0s', animationDuration: '0.5s' }}
				/>
				<div
					className='w-6 h-6 bg-yellow-500 rounded-full animate-pulse'
					style={{
						animationDelay: '0.1s',
						animationDuration: '0.5s',
					}}
				/>
				<div
					className='w-6 h-6 bg-green-500 rounded-full animate-pulse'
					style={{
						animationDelay: '0.2s',
						animationDuration: '0.5s',
					}}
				/>
				<div
					className='w-6 h-6 bg-blue-500 rounded-full animate-pulse'
					style={{
						animationDelay: '0.3s',
						animationDuration: '0.5s',
					}}
				/>
				<div
					className='w-6 h-6 bg-indigo-500 rounded-full animate-pulse'
					style={{
						animationDelay: '0.4s',
						animationDuration: '0.5s',
					}}
				/>
				<div
					className='w-6 h-6 bg-purple-500 rounded-full animate-pulse'
					style={{
						animationDelay: '0.5s',
						animationDuration: '0.5s',
					}}
				/>
			</div>
		</div>
	);
};

export default Loader;
