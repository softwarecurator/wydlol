export const clickOutside = (node, { enabled: initialEnabled, callback }) => {
	const handleOutsideClick = ({ target }) => {
		if (!node.contains(target)) {
			callback();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
};
