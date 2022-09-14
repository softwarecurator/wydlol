import { writable } from 'svelte/store';
import { Moralis } from 'moralis';
import { eagerConnect, usersProfile } from './user';
import { get } from 'svelte/store';
import { isMobileDevice } from '$lib/utilities/isMobileDevice';

export const connected = writable<boolean>(false);
export const chainId = writable<string>(null);
export const selectedAccount = writable<string>(null);
export const web3 = writable<any>(null);

let onAccountUnsubscribe;
let onWeb3Unsubscribe;
let onChainUnsubscribe;
let onWeb3DeactivatedUnsubscribe;

const unsubscribers = () => {
	if (
		onAccountUnsubscribe &&
		onWeb3Unsubscribe &&
		onChainUnsubscribe &&
		onWeb3DeactivatedUnsubscribe
	) {
		onAccountUnsubscribe();
		onChainUnsubscribe();
		onChainUnsubscribe();
		onWeb3DeactivatedUnsubscribe();
	}

	connected.set(false);
	chainId.set(null);
	usersProfile.set(null);
	selectedAccount.set('');
	web3.set(null);
};

export const init = async () => {
	unsubscribers();
	if (get(eagerConnect)) {
		try {
			if (isMobileDevice.any()) {
				await Moralis.enableWeb3({
					provider: 'walletConnect'
				});
			} else {
				await Moralis.enableWeb3({});
			}

			connected.set(true);

			onAccountUnsubscribe = Moralis.onAccountChanged((newAccount) => {
				selectedAccount.set(newAccount);
			});

			onWeb3Unsubscribe = Moralis.onWeb3Enabled((result) => {
				chainId.set(result.chainId);
				selectedAccount.set(result.account);
			});

			onChainUnsubscribe = Moralis.onChainChanged((chain) => {
				chainId.set(chain);
			});

			onWeb3DeactivatedUnsubscribe = Moralis.onWeb3Deactivated((error) => {
				chainId.set(null);
				selectedAccount.set(null);
			});

			const account = await Moralis.account;
			const setChainId = await Moralis.chainId;
			const user = Moralis.User.current();
			if (user) {
				const lower = user.get('ethAddress').toLowerCase();

				const profile = await new Moralis.Query(Moralis.Object.extend('Profile'))
					.equalTo('mainAddress', lower)
					.first();

				const profileObj = {
					mainAddress: profile.get('mainAddress'),
					createdAt: profile.get('createdAt'),
					bio: profile.get('bio'),
					updatedAt: profile.get('updatedAt'),
					username: profile.get('username'),
					lowerUsername: profile.get('lower_username')
				};

				usersProfile.set(profileObj);
			}

			chainId.set(setChainId);
			selectedAccount.set(account);
		} catch (err) {
			console.log(err);
		}
	}
};
