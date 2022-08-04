<script context="module" lang="ts">
	import { getNFTs } from '$lib/services/user-service';

	export async function load({ params }) {
		return {
			props: {
				profileData: getNFTs([params.address])
			}
		};
	}
</script>

<script>
	export let profileData;
</script>

<section>
	{#await profileData}
		<div>laoding</div>
	{:then { nfts }}
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
