import Moralis from 'moralis/node';
import { variables } from '$lib/utilities/variables';

Moralis.start({
	serverUrl: variables.serverUrl,
	appId: variables.appID,
	masterKey: variables.masterKey
});
export { Moralis };
