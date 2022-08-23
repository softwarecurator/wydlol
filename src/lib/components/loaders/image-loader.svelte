<script>
	import { onMount } from 'svelte';
	export let src;
	export let alt = 'some image';

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		const img = new Image();
		img.src = src;
		loading = true;

		img.onload = () => {
			loading = false;
			loaded = true;
		};
		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});
</script>

{#if loaded}
	<img class="h-full w-full object-contain" {src} {alt} />
{:else if failed}
	<div class="flex flex-col items-center justify-center bg-gray-100 text-center">
		<span
			style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"
			><span
				style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;"
				><img
					alt=""
					aria-hidden="true"
					src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2764%27%20height=%2764%27/%3e"
					style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"
				/></span
			>
			<picture>
				<source type="image/webp" srcSet="/images/not-found.webp" />
				<img
					style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"
					src="/images/not-found.webp"
					alt="Not Found"
				/>
			</picture>
		</span>
	</div>
{:else if loading}
	<div class="w-full p-2 flex items-center">
		<div class="w-full h-44 bg-gray-400 animate-pulse" />
	</div>
{/if}
