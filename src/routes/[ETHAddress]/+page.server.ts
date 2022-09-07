import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { RESERVIOR_KEY } from '$env/static/private';
import Moralis from 'moralis/node';
import { validateInputAddresses } from '$lib/utilities/isETHAddress';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent }) {
	const { image } = await parent();
	Moralis.start({
		serverUrl: env.PUBLIC_MORALIS_SERVER_URL,
		appId: env.PUBLIC_MORALIS_APP_ID
	});
	const user = await new Moralis.Query(Moralis.Object.extend('Profile'))
		.equalTo('lower_username', params.ETHAddress.toLowerCase())
		.first();
	if (validateInputAddresses(params.ETHAddress) || user) {
		if (user) {
			const data = await fetch(
				`https://api.reservoir.tools/users/${user.get('mainAddress')}/tokens/v3`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': RESERVIOR_KEY
					}
				}
			);

			const nfts = await data.json();

			return {
				user,
				nfts,
				title: params.ETHAddress,
				image
			};
		}

		const data = await fetch(`https://api.reservoir.tools/users/${params.ETHAddress}/tokens/v3`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': RESERVIOR_KEY
			}
		});

		const nfts = await data.json();

		return {
			user: { mainAddress: params.ETHAddress, username: params.ETHAddress },
			nfts,
			image,
			title: params.ETHAddress,
		};
	}

	throw error(404, 'Not found');
}
