<script lang="ts">
	import { clickOutside } from '$lib/utilities/clickOutside';
	import Login from '$lib/components/auth/login.svelte';
	import { Icon, X } from 'svelte-hero-icons';
	import { isMobileDevice } from '$lib/utilities/isMobileDevice';

	export let open;

	const closeModal = () => {
		open = false;
	};
</script>

{#if open}
	<div
		class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 bg-opacity-60 bg-black cursor-default backdrop-blur-sm transition-all ease-in-out delay-150"
	>
		<div
			role="alert"
			class="container mx-auto max-w-lg flex justify-center"
			use:clickOutside={{ enabled: open, callback: () => (open = false) }}
		>
			<div class="relative z-[51] opacity-100">
				<div class="modal w-96">
					<div class="gradient-border rounded-def">
						<div class="flex justify-between items-center rounded-def bg-black px-6 py-3">
							<h1 class="font-regular text-lg text-white uppercase">Connect Wallet</h1>
							<div on:click={closeModal} class="cursor-pointer text-white">
								<Icon class="w-6" src={X} />
							</div>
						</div>
					</div>
					<div class="gradient-border rounded-def mt-[1px]">
						<div class="rounded-def bg-black px-6 py-5 space-y-[1px]">
							{#if !isMobileDevice.any()}
								<Login bind:open>
									<div
										class="border uppercase cursor-pointer border-grey5 rounded-def bg-grey4 w-full text-center text-white py-1 flex items-center justify-start px-5 gap-x-3"
									>
										<img
											src="/images/icons/metamask.svg"
											class="object-cover w-9 h-9"
											alt="metamask"
										/>
										MetaMask
									</div>
								</Login>
							{/if}
							<Login provider="walletconnect" bind:open>
								<div
									class="border uppercase cursor-pointer border-grey5 rounded-def bg-grey4 w-full text-center text-white py-1 flex items-center justify-start px-5 gap-x-3"
								>
									<img
										src="/images/icons/walletconnect.svg"
										class=" w-9 h-9"
										alt="wallletconnect"
									/>
									WalletConnect
								</div>
							</Login>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="absolute bottom-0 gradient w-full left-0 h-2" />
			<div
				class="absolute bottom-2 gradient-blur w-full left-0 h-2 animate-[pulse_2s_ease-in-out_infinite]"
			/>
		</div>
	</div>
{/if}
