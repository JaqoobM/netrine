import styles from './Dropdown.module.scss';
import DropdownBtn from './DropdownBtn';
import DropdownList from './DropdownList';
import useClickOutside from '../../hooks/useClickOutside';
import { useState, useCallback, useRef } from 'react';

export default function Dropdown({
	items = [],
	handleItem = () => {},
	selectedItem = null,
	title = '',
}) {

	const dropdownListRef = useRef();
	
	const [isActive, setIsActive] = useState(false);

	const dropdownRef = useRef(null);

	const closeDropdown = useCallback(() => setIsActive(false), [setIsActive]);

	const toggleDropdown = useCallback(
		() => setIsActive((prev) => !prev),
		[setIsActive]
	);

	useClickOutside(dropdownRef, closeDropdown);

	return (
		<>
			<div ref={dropdownRef} className={styles.dropdownContainer}>
				<DropdownBtn
					toggleDropdown={toggleDropdown}
					selectedItem={selectedItem}
					title={title}
				/>

				{/* <DropdownList
					ref={dropdownListRef}
					items={filteredItems}
					onSelect={handleValueChange}
					onClose={handleDropdownClose}
					isActive={isActive}
				/> */}
			</div>
		</>
	);
}
