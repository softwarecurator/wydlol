import { Moralis } from '$lib/database';
import { getCookies } from '$lib/utilities/getCookies';

/** @type {import('./get').RequestHandler} */
export async function POST({ request }) {
	try {
		let addressOrUsername = await request.json();

		if (addressOrUsername === 'ME') {
			const cookies = getCookies(request);
			if (cookies['wyd-user']) {
				addressOrUsername = cookies['wyd-user'];
			}
		}
		let user;

		if (addressOrUsername.includes('@')) {
			user = await new Moralis.Query(Moralis.Object.extend('Profile'))
				.equalTo('username', addressOrUsername.split('@')[1])
				.first();
		} else {
			const lower = addressOrUsername.toLowerCase();
			user = await new Moralis.Query(Moralis.Object.extend('Profile'))
				.containedIn('accounts', [lower])
				.first();
		}

		if (user) {
			return {
				body: { user }
			};
		}

		// Couldn't find User in Moralis. Return {failed:true}
		return { body: { failed: true } };
	} catch (err) {
		return {
			status: 500,
			body: { msg: err.message }
		};
	}
}
