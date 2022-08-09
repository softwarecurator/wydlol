import { Moralis } from '$lib/database';
import { getCookies } from '$lib/utilities/getCookies';
import { variables } from '$lib/utilities/variables';

/** @type {import('./feed').RequestHandler} */
export async function POST({ request }) {
	try {
        console.log('api running')
        const cookies = getCookies(request);
        const { continuation } = await request.json();

        let addressOrUsername;
        if (cookies['wyd-user']) {
            addressOrUsername = cookies['wyd-user'];
        }

		let user;


			const lower = addressOrUsername.toLowerCase();
			user = await new Moralis.Query(Moralis.Object.extend('Profile'))
				.containedIn('accounts', [lower])
				.first();
		

		if (user) {
            const accounts = [];
       
            accounts.push(`users=${addressOrUsername}`);

            for (const addresses of user.get('following')) {
                accounts.push(`&users=${addresses.wallet}`)
            }
            const url = continuation ? `https://api.reservoir.tools/users/activity/v2?${accounts.join('')}&limit=20&continuation=${continuation}` : `https://api.reservoir.tools/users/activity/v2?${accounts.join('')}&limit=20`
            const data = await fetch(
                url,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': variables.reservoirKey
                    }
                }
            );
            const feed = await data.json();
            return {
				body: { feed }
			};
		}

		// Couldn't find User in Moralis. Return {failed:true}
		return { body: { failed: true } };
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			body: { msg: err.msg }
		};
	}
}
