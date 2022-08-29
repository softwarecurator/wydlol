export const getCookies = (request = null) => {
	if (request) {
		const cookies = {};
		request.headers &&
			request.headers.get('cookie') &&
			request.headers
				.get('cookie')
				.split(';')
				.forEach(function (cookie) {
					const parts = cookie.match(/(.*?)=(.*)$/);
					cookies[parts[1].trim()] = (parts[2] || '').trim();
				});
		return cookies;
	} else {
		const pairs = document.cookie.split(';');
		const cookies: any = {};
		for (let i = 0; i < pairs.length; i++) {
			const pair = pairs[i].split('=');
			cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
		}
		return cookies;
	}
};
