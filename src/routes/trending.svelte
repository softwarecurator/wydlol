<script lang="ts">
	import { getTrendingFeed } from '$lib/services/feed-service';
	import Timeline from '$lib/components/feed/timeline.svelte';

	const contractAddresses = [
		'0xC8Ccad799D1d7b142C49b7873D8bCf96511b6eB0',
		'0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
		'0x23581767a106ae21c074b2276D25e5C3e136a68b',
		'0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e'
	];

	$: trendingData = getTrendingFeed(
		contractAddresses[Math.floor(Math.random() * contractAddresses.length)]
	);
</script>

{#await trendingData}
	<h1>loading</h1>
{:then trending}
	<h2 class="text-center text-xl md:text-3xl mb-4 flex items-center justify-center">
		<div class="mx-2 flex items-center justify-center h-full">
			<img
				class="rounded-full w-14 h-14 md:w-10 md:h-10 m-2 md:m-0"
				src={trending.activities[0].collection.collectionImage}
				alt=""
			/>
		</div>
		{trending.activities[0].collection.collectionName} LOL
	</h2>
	<Timeline
		continuation={trending.continuation}
		activities={trending.activities}
		contractAddr={trending.activities[0].collection.collectionId}
	/>
{/await}
