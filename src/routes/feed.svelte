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
	export let feed;
</script>

<div>feed here</div>
