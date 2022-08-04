import { Moralis } from '$lib/database';

/** @type {import('./[username]').RequestHandler} */
export async function GET({ params }) {
	try {
		const { username } = params;

		const exists = await new Moralis.Query(Moralis.Object.extend('Profile'))
			.equalTo('lower_username', username.toLowerCase())
			.first();

		if (exists) {
			return {
				body: {
					status: true
				}
			};
		}

		return {
			body: {
				status: false
			}
		};
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			body: { msg: err.msg }
		};
	}
}
