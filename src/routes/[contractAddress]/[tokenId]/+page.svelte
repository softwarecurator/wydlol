<script lang="ts">
	import * as blockies from 'blockies-ts';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Time from 'svelte-time';
	import Image from '$lib/components/loaders/image-loader.svelte';
	import Attributes from './(components)/attributes.svelte';
	import Moralis from '$lib/utilities/moralisPkg';
	import Transactions from './(components)/transactions.svelte';

	export let data;

	const showENS = async (address) => {
		// get ENS domain of an address
		const options = { address };
		const resolve = await Moralis.Web3API.resolve.resolveAddress(options);

		if (resolve.name) return resolve.name;

		return address;
	};

	const addressORENS = showENS(data.token.owner);
</script>

<svelte:head>
	<title>{data.token.name} | {data.token.collection.name}</title>
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta property="og:title" content={data.token.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://twitter.com/wydlolxyz" />
	<meta name="twitter:creator" content="@wydlolxyz" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={data.token.image} />
	<meta property="og:image:height" content="675" />
	<meta property="og:image:width" content="1200" />
</svelte:head>

<section class="flex flex-col items-start w-auto mx-12">
	<div class="m-2 flex flex-row items-center justify-center h-full">
		<img
			class="rounded-full w-14 h-14 md:w-10 md:h-10 m-2 md:m-0"
			src={data.token.collection.image}
			alt=""
		/>
		<h2 class="ml-2 text-base md:text-xl dark:text-white">{data.token.collection.name}</h2>
	</div>
	<div class="flex flex-col md:flex-row">
		<div class="flex flex-col items-start">
			<div>
				<Image src={data.token.image} />
			</div>
		</div>
		<div class="md:ml-12 flex flex-col">
			<h1 class="text-xl md:text-4xl dark:text-white">{data.token.name}</h1>
			{#if data.token.description}
				<p class="text-base my-8 dark:text-slate-400">
					{data.token.description}
				</p>
			{/if}
			<p class="dark:text-slate-400">
				Last Sale Price: {data.token.lastSell.value} ETH · <Time
					timestamp={new Date(data.token.lastSell.timestamp * 1000)}
					live
					relative
				/>
			</p>
			<div>
				<div>
					<div class="flex items-start justify-start mt-4 gap-4">
						<img
							class="rounded-full w-8 h-8 m-2 md:m-0"
							src={blockies.create({ seed: data.token.owner.toLowerCase() }).toDataURL()}
							alt=""
						/>
						<div class="flex flex-col items-start">
							<p class="text-sm dark:text-white">Owner</p>
							{#await addressORENS}
								<p class="dark:text-slate-400">{formatUsername(data.token.owner)}</p>
							{:then ENS}
								<p class="dark:text-slate-400">{formatUsername(ENS)}</p>
							{/await}
						</div>
					</div>
				</div>
			</div>
			<Transactions transactions={data.transactionsData} />
			<Attributes attributes={data.token.attributes} />
		</div>
	</div>
</section>
