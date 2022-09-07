import { env } from '$env/dynamic/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {


		const data = await fetch(`https://api.reservoir.tools/tokens/v5?tokens=${params.contractAddress}%3A${params.tokenId}&sortBy=tokenId&limit=1&includeTopBid=true&includeAttributes=true`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': env.RESERVIOR_KEY
			}
		});

        const transactions = await fetch(`https://api.reservoir.tools/tokens/${params.contractAddress}%3A${params.tokenId}/activity/v2?limit=5&sortBy=eventTimestamp`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': env.RESERVIOR_KEY
			}
		});


        const transactionsData = await transactions.json();
        const nftData = await data.json();
        const token = nftData.tokens[0].token;
        const marketData = nftData.tokens[0].market;
		return {
            token,
            marketData,
            transactionsData,
            image: token.image,
            title: `${token.name}`
        };

}
