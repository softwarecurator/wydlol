<script lang="ts">
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Time from 'svelte-time';
	import * as blockies from 'blockies-ts';
	import Image from '$lib/components/loaders/image-loader.svelte';

	export let activity;
	export let continuation;
	export let getMore;
	export let lastElement = false;

	function actionWhenInViewport(e) {
		if (lastElement) {
			const observer = new IntersectionObserver(async (entries) => {
				if (entries[0].isIntersecting) {
					getMore(continuation); // execute code if thing is in view
				}
			});

			observer.observe(e);
		}
	}
</script>

<div use:actionWhenInViewport class="flex grow max-w-lg mb-2 divide-y divide-black bg-slate-50">
	<div class="flex flex-col w-full items-start m-2">
		<div class="flex flex-row items-start justify-start gap-2 my-2">
			<div class="flex items-center justify-center h-full">
				<img
					class="rounded-full w-10 h-10 m-2 md:m-0"
					src={blockies.create({ seed: activity.fromAddress.toLowerCase() }).toDataURL()}
					alt=""
				/>
			</div>

			<div class="flex flex-col">
				<div class="text-sm gap-1 flex">
					<a class="flex items-center text-slate-600" href={`/${activity.fromAddress}`}>
						<p>{formatUsername(activity.fromAddress)}</p>
					</a>
					<div>
						{activity.type.toUpperCase()} · <Time
							timestamp={new Date(activity.timestamp * 1000)}
							live
							relative
						/>
					</div>
				</div>
				<a
					href={`/${activity.collection.collectionId}/${activity.token.tokenId}`}
					class=" flex flex-col items-start gap-4 hover:underline hover:cursor-pointer"
				>
					{#if activity.type === 'sale'}
						<div>
							Sold
							{activity.token.tokenName
								? activity.token.tokenName
								: formatUsername(activity.token.tokenId)} for
							{activity.price} ETH
						</div>
					{:else if activity.type === 'ask'}
						<div>
							Listed
							{activity.token.tokenName
								? activity.token.tokenName
								: formatUsername(activity.token.tokenId)} for
							{activity.price} ETH
						</div>
					{:else}
						<div>
							Transfered
							{activity.token.tokenName
								? activity.token.tokenName
								: formatUsername(activity.token.tokenId)} to
							{formatUsername(activity.toAddress)}
						</div>
					{/if}
				</a>
			</div>
		</div>
		<a
			href={`/${activity.collection.collectionId}/${activity.token.tokenId}`}
			class="hover:cursor-pointer"
		>
			<Image src={activity.token.tokenImage} />
		</a>
	</div>
</div>
