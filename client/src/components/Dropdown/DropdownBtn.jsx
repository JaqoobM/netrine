import styles from './DropdownBtn.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownList from './DropdownList';
import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

export default function DropdownBtn({
	// selectedItem = null,
	title = '',
	items = [],
	isCategories = false,
	btnType = null,
	backgroundColors = [],
	iconColors = [],
}) {
	const buttonRef = useRef();
	const listRef = useRef();

	const [isActive, setIsActive] = useState(false);
	// const [isWalletsListOpen, setIsWalletslistOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors);
	const [iconColor, setIconColor] = useState(iconColors);
	const [style, setStyle] = useState({});

	const changeStyle = (newStyle) => {
		setStyle(newStyle);
	};

	const handleOnClick = () => {
		setIsActive(!isActive);
		// setIsWalletslistOpen(true);
	};

	const closeDropdown = () => {
		setIsActive((prev) => false);
	};

	useClickOutside(buttonRef, listRef, closeDropdown);

	const handleSelect = (item) => {
		setSelectedItem(item);
	};

	return (
		<div className={styles.container}>
			{btnType === 'categories' && (
				<button
					ref={buttonRef}
					type='button'
					onClick={handleOnClick}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleOnClick();
							e.preventDefault();
						}
					}}
					aria-label={title}
					className={`${styles.dropdownBtn} ${isActive && styles.openBorder}`}>
					<span
						className={`${styles.dropdownTitle} ${
							isActive && styles.openTitle
						}`}>
						{title}
					</span>
					{selectedItem ? (
						<span className={styles.selectedItemText}>
							{selectedItem.name}{' '}
							<span className={styles.selectedItemBalanceText}>
								${selectedItem.balance}
							</span>
						</span>
					) : (
						'Select a wallet'
					)}
					<span
						className={`${styles.dropdownChevron} ${
							isActive && styles.openChevron
						}`}>
						<FontAwesomeIcon icon='fa-solid fa-chevron-down' />
					</span>
				</button>
			)}
			{btnType === 'colors' && (
				<button
					ref={buttonRef}
					type='button'
					onClick={handleOnClick}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleOnClick();
							e.preventDefault();
						}
					}}
					aria-label={title}
					className={`${styles.dropdownBtn} ${isActive && styles.openBorder}`}>
					<span
						className={`${styles.dropdownTitle} ${
							isActive && styles.openTitle
						}`}>
						{title}
					</span>
					<div className={styles.colorBox} style={style}></div>
					<span
						className={`${styles.dropdownChevron} ${
							isActive && styles.openChevron
						}`}>
						<FontAwesomeIcon icon='fa-solid fa-chevron-down' />
					</span>
				</button>
			)}
			<DropdownList
				ref={listRef}
				items={items}
				isActive={isActive}
				// isWalletsListOpen={isWalletsListOpen}
				listType={btnType}
				onSelect={changeStyle}
				onClose={handleOnClick}
				style={{ flexDirection: 'row', flexWrap: 'wrap' }}
			/>
		</div>
	);
}
