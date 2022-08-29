import { RESERVIOR_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const data = await fetch(
		`https://api.reservoir.tools/collections/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/activity/v1?limit=20&types=sale&types=ask&types=mint`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': RESERVIOR_KEY
			}
		}
	);
	const trending = await data.json();
	return trending;
}
