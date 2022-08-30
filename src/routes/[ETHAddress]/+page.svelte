<script lang="ts">
	import * as blockies from 'blockies-ts';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Image from '$lib/components/loaders/image-loader.svelte';

	export let data;
</script>

<svelte:head>
	<title>{formatUsername(data.user.username)} | wyd lol?</title>
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta property="og:title" content="wydlolxyz" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://wydlolxyz.io" />
</svelte:head>

<section>
	<div class="flex flex-row items-start justify-start gap-2 m-8">
		<div class="flex items-center justify-center h-full">
			<img
				class="rounded-full w-36 h-36 m-2 md:m-0"
				src={blockies.create({ seed: data.user.mainAddress.toLowerCase() }).toDataURL()}
				alt=""
			/>
		</div>

		<div class="flex flex-col">
			<div class="text-4xl gap-1 flex">
				<p>{formatUsername(data.user.username)}</p>
			</div>
		</div>
	</div>
	<div class="flex grow flex-wrap">
		<div class="px-1 py-4">
			<div
				class="grid justify-center gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
			>
				{#if data.nfts.tokens.length}
					{#each data.nfts.tokens as nft}
						{#if nft.token.image}
							<div
								class="flex grow min-w-full max-w-lg mb-2 divide-y divide-black bg-slate-50 dark:bg-slate-800"
							>
								<div class="flex flex-col w-full items-start m-2">
									<p class="dark:text-white">{nft.token.name}</p>
									<Image src={nft.token.image} />
								</div>
							</div>
						{/if}
					{/each}
				{:else}
					<div>no nfts losers</div>
				{/if}
			</div>
		</div>
	</div>
</section>
