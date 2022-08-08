<script lang="ts">
	import ActivityCard from '$lib/components/cards/activity-card.svelte';
	import { getTrendingFeed } from '$lib/services/feed-service';

	export let activities;
	export let contractAddr;
	export let continuation = '';

	$: lastElement = false;

	async function getMore() {
		let res = await getTrendingFeed(contractAddr, continuation);
		console.log(res);
		continuation = res.continuation;
		let more = res.hits.map((hit) => hit.document);
		if (more) {
			activities.push(...more);
			activities = activities; // <= Specifically just to trigger our nfts' each-html-block rerender. Maybe there's a better way to do this? Got this solution from svelte docs (https://svelte.dev/tutorial/updating-arrays-and-objects) so idk bruh.
		}
		if (res.hits.length < 20) {
			lastElement = true;
		}
	}
</script>

<div class="flex flex-col items-center">
	{#each activities as activity}
		{#if activity.token?.tokenImage || activity.token?.tokenName}
			<ActivityCard {activity} {getMore} bind:continuation bind:lastElement />
		{/if}
	{/each}
</div>
