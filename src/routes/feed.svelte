<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { myFeed } from '$lib/services/feed-service';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch(`/api/users`, {
			method: 'POST',
			body: JSON.stringify('ME')
		});
		const { user } = await res.json();
		if (user) {
			if (user) {
				return {
					props: {
						feed: await myFeed()
					},
					status: 302,
					redirect: '/feed'
				};
			}
		}
		return {
			status: 302,
			redirect: '/trending'
		};
	};
</script>

<script lang="ts">
	import Timeline from '$lib/components/feed/timeline.svelte';
	export let feed;
</script>

<div class="flex flex-col items-center justify-center">
	<div class="">
		<input type="text" placeholder="wyd lol?" class="h-12 w-full" />
	</div>
	<Timeline
		continuation={feed.continuation}
		activities={feed.activities}
		contractAddr={feed.activities[0].collection.collectionId}
	/>
</div>
