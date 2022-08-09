<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch(`/api/users`, {
			method: 'POST',
			body: JSON.stringify('ME')
		});
		const { user } = await res.json();
		if (user) {
			if (user) {
				return {
					status: 302,
					redirect: '/feed'
				};
			}
		}
		return {
			status: 302,
			redirect: '/trending'
		};
	};
</script>
