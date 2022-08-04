export const getMyProfile = async (): Promise<any> => {
	const data = await fetch(`/api/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify('ME')
	});
	const { user } = await data.json();
	return user;
};

export const getNFTs = async (addresses): Promise<any> => {
	try {
		const data = await fetch(`/api/users/nfts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ accounts: addresses })
		});
		const nfts = await data.json();

		return nfts;
	} catch (err) {
		console.log(err);
	}
};
