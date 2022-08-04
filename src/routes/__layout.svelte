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
	<main>
		<Toasts />
		<Header />
		<slot />
	</main>
{/if}
