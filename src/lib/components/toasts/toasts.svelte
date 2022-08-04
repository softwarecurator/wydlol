<script lang="ts">
	import Toast from './toast.svelte';
	import { dismissToast, toasts } from '$lib/stores/toaster';
</script>

{#if $toasts}
	<section class="fixed bottom-0 right-8 flex mt-1 justify-center flex-col z-[100] md:right-4">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}
			>
				{toast.message}
			</Toast>
		{/each}
	</section>
{/if}
