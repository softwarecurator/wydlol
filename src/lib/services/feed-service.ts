export const getTrendingFeed = async (contractAddr): Promise<any> => {
	const data = await fetch(
		`https://api.reservoir.tools/collections/${contractAddr}/activity/v1?limit=20&types=sale&types=ask`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': 'demo-api-key'
			}
		}
	);
	const trending = await data.json();
	return trending;
};
