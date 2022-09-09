<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';

	let searchInput = '';

	export let resultsClosed: boolean = true;
	export let isSearchMobile: boolean;
	export let open;
</script>

<div class="w-1/2 max-w-lg">
	<section class="flex h-12">
		<div
			class:isSearchMobile
			class="flex border-2 border-solid border-zinc-100 dark:border-transparent rounded-full bg-zinc-200 dark:bg-slate-800 items-center w-full p-5"
		>
			<Fa icon={faSearch} scale={1} class="pr-4 text-slate-400" />
			<input
				on:click={() => (resultsClosed = false)}
				bind:value={searchInput}
				placeholder="Search"
				type="text"
				class="bg-inherit focus:outline-none w-full text-sm dark:text-white"
			/>
		</div>
	</section>
</div>

<style lang="postcss">
	.isSearchMobile {
		@apply bg-slate-700 text-white rounded-none;
	}
</style>
