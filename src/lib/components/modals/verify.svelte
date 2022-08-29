<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';

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
		class="modal z-60 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 bg-slate-900"
	>
		<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center">
			<div
				class="relative w-11/12 sm:w-8/12 md:w-9/12 bg-white dark:bg-gray-800 shadow  pt-10 pb-8 rounded"
			>
				<div
					on:click|stopPropagation={() => {
						signInOpen = false;
						loading = true;
						message = 'Waiting for you to sign in';
					}}
					class="cursor-pointer absolute top-0 right-0 m-3 text-gray-800 dark:text-gray-100 transition duration-150 ease-in-out"
				>
					<Fa icon={faTimes} scale={1.3} class="block text-white" />
				</div>
				<div class="flex flex-col items-start px-4 md:px-12">
					{#if loading}
						<Fa icon={faCircleNotch} scale={2} class="block animate-spin text-white" />
					{:else}
						<Fa icon={faTimes} scale={2} class="block text-red-500" />
					{/if}

					<p
						class="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100"
					>
						Sign in Wallet
					</p>
					<p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-gray-600 dark:text-gray-300">
						Sign the message in your wallet. By signing, you accept wyd's Terms of Service.
					</p>
				</div>
				<div class="flex items-center justify-between px-4 mt-5 md:px-12">
					<p
						class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 mr-6 text-gray-600 dark:text-gray-500"
					>
						Status
					</p>
					<p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-gray-600 dark:text-gray-300">
						{message}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
