<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff }) => {
		return {
			status: 302,
			redirect: '/trending'
		};
	};
</script>
