import { variables } from '$lib/utilities/variables';

export const getNFTActivity = async (contractAddr, tokenId, continuation = ''): Promise<any> => {
	const url = continuation ? `https://api.reservoir.tools/tokens/${contractAddr}%3A${tokenId}/activity/v1&continuation=${continuation}` : `https://api.reservoir.tools/tokens/${contractAddr}%3A${tokenId}/activity/v1`
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

export const getCollection = async (contractAddr): Promise<any> => {
	const url =  `https://api.reservoir.tools/collection/v3?id=${contractAddr}&includeTopBid=false`;
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
	const collection = await data.json();
	return collection;
};

export const getNFTMetadata = async (contractAddr, tokenId): Promise<any> => {
	const url =  `https://eth-mainnet.g.alchemy.com/nft/v2/${variables.alchemyKey}/getNFTMetadata?contractAddress=${contractAddr}&tokenId=${tokenId}`;
	const data = await fetch(
		url,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
	
			}
		}
	);
	const nftMetadata = await data.json();
	return nftMetadata;
};