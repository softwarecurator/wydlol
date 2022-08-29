export const formatUsername = (username: string) => {
	if (!username) return;
	if (username.includes('.eth')) return username;
	if (username?.length < 12) return username;

	return `${username.substring(0, 2)}...${username.substring(username.length - 4)}`;
};

export const renameTokenName = (name) => {
	if (!name) return;
	if (name?.length < 65) return name;

	return `NFT #${name.substring(name.length - 4)}`;
};
