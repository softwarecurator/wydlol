import { getCookies } from '$lib/utilities/getCookies';
import Moralis from 'moralis/node';
import { env } from '$env/dynamic/public';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
	const cookies = getCookies(request);
	if (cookies['wyd-user'] && cookies['wyd-session']) {
		const lower = cookies['wyd-user'].toLowerCase();
		Moralis.start({
			serverUrl: env.PUBLIC_MORALIS_SERVER_URL,
			appId: env.PUBLIC_MORALIS_APP_ID
		});

		const user = await new Moralis.Query(Moralis.Object.extend('Profile'))
			.equalTo('mainAddress', lower)
			.first();

		return {
			user,
			image: 'https://i.kym-cdn.com/entries/icons/mobile/000/021/885/keyboardkey.jpg',
			title: 'wydlol'
		};
	}
}
