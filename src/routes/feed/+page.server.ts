import { redirect } from '@sveltejs/kit';
import { getCookies } from '$lib/utilities/getCookies';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, parent }) {
	const cookies = getCookies(request);
	if (cookies['wyd-user'] && cookies['wyd-session']) {
		const { user } = await parent();

		const accounts = [];

		accounts.push(`users=${user.get('accounts')[0]}`);

		for (const addresses of user.get('following')) {
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
	}

	throw redirect(307, '/trending');
}
