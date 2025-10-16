import styles from './DropdownInput.module.scss';
import Input from '../Input/Input';
import DropdownList from './DropdownList';
import AddItemBtn from '../TransactionModal/AddItemBtn';
import useClickOutside from '../../hooks/useClickOutside';
import { useState, useRef, useEffect } from 'react';
import { use } from 'react';

export default function InputDropdown({
	label = '',
	type = 'text',
	items = [],
	handleNameValue = () => {},
}) {
	const [isActive, setIsActive] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [filteredItems, setFilterItems] = useState([]);
	const [isNameListOpen, setIsNameListOpen] = useState(false);
	const inputRef = useRef(null);
	const containerRef = useRef();
	const dropdownListRef = useRef();

	const handleDropdownOpen = () => {
		setIsActive(true);
		setIsNameListOpen(true)
	};

	const handleDropdownClose = () => {
		setIsActive(false);
		inputRef.current.blur();
	};

	useEffect(() => {
		const dropdown = dropdownListRef.current;
		let timeoutId = null;

		if (isActive && dropdown) {
			timeoutId = setTimeout(() => {
				dropdown.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
			}, 200);
		}

		const test = (e) => {
			inputRef.current.blur();
		};

		dropdown?.addEventListener('scroll', test);

		return () => {
			if (dropdownListRef.current) {
				dropdownListRef.current.removeEventListener('scroll', test);
			}
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [isActive]);

	const toggleDropdown = () => {
		setIsActive(false)
	}

	useClickOutside(inputRef, dropdownListRef, toggleDropdown)

	useEffect(() => {
		const newItems = items.filter((item) =>
			item.toLowerCase().includes(inputValue.toLowerCase())
		);
		setFilterItems(newItems);
		handleNameValue(inputValue);
	}, [inputValue, items]);

	const handleValueChange = (value) => {
		setInputValue(value);
	};

	return (
		<div ref={containerRef} className={styles.inputContainer}>
			<Input
				ref={inputRef}
				label={label}
				type={type}
				onChange={handleValueChange}
				inputValue={inputValue}
				isActive={isActive}
				onOpen={handleDropdownOpen}
			/>

			<DropdownList
				ref={dropdownListRef}
				items={filteredItems}
				onSelect={handleValueChange}
				onClose={handleDropdownClose}
				isActive={isActive}
				isNameListOpen={isNameListOpen}
			/>
		</div>
	);
}
