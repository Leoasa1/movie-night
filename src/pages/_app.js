import '@/styles/globals.css'
import Layout from '@/components/layout/Layout';
import { MovieProvider } from '../context/MovieContext';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function App({ Component, pageProps }) {
	const [cookies, setCookie] = useCookies(['uuid']);
	useEffect(() => {
		// Check if the uuid cookie exists
		if (!cookies.uuid) {
			// Generate a new uuid
			const newUuid = uuidv4();

			// Set the uuid cookie to expire in 1 year
			setCookie('uuid', newUuid, {
				path: '/',
				expires: new Date(Date.now() + 31536000000),
			});
		}
	}, []);

	return (
		<MovieProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</MovieProvider>
	);
}
