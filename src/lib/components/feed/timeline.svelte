<script lang="ts">
	import Card from '$lib/components/cards/card.svelte';

	export let activities;
</script>

<div class="flex flex-col items-center">
	{#each activities as activity}
		{#if activity.token?.tokenImage || activity.token?.tokenName || activity.token?.tokenId}
			<Card {activity} />
		{/if}
	{/each}
</div>
