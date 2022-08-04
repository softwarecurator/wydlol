import { variables } from '$lib/utilities/variables';

/** @type {import('./nfts').RequestHandler} */
export async function POST({ request }) {
	try {
		const { accounts } = await request.json();

		let stillNFTs = true;
		let pageKey = '';

		const nfts = [];
		for (const address of accounts) {
			while (stillNFTs) {
				const res = await fetch(
					`https://eth-mainnet.alchemyapi.io/v2/${variables.alchemyKey}/getNFTs?owner=${address}${pageKey}`
				);
				const addressNFTs = await res.json();

				nfts.push(...addressNFTs.ownedNfts);
				pageKey = addressNFTs.pageKey ? `&pageKey=${addressNFTs.pageKey}` : '';
				if (pageKey.length <= 0) {
					stillNFTs = false;
				}
			}
		}

		return {
			body: { nfts }
		};
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			body: { msg: err.msg }
		};
	}
}
