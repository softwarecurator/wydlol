import { writable } from 'svelte/store';
import { browser } from '$app/env';
import { getMyProfile } from '../services/user-service';

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

export const loadUsersProfile = async (): Promise<any> => {
	const profileRes = await getMyProfile();
	if(profileRes && profileRes.failed){
		usersProfile.set(profileRes);
	}
	else{
		usersProfile.set(null)
	}
	return profileRes;
};
