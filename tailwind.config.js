/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#dc2626',

					secondary: '#fbbf24',

					accent: '#3fd11b',

					neutral: '#374151',

					'base-100': '#141414',

					info: '#2563EB',

					success: '#16a34a',

					warning: '#f97316',

					error: '#b91c1c',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
