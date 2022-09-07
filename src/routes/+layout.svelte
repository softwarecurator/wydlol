<script context="module" lang="ts">
	import '../app.postcss';
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { Moralis } from 'moralis';
	import Toasts from '$lib/components/toasts/toasts.svelte';
	import Navbar from './(nav)/navbar.svelte';
	import Sidebar from './(nav)/sidebar.svelte';
	import { init } from '$lib/stores/web3';

	export let data;
	let moralisStarted = false;
	$: profileOpen = false;
	const configureMoralis = () => {
		Moralis.start({
			serverUrl: env.PUBLIC_MORALIS_SERVER_URL,
			appId: env.PUBLIC_MORALIS_APP_ID
		});

		moralisStarted = true;
	};

	onMount(() => {
		configureMoralis();
		init();
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
	<div class="flex dark:bg-slate-900">
		<Toasts />
		<Sidebar bind:profileOpen user={data.user} />
		<Navbar bind:profileOpen />
		<div class="mt-20">
			<main class="flex flex-col items-center justify-center w-screen">
				<slot />
			</main>
		</div>
	</div>
{/if}
