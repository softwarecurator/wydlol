<script lang="ts">
	import * as blockies from 'blockies-ts';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Time from 'svelte-time';
	import Moralis from '$lib/utilities/moralisPkg';

	const showENS = async (address) => {
		try {
			// get ENS domain of an address
			const options = { address };
			const resolve = await Moralis.Web3API.resolve.resolveAddress(options);

			if (resolve.name) return resolve.name;

			return address;
		} catch (err) {
			return address;
		}
	};

	export let transactions;
</script>

<div class="flex flex-col items-start">
	<h2 class="my-2 md:my-4 text-base md:text-xl dark:text-white">Transactions</h2>
	<div class="flex flex-wrap w-full gap-2">
		{#each transactions.activities as transaction}
			<div
				class="border border-solid w-full border-gray-500 bg-slate-50 dark:bg-slate-800 p-2 md:p-4"
			>
				<p class="text-sm md:text-base text-teal-400">
					{transaction.type.toUpperCase()} · <Time
						timestamp={new Date(transaction.timestamp * 1000)}
						live
						relative
					/>
				</p>
				<div class="flex items-center justify-around">
					<div class="flex items-start justify-start flex-col md:flex-row mt-4 md:gap-4">
						<img
							class="rounded-full w-8 h-8 m-2 md:m-0"
							src={blockies.create({ seed: transaction.fromAddress.toLowerCase() }).toDataURL()}
							alt=""
						/>
						<div class="flex flex-col items-start dark:text-slate-400">
							From
							{#await showENS(transaction.fromAddress)}
								<p>{formatUsername(transaction.fromAddress)}</p>
							{:then ENS}
								<p>{formatUsername(ENS)}</p>
							{/await}
						</div>
					</div>
					{#if transaction.type === 'sale'}
						<div class="flex items-start justify-start flex-col md:flex-row mt-4 md:gap-4">
							<img
								class="rounded-full w-8 h-8 m-2 md:m-0"
								src={blockies.create({ seed: transaction?.toAddress.toLowerCase() }).toDataURL()}
								alt=""
							/>
							<div class="flex flex-col items-start dark:text-slate-400">
								To
								{#await showENS(transaction?.toAddress)}
									<p>{formatUsername(transaction?.toAddress)}</p>
								{:then ENS}
									<p>{formatUsername(ENS)}</p>
								{/await}
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
