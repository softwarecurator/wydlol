<script context="module" lang="ts">
	import { getNFTs } from '$lib/services/user-service';
	import { validateInputAddresses } from '$lib/utilities/is-address';

	export async function load({ params, fetch }) {
		const res = await fetch(`/api/users`, {
			method: 'POST',
			body: JSON.stringify(params.address)
		});
		const { user } = await res.json();
		if (validateInputAddresses(params.address) || user) {
			if (user) {
				return {
					props: { user, nftData: getNFTs([params.address]) }
				};
			}

			return {
				props: { user: params.address, nftData: getNFTs([params.address]) }
			};
		}
		return {
			status: 404,
			error: new Error(`Could not find address or username`)
		};
	}
</script>

<script>
	import * as blockies from 'blockies-ts';
	import { formatUsername } from '$lib/utilities/format-long-names';
	export let nftData;
	export let user;

	$: address = user?.mainAddress ? user.mainAddress : user;
</script>

<section>
	{#await nftData}
		<div>loading</div>
	{:then { nfts }}
		<div class="flex flex-row items-start justify-start gap-2 m-8">
			<div class="flex items-center justify-center h-full">
				<img
					class="rounded-full w-36 h-36 m-2 md:m-0"
					src={blockies.create({ seed: address.toLowerCase() }).toDataURL()}
					alt=""
				/>
			</div>

			<div class="flex flex-col">
				<div class="text-4xl gap-1 flex">
					<a class="flex items-center" href={`/${address}`}>
						<p>{formatUsername(address)}</p>
					</a>
				</div>
			</div>
		</div>
		<div class="flex grow flex-wrap">
			{#each nfts as nft}
				<div class="flex grow max-w-lg mb-5">
					<div class="flex flex-col w-full items-start m-2">
						<p>{nft.title}</p>
						<img src={nft.media[0].gateway} alt="" />
					</div>
				</div>
			{/each}
		</div>
	{/await}
</section>
