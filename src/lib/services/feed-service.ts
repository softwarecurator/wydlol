export const getTrendingFeed = async (): Promise<any> => {
	const data = await fetch(
		`https://api.reservoir.tools/collections/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/activity/v1?limit=20&types=sale`,
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
