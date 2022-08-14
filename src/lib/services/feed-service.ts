import { variables } from '$lib/utilities/variables';

export const getTrendingFeed = async (contractAddr, continuation = ''): Promise<any> => {
	const url = continuation
		? `https://api.reservoir.tools/collections/${contractAddr}/activity/v1?limit=20&types=sale&types=ask&continuation=${continuation}`
		: `https://api.reservoir.tools/collections/${contractAddr}/activity/v1?limit=20&types=sale&types=ask`;
	const data = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': variables.reservoirKey
		}
	});
	const trending = await data.json();
	return trending;
};

export const myFeed = async (user, continuation = ''): Promise<any> => {
	try {
		if (user) {
			const accounts = [];

			accounts.push(`users=${user.accounts[0]}`);

			for (const addresses of user.following) {
				accounts.push(`&users=${addresses.wallet}`);
			}
			const url = continuation
				? `https://api.reservoir.tools/users/activity/v2?${accounts.join(
						''
				  )}&limit=20&continuation=${continuation}`
				: `https://api.reservoir.tools/users/activity/v2?${accounts.join('')}&limit=20`;

			const data = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': variables.reservoirKey
				}
			});
			const feed = await data.json();

			return feed;
		}
	} catch (err) {
		console.log(err);
	}
};
