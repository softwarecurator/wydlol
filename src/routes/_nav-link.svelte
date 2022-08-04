<script lang="ts">
	import { page } from '$app/stores';
	import { pathMatches } from '$lib/utilities/path-matches';

	export let href: string;
	$: active = pathMatches(href, String($page.url.pathname));
</script>

<a {href} class="text-grey2" class:active sveltekit:prefetch>
	<slot />
</a>

<style lang="postcss">
	.active {
		@apply text-white opacity-100;
	}
</style>
