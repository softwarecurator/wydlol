import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		let user = await request.json();

		if (!user) {
			return error(400, 'User not logged in.');
		}

		const accounts = [];

		accounts.push(`users=${user.accounts[0]}`);

		for (const addresses of user.following) {
			accounts.push(`&users=${addresses.wallet}`);
		}

		const data = await fetch(
			`https://api.reservoir.tools/users/activity/v2?${accounts.join('')}&limit=20`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': env.RESERVIOR_KEY
				}
			}
		);

		const feed = await data.json();

		return feed;
	} catch (err) {
		console.log(err.message);
		return error(400, err.message);
	}
}
