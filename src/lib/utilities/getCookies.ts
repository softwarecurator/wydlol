export const getCookies = function (request) {
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
};
