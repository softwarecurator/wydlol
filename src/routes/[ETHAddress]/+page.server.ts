import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { RESERVIOR_KEY } from '$env/static/private';
import Moralis from 'moralis/node';
import { validateInputAddresses } from '$lib/utilities/isETHAddress';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, parent, request }) {
	const { image } = await parent();
	Moralis.start({
		serverUrl: env.PUBLIC_MORALIS_SERVER_URL,
		appId: env.PUBLIC_MORALIS_APP_ID
	});
	const profile = await new Moralis.Query(Moralis.Object.extend('Profile'))
		.equalTo('lower_username', params.ETHAddress.toLowerCase())
		.first();

	let valid = false;
	valid = validateInputAddresses(params.ETHAddress);

	if (params.ETHAddress.toLowerCase().includes('.eth')) valid = true;

	if (valid || profile) {
		const { user } = await parent();

		if (profile) {
			const data = await fetch(
				`https://api.reservoir.tools/users/${profile.get('mainAddress')}/tokens/v3`,
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
				user: profile,
				nfts,
				title: params.ETHAddress,
				image
			};
		}

		let isFollowing = false;
		if (user) {
			const following = await new Moralis.Query(Moralis.Object.extend('Follow'))
			.equalTo('profile', {
				__type: 'Pointer',
				className: 'Profile',
				objectId: user.id
			}).equalTo('watching', params.ETHAddress)
			.find();

			if (following.length) isFollowing = true;
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
			isFollowing,
			image,
			title: params.ETHAddress
		};
	}

	throw error(404, 'Not found');
}
