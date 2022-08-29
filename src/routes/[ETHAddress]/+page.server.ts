import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import Moralis from 'moralis/node';
import { validateInputAddresses } from '$lib/utilities/isETHAddress';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
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
						'x-api-key': env.RESERVIOR_KEY
					}
				}
			);

			const nfts = await data.json();

			return {
				user,
				nfts
			};
		}

		const data = await fetch(`https://api.reservoir.tools/users/${params.ETHAddress}/tokens/v3`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': env.RESERVIOR_KEY
			}
		});

		const nfts = await data.json();

		return {
			user: { mainAddress: params.ETHAddress, username: params.ETHAddress },
			nfts
		};
	}

	throw error(404, 'Not found');
}
