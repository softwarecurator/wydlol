<script lang="ts">
	import { isLoggedIn, eagerConnect } from '$lib/stores/user';
	import * as blockies from 'blockies-ts';
	import Fa from 'svelte-fa/src/fa.svelte';
	import Cookies from 'js-cookie';
	import { faTimes, faCopy, faLink, faUserAlt } from '@fortawesome/free-solid-svg-icons';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import { Moralis } from 'moralis';
	import { goto } from '$app/navigation';

	$: me = isLoggedIn();

	eagerConnect.subscribe(() => {
		me = isLoggedIn();
	});

	const disconnect = async () => {
		await Moralis.User.logOut();
		eagerConnect.set('');
		Cookies.remove('wyd-session');
		Cookies.remove('wyd-user');
		profileOpen = !profileOpen;
		goto('/');
	};

	const handleCopied = (): void => {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 750);
	};

	let copied = false;
	export let profileOpen = false;
	export let user;
</script>

{#await me then data}
	{#if data.user}
		<aside
			class="h-screen drop-shadow-2xl fixed z-40 top-0 right-0 left-0 bottom-0 transform ease-in-out transition-all overflow-auto duration-300 translate-x-full"
			on:click={() => (profileOpen = !profileOpen)}
			class:profileOpen
		>
			<nav
				on:click|stopPropagation={() => null}
				class="bg-white h-full max-w-md min-w-[20rem] fixed flex flex-col overflow-auto z-50 items-start top-0 right-0 justify-start w-10/12 md:w-1/5"
			>
				<div class="flex items-center justify-between w-full bg-black p-6 text-gray-200">
					<a href="/" class="text-2xl">wyd lol? 🙈</a>
					<div class="text-gray-200 cursor-pointer" on:click={() => (profileOpen = !profileOpen)}>
						<Fa icon={faTimes} scale={1.5} />
					</div>
				</div>
				<div class="flex h-48 relative w-full">
					<div class="h-full w-full bg-gradient-to-rbg-black" />
				</div>
				<div class="w-full flex items-center justify-center flex-col relative z-50 -mt-10">
					<img
						alt="me"
						class="w-20 rounded-full"
						src={blockies.create({ seed: data.user.get('ethAddress').toLowerCase() }).toDataURL()}
					/>

					<h1 class="text-md mt-4 text-black text-xl">
						{formatUsername(user.username)}
					</h1>

					<a
						sveltekit:prefetch
						on:click={() => (profileOpen = !profileOpen)}
						class="flex items-center justify-center w-1/3 p-3 bg-inherit rounded-full border-2 border-solid border-black px-2 py-1.5  text-black mt-4"
						href={`/${user.username}`}
					>
						Profile
						<Fa icon={faUserAlt} scale={1} class="block h-full ml-2" />
					</a>
					<div class="flex items-center justify-between w-11/12 mt-4">
						<div class="flex items-center justify-center text-black">
							<div class="flex items-center justify-center">Your Wallet</div>
						</div>
						<div class="flex items-start justify-start bg-black mb-px">
							<div
								class:copied
								on:click={() => {
									handleCopied();
								}}
								class="flex items-center cursor-pointer justify-center border-r-2 p-1 border-white text-gray-200"
							>
								{#if copied}
									<p class="block w-full h-full text-gray-200">Copied</p>
								{:else}
									{formatUsername(data.user.get('ethAddress'))}
									<span class="block w-full h-full ml-2 text-gray-200"
										><Fa icon={faCopy} scale={1} />
									</span>
								{/if}
							</div>

							<a
								href={`https://etherscan.io/address/${data.user.get('ethAddress')}`}
								target="_blank"
							>
								<div class="w-8 h-8 flex text-gray-200 items-center">
									<Fa icon={faLink} scale={1} class="block w-full h-full" />
								</div>
							</a>
						</div>
					</div>
				</div>
				<div class="flex justify-center items-end w-full h-full pt-10">
					<div
						on:click={disconnect}
						class="cursor-pointer flex items-center justify-center p-4 bg-red-700 text-gray-200 w-full"
					>
						<p>Disconnect</p>
					</div>
				</div>
			</nav>
		</aside>
	{/if}
{/await}

<style lang="postcss">
	.profileOpen {
		@apply backdrop-blur-md translate-x-0;
	}

	.copied {
		@apply transition-colors ease-in duration-75 bg-green-800;
	}
</style>
