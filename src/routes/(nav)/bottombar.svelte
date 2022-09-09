<script>
	import { Icon, Home, Search, Bell } from 'svelte-hero-icons';
</script>

<nav class="block md:hidden fixed bottom-0 w-full flex-col bg-zinc-100 dark:bg-gray-800 h-14">
	<div class="text-sm w-full h-full flex px-4 justify-around flex-row my-4 items-start">
		<a href="/">
			<Icon src={Home} solid class="h-6 text-black dark:text-white w-6" />
		</a>
		<div>
			<Icon src={Search} solid class="h-6 text-black dark:text-white w-6" />
		</div>
		<div>
			<Icon src={Bell} solid class="h-6 text-black dark:text-white w-6" />
		</div>
	</div>
</nav>
