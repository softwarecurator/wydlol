<script lang="ts">
	import * as blockies from 'blockies-ts';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Image from '$lib/components/loaders/image-loader.svelte';
	import { selectedAccount } from '$lib/stores/web3';
	import { addToast } from '$lib/stores/toaster';

	export let data;
</script>

<section>
	<div class="flex flex-col items-start justify-start gap-2 m-8">
		<div class="flex items-center justify-center h-full">
			<img
				class="rounded-full w-24 h-24 md:w-36 md:h-36 m-2 md:m-0"
				src={blockies.create({ seed: data.user.mainAddress.toLowerCase() }).toDataURL()}
				alt=""
			/>
		</div>
		<div class="flex flex-col">
			<div class="gap-6 flex items-center dark:text-white">
				<div class="flex flex-row items-start gap-6">
					<p class="text-lg md:text-4xl">{formatUsername(data.user.username)}</p>

					<button
						on:click={() => addToast({ type: 'info', message: 'Coming soon...' })}
						class:hidden={$selectedAccount.toLowerCase() == data.user.mainAddress.toLowerCase()}
						class="border-2 border-solid border-slate-500 py-2 px-4 rounded-md"
						>{data.isFollowing ? 'Following' : 'Follow'}</button
					>
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
								<a
									href={`/${nft.token.collection.id}/${nft.token.tokenId}`}
									class="hover:cursor-pointer h-full w-full object-contain"
								>
									<div
										class="flex grow min-w-full max-w-lg mb-2 divide-y divide-black bg-slate-50 dark:bg-slate-800"
									>
										<div class="flex flex-col w-full items-start m-2">
											<p class="dark:text-white">{nft.token.name}</p>
											<Image src={nft.token.image} />
										</div>
									</div>
								</a>
							{/if}
						{/each}
					{:else}
						<div>no nfts losers</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
