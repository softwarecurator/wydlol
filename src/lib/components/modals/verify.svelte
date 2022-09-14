<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
	import { Icon, X } from 'svelte-hero-icons';

	export let message: string;
	export let signInOpen = false;
	export let loading = true;
</script>

{#if signInOpen}
	<div
		on:click|stopPropagation={() => {
			signInOpen = false;
			loading = true;
			message = 'Waiting for you to sign in';
		}}
		class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 bg-opacity-60 bg-black cursor-default backdrop-blur-sm transition-all ease-in-out delay-15"
	>
		<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center">
			<div
				class="relative w-11/12 sm:w-8/12 md:w-9/12 dark:bg-[#101010] border border-[#b3b5bd] dark:border-grey4 bg-[#f3f4f8] shadow rounded-def px-10 pt-5 pb-7"
			>
				<div class="flex flex-col items-start">
					<div class="flex justify-between items-center w-full dark:text-white text-black">
						{#if loading}
							<Fa icon={faCircleNotch} scale={2} class="block animate-spin ml-2" />
						{:else}
							<div class="rounded-full bg-red-500 p-2">
								<Icon src={X} class="block text-white w-8" />
							</div>
						{/if}
						<div
							on:click|stopPropagation={() => {
								signInOpen = false;
								loading = true;
								message = 'Waiting for you to sign in';
							}}
							class="cursor-pointer m-3 text-gray-800 dark:text-gray-100 transition duration-150 ease-in-out"
						>
							<Icon src={X} class=" w-7 -mr-4" />
						</div>
					</div>

					<p
						class="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100"
					>
						Sign in Wallet
					</p>
					<p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-zinc-600 dark:text-zinc-400">
						Sign the message in your wallet. By signing, you accept wyd's Terms of Service.
					</p>
				</div>
				<div class="flex items-center justify-between mt-8">
					<p class="text-xs sm:text-sm leading-5 mr-6 text-zinc-600 dark:text-zinc-400">Status</p>
					<p class="text-xs sm:text-sm leading-5 text-zinc-500 dark:text-zinc-400">
						{message}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
