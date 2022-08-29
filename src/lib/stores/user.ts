import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { Moralis } from 'moralis';
import { getCookies } from '$lib/utilities/getCookies';
import { env } from '$env/dynamic/public';

const defaultValue = '';
const initialValue = browser
	? window.localStorage.getItem('eagerConnect') ?? defaultValue
	: defaultValue;

export const usersProfile = writable<any>(null);

export const eagerConnect = writable<string>(initialValue);

eagerConnect.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('eagerConnect', value);
	}
});

export const isLoggedIn = async () => {
	const cookies = getCookies();

	Moralis.start({
		serverUrl: env.PUBLIC_MORALIS_SERVER_URL,
		appId: env.PUBLIC_MORALIS_APP_ID
	});

	if (eagerConnect) {
		if (cookies['wyd-user'] || cookies['wyd-session']) {
			return { user: Moralis.User.current() };
		} else {
			// If cookies absent, reset me/eager-connect/Moralis;
			Moralis.User.logOut();
			eagerConnect.set('');
			return { user: null };
		}
	} else {
		return { user: null };
	}
};
