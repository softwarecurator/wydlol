import { redirect } from '@sveltejs/kit';
import { getCookies } from '$lib/utilities/getCookies';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
	const cookies = getCookies(request);

	if (cookies['wyd-user'] && cookies['wyd-session']) throw redirect(302, '/feed');

	throw redirect(307, '/trending');
}
