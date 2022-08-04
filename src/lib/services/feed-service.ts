export const getTrendingFeed = async (): Promise<any> => {
	const data = await fetch(
		`https://api.reservoir.tools/collections/0xC8Ccad799D1d7b142C49b7873D8bCf96511b6eB0/activity/v1?limit=20&types=sale`,
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
