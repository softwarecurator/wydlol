import { getCookies } from '$lib/utilities/getCookies';
import Moralis from 'moralis/node';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
    const cookies = getCookies(request);
    if (cookies['wyd-user'] && cookies['wyd-session']) {
        const lower = cookies['wyd-user'].toLowerCase();
        const user = await new Moralis.Query(Moralis.Object.extend('Profile'))
            .containedIn('accounts', [lower])
            .first();
        return {user};
    }

}