<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faCheckCircle,
		faExclamationCircle,
		faInfoCircle,
		faTimes
	} from '@fortawesome/free-solid-svg-icons';
	const dispatch = createEventDispatcher();

	export let type: 'default' | 'error' | 'success' | 'info' = 'default';
	export let dismissible = true;

	const switchIcons = () => {
		switch (type) {
			case 'error':
				return faExclamationCircle;
			case 'success':
				return faCheckCircle;
			case 'info':
				return faInfoCircle;
			default:
				return faInfoCircle;
		}
	};
</script>

<article
	class={`${type.toLowerCase()} text-white py-3 px-6 rounded flex items-center mt-0 mx-auto mb-2 w-80`}
	role="alert"
	transition:fade
>
	<Fa icon={switchIcons()} scale={1} />

	<div class="ml-2">
		<slot />
	</div>

	{#if dismissible}
		<button
			class="text-white bg-transparent border-0 p-0 my-0 ml-auto mr-0 leading-4 text-base"
			on:click={() => dispatch('dismiss')}
		>
			<Fa icon={faTimes} scale={1} />
		</button>
	{/if}
</article>

<style lang="postcss">
	.error {
		@apply bg-red-600;
	}
	.success {
		@apply bg-green-600;
	}
	.info {
		@apply bg-blue-600;
	}

	.default {
		@apply bg-gray-400;
	}
</style>
