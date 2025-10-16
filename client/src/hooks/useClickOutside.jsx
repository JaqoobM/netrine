import { useEffect } from 'react';

export default function useClickOutside(
	triggerRef = null,
	listRef = null,
	closeDropdown = () => {}
) {
	useEffect(() => {
		const handleCloseDropdown = (e) => {
			if (
				(!triggerRef?.current.contains(e.target) &&
					!listRef?.current.contains(e.target)) ||
				e.key === 'Escape'
			) {
				closeDropdown();
			}
		};

		document.addEventListener('mousedown', handleCloseDropdown);
		document.addEventListener('focusin', handleCloseDropdown);
		// document.addEventListener('keyup', handleCloseDropdown);

		return () => {
			document.removeEventListener('mousedown', handleCloseDropdown);
			document.removeEventListener('focusin', handleCloseDropdown);
			// document.addEventListener('keyup', handleCloseDropdown);
		};
	}, []);
}
