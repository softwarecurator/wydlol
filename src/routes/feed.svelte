<script context="module" lang="ts">
	import { myFeed } from '$lib/services/feed-service';

	export async function load() {
		return {
			props: {
				feed: await myFeed()
			}
		};
	}
</script>

<script lang="ts">
	import Timeline from '$lib/components/feed/timeline.svelte';
	export let feed;
</script>

<Timeline
	continuation={feed.continuation}
	activities={feed.activities}
	contractAddr={feed.activities[0].collection.collectionId}
/>
