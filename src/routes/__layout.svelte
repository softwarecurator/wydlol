<script context="module" lang="ts">
	import '../app.postcss';
	declare var Moralis: any;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { variables } from '$lib/utilities/variables';
	import Toasts from '$lib/components/toasts/toasts.svelte';
	import Header from './_header.svelte';

	let moralisStarted = false;
	function configureMoralis() {
		Moralis.start({ serverUrl: variables.serverUrl, appId: variables.appID });

		moralisStarted = true;
	}

	onMount(() => {
		configureMoralis();
	});
</script>

<svelte:head>
	<title>wyd lol?</title>
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta property="og:title" content="wydlol" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://wydlol.xyz" />
</svelte:head>

{#if moralisStarted}
	<div class="flex">
		<Toasts />
		<Header />
		<div class="mt-20 md:grid grid-cols-4 gap-4">
			<div class="hidden md:block h-screen bg-gray-100 col-span-1 sticky top-20">
				<div>
					<h2>words</h2>
					<p>words here</p>
				</div>
			</div>
			<main class="col-span-3">
				<slot />
			</main>
		</div>
	</div>
{/if}
