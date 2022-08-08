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
