import { redirect } from '@sveltejs/kit';
import { getCookies } from '$lib/utilities/getCookies';
import { RESERVIOR_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, parent }) {
	const cookies = getCookies(request);
	if (cookies['wyd-user'] && cookies['wyd-session']) {
		const { user } = await parent();

		const accounts = [];

		accounts.push(`users=${user.get('mainAddress')}`);

		const data = await fetch(
			`https://api.reservoir.tools/users/activity/v2?${accounts.join(
				''
			)}&limit=15&types=sale&types=ask&types=mint`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': RESERVIOR_KEY
				}
			}
		);

		const feed = await data.json();

		return feed;
	}

	throw redirect(307, '/trending');
}
