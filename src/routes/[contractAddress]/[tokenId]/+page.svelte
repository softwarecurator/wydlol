<script lang="ts">
	import * as blockies from 'blockies-ts';
	import { formatUsername } from '$lib/utilities/format-long-names';
	import Image from '$lib/components/loaders/image-loader.svelte';
	import Attributes from './(components)/attributes.svelte';

	export let data;
	console.log(data);
</script>

<section class="flex flex-col items-start w-auto mx-12">
	<div class="m-2 flex flex-row items-center justify-center h-full">
		<img
			class="rounded-full w-14 h-14 md:w-10 md:h-10 m-2 md:m-0"
			src={data.token.collection.image}
			alt=""
		/>
		<h2 class="ml-2 text-base md:text-xl dark:text-white">{data.token.collection.name}</h2>
	</div>
	<div class="flex flex-col md:flex-row">
		<div class="flex flex-col items-start">
			<div>
				<Image src={data.token.image} />
			</div>
		</div>
		<div class="md:ml-12 flex flex-col">
			<h1 class="text-xl md:text-4xl dark:text-white">{data.token.name}</h1>
			<Attributes attributes={data.token.attributes} />
		</div>
	</div>
</section>
