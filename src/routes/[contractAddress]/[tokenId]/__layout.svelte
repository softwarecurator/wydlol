<script context="module" lang="ts">
	import { getNFTActivity, getCollection, getNFTMetadata } from '$lib/services/token-service';
	import { validateInputAddresses } from '$lib/utilities/is-address';
	export async function load({ params }) {
		if (validateInputAddresses(params.contractAddress)) {
			return {
				props: {
					nftActivities: await getNFTActivity(params.contractAddress, params.tokenId),
					collection: await getCollection(params.contractAddress),
					nftMetadata: await getNFTMetadata(params.contractAddress, params.tokenId)
				}
			};
		}
		return {
			status: 404,
			error: new Error(`Could not find contract address`)
		};
	}
</script>

<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';

	export let nftData;
	export let collection;
	export let nftMetadata;

	let previousPage: string;
	afterNavigate((navigaton) => {
		previousPage = navigaton.from.pathname;
	});
</script>

<div class="flex flex-col w-full items-start m-2">
	<div class="flex items-center justify-center">
		<h2 class="text-center text-xl md:text-3xl mb-4 flex items-center justify-center">
			<div class="mx-2 flex items-center justify-center h-full">
				<img
					class="rounded-full w-14 h-14 md:w-10 md:h-10 m-2 md:m-0"
					src={collection.collection.metadata.imageUrl}
					alt=""
				/>
			</div>
			{collection.collection.name} LOL
		</h2>
		<button class="underline text-center  text-gray-500" on:click={() => goto(previousPage)}
			>go back</button
		>
	</div>

	<h3>{nftMetadata.metadata.name}</h3>
	<img src={nftMetadata.media[0].gateway} alt="token" class="w-1/4 h-1/4 whover:cursor-pointer" />
</div>
