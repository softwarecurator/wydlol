import { json, error } from '@sveltejs/kit';
import { RESERVIOR_KEY } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	try {
		const contract = url.searchParams.get('contract');

		const data = await fetch(
			`https://api.reservoir.tools/collections/${contract}/activity/v1?limit=20&types=sale`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': RESERVIOR_KEY
				}
			}
		);
		const activities = await data.json();

		return json(activities);
	} catch (err) {
		console.log(err.message);
		return error(400, err.message);
	}
}
