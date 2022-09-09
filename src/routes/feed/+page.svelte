<script lang="ts">
	import Timeline from '$lib/components/feed/timeline.svelte';
	export let data;
</script>

<Timeline activities={data.feed.activities} />
