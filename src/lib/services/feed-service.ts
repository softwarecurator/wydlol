import { variables } from '$lib/utilities/variables';

export const getTrendingFeed = async (contractAddr, continuation = ''): Promise<any> => {
	const url = continuation ? `https://api.reservoir.tools/collections/${contractAddr}/activity/v1?limit=20&types=sale&types=ask&continuation=${continuation}` : `https://api.reservoir.tools/collections/${contractAddr}/activity/v1?limit=20&types=sale&types=ask`
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
	const trending = await data.json();
	return trending;
};

export const myFeed = async (continuation = ''): Promise<any> => {
	try {
		console.log('here')
		const data = await fetch(`/api/users/feed`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(continuation)
		});
		const { feed } = await data.json();
		console.log(feed)
		return feed;
	} catch(err) {
		console.log(err)
	}

};
