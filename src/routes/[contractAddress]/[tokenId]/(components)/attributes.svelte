<script lang="ts">
	export let attributes;
</script>

<div class="flex flex-col items-start">
	<h2 class="my-2 md:my-4 text-base md:text-xl dark:text-white">Attributes</h2>
	<div class="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
		{#each attributes as attribute}
			<div class="border border-solid border-gray-500 bg-slate-50 dark:bg-slate-800 p-2 md:p-4">
				<p class="text-sm md:text-base text-teal-400">{attribute.key}</p>
				<p class="text-sm font-light dark:text-white">{attribute.value}</p>
			</div>
		{/each}
	</div>
</div>
