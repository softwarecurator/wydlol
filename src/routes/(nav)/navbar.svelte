<script lang="ts">
	import WalletModal from '$lib/components/modals/wallets.svelte';
	import { isLoggedIn, eagerConnect } from '$lib/stores/user';
	import * as blockies from 'blockies-ts';
	import { Icon, Moon, Sun } from 'svelte-hero-icons';

	$: open = false;
	$: isDark = true;

	const toggleDarkandLight = () => {
		if (isDark) {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
			isDark = false;
		} else {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
			isDark = true;
		}
	};

	export let profileOpen;
	$: me = isLoggedIn();
	$: openModal = () => {
		open = !open;
	};

	eagerConnect.subscribe(() => {
		me = isLoggedIn();
	});

	$: {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			isDark = true;
		} else {
			document.documentElement.classList.remove('dark');
			isDark = false;
		}
	}
</script>

<nav class="w-full fixed -top-1 z-30">
	<WalletModal bind:open />
	<div class="relative bg-transparent backdrop-blur-md max-h-[85px] p-2">
		<div class="relative z-20">
			<div class="flex items-center justify-between px-4 py-5">
				<div>
					<a href="/" class="text-4xl dark:text-white">wyd lol? 🙈</a>
				</div>
				<div class="flex items-center justify-end gap-x-8">
					<div class="flex items-center text-sm">
						<div class="flex gap-x-8 items-center relative">
							<div class="flex flex-row items-center gap-x-8">
								<button class="dark:text-white" on:click={() => toggleDarkandLight()}>
									{#if isDark}
										<Icon src={Sun} solid class="h-6 text-white w-6" />
									{:else}
										<Icon src={Moon} solid class="h-6 text-black w-6" />
									{/if}
								</button>
								{#await me then data}
									{#if data.user}
										<div>
											<div
												class="inline-flex items-center justify-center gap-x-2"
												on:click|stopPropagation={() => (profileOpen = !profileOpen)}
											>
												<div
													class="h-10 w-10 object-cover border rounded-full cursor-pointer flex-shrink-0"
												>
													<img
														alt="me"
														class="rounded-full w-full h-auto"
														src={blockies
															.create({ seed: data.user.get('ethAddress').toLowerCase() })
															.toDataURL()}
													/>
												</div>
											</div>
										</div>
									{:else}
										<div class="flex items-center">
											<div
												on:click|stopPropagation={openModal}
												class="cursor-pointer bg-black text-white dark:text-black dark:bg-white btn-cta"
											>
												CONNECT WALLET
											</div>
										</div>
									{/if}
								{/await}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	.btn-cta {
		@apply relative z-50 rounded-md inline-flex items-center px-4 py-2 text-sm  shadow-sm;
	}
</style>
