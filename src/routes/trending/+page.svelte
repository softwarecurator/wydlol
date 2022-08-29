<script lang="ts">
	import Timeline from '$lib/components/feed/timeline.svelte';
	export let data;
</script>

<h2 class="text-center text-xl md:text-3xl mb-4 flex items-center justify-center">
	<div class="mx-2 flex items-center justify-center h-full">
		<img
			class="rounded-full w-14 h-14 md:w-10 md:h-10 m-2 md:m-0"
			src={data.activities[0].collection.collectionImage}
			alt=""
		/>
	</div>
	<select name="trending" id="trending" class="m-1">
		<option value={data.activities[0].collection.collectionId}
			>{data.activities[0].collection.collectionName}</option
		>
		<option value="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D">Saab</option>
		<option value="0x23581767a106ae21c074b2276D25e5C3e136a68b">Mercedes</option>
		<option value="0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e">Audi</option>
	</select> LOL
</h2>
<Timeline activities={data.activities} />
