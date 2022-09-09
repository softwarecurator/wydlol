<script lang="ts">
	import Cookies from 'js-cookie';
	import { addToast } from '$lib/stores/toaster';
	import SignIn from '$lib/components/modals/verify.svelte';
	import { eagerConnect, usersProfile } from '$lib/stores/user';
	import { Moralis } from 'moralis';
	import { selectedAccount } from '$lib/stores/web3';
	import { goto } from '$app/navigation';

	export let provider = null;
	export let open = false;
	$: signInOpen = false;
	$: message = 'Waiting for you to sign in';
	$: loading = true;

	const setUserFields = async (user, address) => {
		try {
			const query = await new Moralis.Query(Moralis.Object.extend('Profile')).equalTo(
				'mainAddress',
				address
			);
			let profile = await query.first();
			if (!profile) {
				// get ENS domain of an address
				const options = { address };
				const resolve = await Moralis.Web3API.resolve.resolveAddress(options);
				const Profile = Moralis.Object.extend('Profile');
				const newProfile = new Profile({
					mainAddress: address,
					username: resolve.name ? resolve.name : address,
					lower_username: resolve.name ? resolve.name.toLowerCase() : address.toLowerCase(),
					accounts: [address],
					lastScanned: new Date(),
					bio: ''
				});
				newProfile.set('user', user);
				const createdProfileObj = await newProfile.save();
				usersProfile.set(newProfile);
				user.set(profile, createdProfileObj);
				await user.save();
				return {
					status: 'passed'
				};
			}
			const profileObj = {
				mainAddress: profile.get('mainAddress'),
				createdAt: profile.get('createdAt'),
				bio: profile.get('bio'),
				updatedAt: profile.get('updatedAt'),
				username: profile.get('username'),
				lowerUsername: profile.get('lower_username')
			};
			usersProfile.set(profileObj);
			return {
				status: 'passed'
			};
		} catch (err) {
			console.log(err);
			return {
				status: 'failed',
				msg: err.message
			};
		}
	};

	async function login() {
		let user = Moralis.User.current();
		if (user && user.id == undefined) {
			// Moralis is in a broken state. run logOut
			Moralis.User.logOut();
			user = null;
		}
		if (!user) {
			try {
				signInOpen = true;
				loading = true;
				user = await Moralis.authenticate({
					provider,
					signingMessage: 'thats crazy... sign this message tho'
				});

				//Setting Login Cookies
				Cookies.set('wyd-session', user.get('sessionToken'), { secure: true });
				Cookies.set('wyd-user', user.get('ethAddress'), { secure: true });

				const { status, msg = '' } = await setUserFields(user, user.get('ethAddress'));

				if (status === 'passed') {
					signInOpen = false;
					open = false;
					selectedAccount.set(user.get('ethAddress'));
					eagerConnect.set('1');
					goto('/feed');
				} else {
					throw new Error(msg);
				}
			} catch (err) {
				console.log(err);
				loading = false;
				message = err.message;
				addToast({ type: 'error', message: err.message });
			}
		} else {
			open = false;
		}
	}
</script>

<div on:click={() => login()}>
	<SignIn bind:message bind:signInOpen bind:loading />
	<slot />
</div>
