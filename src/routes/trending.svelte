<script lang="ts">
	import { getTrendingFeed } from '$lib/services/feed-service';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Time from 'svelte-time';
	import * as blockies from 'blockies-ts';

	$: trendingData = getTrendingFeed();
</script>

{#await trendingData}
	<h1>loading</h1>
{:then trending}
	<h2 class="text-center text-3xl mb-4">TRENDING LOL</h2>
	<div class="flex flex-col items-center">
		{#each trending.activities as activity}
			{#if activity.token?.tokenImage || activity.token?.tokenName}
				<div class="flex grow max-w-lg mb-5">
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
									<a class="flex items-center" href={`/${activity.fromAddress}`}>
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
								<div class=" flex flex-col items-start gap-4">
									<div>
										Sold
										{activity.token.tokenName ? activity.token.tokenName : activity.token.tokenId} for
										{activity.price} ETH
									</div>
								</div>
							</div>
						</div>
						<img src={activity.token.tokenImage} alt="token" />
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/await}
