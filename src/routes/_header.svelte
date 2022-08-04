<script lang="ts" context="module">
	declare var Moralis: any;
</script>

<script lang="ts">
	import WalletModal from '$lib/components/modals/wallets.svelte';
	import { eagerConnect } from '$lib/stores/user';
	import * as blockies from 'blockies-ts';

	$: open = false;
	$: me = getMe();
	$: openModal = () => {
		open = !open;
	};

	// Subscribe to eagerConnect change so UI updates properly onlogin
	eagerConnect.subscribe(() => {
		me = getMe();
	});

	// Validates cookies and other data isn't corrupt
	function getMe() {
		const cookies = getCookies();
		if ($eagerConnect) {
			if (cookies['wyd-user'] || cookies['wyd-session']) {
				return Moralis.User.current();
			} else {
				// If cookies absent, reset me/eager-connect/Moralis;
				Moralis.User.logOut();
				eagerConnect.set('');
				return null;
			}
		} else {
			return null;
		}
	}

	function getCookies() {
		var pairs = document.cookie.split(';');
		var cookies: any = {};
		for (var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split('=');
			cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
		}
		return cookies;
	}
</script>

<div class="relative bg-transparent max-h-[85px] p-2">
	<WalletModal bind:open />
	<div class="relative z-20">
		<div class="flex items-center justify-between px-4 py-5">
			<div>
				<a href="/trending" class="text-4xl">wyd lol?</a>
			</div>
			<div class="flex items-center justify-end gap-x-8">
				<div class="flex items-center text-sm">
					<div class="flex gap-x-8 items-center relative">
						<div class="flex flex-row items-center gap-x-8">
							{#if me}
								<div>
									<a
										class="inline-flex items-center justify-center gap-x-2"
										href={`/${me.get('ethAddress')}`}
									>
										<div
											class="h-10 w-10 object-cover border rounded-full cursor-pointer flex-shrink-0"
										>
											<img
												class="rounded-full w-full h-auto"
												src={blockies
													.create({ seed: me.get('ethAddress').toLowerCase() })
													.toDataURL()}
											/>
										</div>
									</a>
								</div>
							{:else}
								<div class="flex items-center">
									<div on:click|stopPropagation={openModal} class="btn-cta cursor-pointer">
										CONNECT WALLET
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.btn-cta {
		@apply relative z-50 rounded-md inline-flex items-center bg-black px-4 py-2 text-sm text-white shadow-sm;
	}
</style>
