<script lang="ts">
	import { isLoggedIn, eagerConnect, usersProfile } from '$lib/stores/user';
	import * as blockies from 'blockies-ts';
	import Fa from 'svelte-fa/src/fa.svelte';
	import Cookies from 'js-cookie';
	import { faTimes, faCopy, faLink, faUserAlt } from '@fortawesome/free-solid-svg-icons';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Moralis from '$lib/utilities/moralisPkg';
	import { goto } from '$app/navigation';

	$: me = isLoggedIn();

	const disconnect = async () => {
		await Moralis.User.logOut();
		eagerConnect.set(null);
		usersProfile.set(null);
		me = null;
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

	$: {
		if ($eagerConnect) {
			me = isLoggedIn();
		}
	}
</script>

{#await me then data}
	{#if $usersProfile && data.user}
		<aside
			class="h-screen fixed z-40 top-0 right-0 left-0 bottom-0 transform ease-in-out transition-all overflow-hidden duration-300 translate-x-full"
			on:click={() => (profileOpen = !profileOpen)}
			class:profileOpen
		>
			<div
				class="h-screen w-screen backdrop-blur-md overflow-hidden fixed z-30 top-0 right-0 left-0 bottom-0"
			/>
			<nav
				on:click|stopPropagation={() => null}
				class="bg-slate-100 dark:bg-zinc-900  h-full max-w-md min-w-[20rem] fixed flex flex-col overflow-hidden z-50 items-start top-0 right-0 justify-start w-10/12 md:w-1/5"
			>
				<div class="flex items-center justify-end w-full p-6 text-gray-200">
					<div class="text-gray-200 cursor-pointer" on:click={() => (profileOpen = !profileOpen)}>
						<Fa icon={faTimes} scale={1.5} />
					</div>
				</div>
				<div class="flex h-12 relative w-full" />
				<div class="w-full flex items-center justify-center flex-col relative z-50 -mt-10">
					<div class="flex flex-row justify-center items-center gap-4">
						<img
							alt="me"
							class="w-12 rounded-full"
							src={blockies.create({ seed: data.user.get('ethAddress').toLowerCase() }).toDataURL()}
						/>

						<h1 class="text-sm text-black dark:text-white md:text-xl">
							{formatUsername($usersProfile.username)}
						</h1>
					</div>

					<a
						sveltekit:prefetch
						on:click={() => (profileOpen = !profileOpen)}
						class="flex items-center justify-center w-full border-2 border-solid border-zinc-900 p-4 text-black dark:text-white mt-4 dark:bg-zinc-700"
						href={`/${$usersProfile.username}`}
					>
						Profile
						<Fa icon={faUserAlt} scale={1} class="block h-full ml-2" />
					</a>
					<div class="flex items-center justify-between w-11/12 mt-4">
						<div class="flex items-center justify-center text-black dark:text-white">
							<div class="flex items-center justify-center">Your Wallet</div>
						</div>
						<div class="flex items-start justify-start bg-black dark:bg-zinc-800 mb-px">
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
				<div class="flex justify-center items-center w-full mt-10">
					<div
						on:click={disconnect}
						class="cursor-pointer flex items-center justify-center p-4 border-2 border-solid border-black text-black dark:text-gray-200 w-full"
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
		@apply transform ease-in-out transition-all overflow-hidden duration-300 translate-x-0;
	}

	.copied {
		@apply transition-colors ease-in duration-75 bg-green-800;
	}
</style>
