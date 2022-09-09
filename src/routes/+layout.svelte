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
	import { page } from '$app/stores';

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
	let windowWidth;
	onMount(() => {
		configureMoralis();
		let provider;
		if (windowWidth < 768) provider = 'walletconnect';
		init(provider);
	});
</script>

<svelte:head>
	<title>{$page.data.title} | wyd lol?</title>
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta property="og:title" content={`${$page.data.title} | wyd lol?`} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:image" content={$page.data.image} />
	<meta property="og:image:height" content="675" />
	<meta property="og:image:width" content="1200" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={$page.data.image} />
	<meta name="twitter:site" content="https://twitter.com/wydlolxyz" />
	<meta name="twitter:creator" content="@wydlolxyz" />
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />

{#if moralisStarted}
	<div class="flex dark:bg-slate-900">
		<Toasts />
		<Sidebar bind:profileOpen />
		<Navbar bind:profileOpen />
		<div class="mt-20">
			<main class="flex flex-col items-center justify-center w-screen">
				<slot />
			</main>
		</div>
	</div>
{/if}
