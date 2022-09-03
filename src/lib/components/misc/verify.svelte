<script lang="ts">
	export let isVerified: boolean;
	export let size: 'small' | 'large' = 'small';
</script>

{#if isVerified}
	<img
		src="/images/icons/verify.svg"
		class:large={size === 'large'}
		class="w-3 h-3 md:w-5 md:h-5 ml-2"
		alt="Verify Icon"
	/>
{/if}

<style lang="postcss">
	.large {
		@apply w-5 h-5 md:w-8 md:h-8;
	}
</style>
