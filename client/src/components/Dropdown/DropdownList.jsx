import { useEffect, useState, useRef } from 'react';
import styles from './DropdownList.module.scss';

export default function DropdownList({
	items = [],
	onSelect = () => {},
	toggleDropdown = () => {},
	setInputValue = () => {},
	isActive = false,
	ref,
	onClose = () => {},
	isWalletsListOpen,
	isNameListOpen,
	listType = null,
	style = {},
}) {
	const [highlightIndex, setHighlightIndex] = useState(null);
	const itemRefs = useRef([]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'ArrowDown') {
				setHighlightIndex((prev) =>
					highlightIndex === null ? 0 : (prev + 1) % items.length
				);

				itemRefs.current[
					highlightIndex === null ? 0 : (highlightIndex + 1) % items.length
				].scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				});
			} else if (e.key === 'ArrowUp') {
				setHighlightIndex((prev) => (prev - 1 + items.length) % items.length);

				itemRefs.current[
					(highlightIndex - 1 + items.length) % items.length
				].scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				});
			} else if (e.key === 'Enter' && items[highlightIndex]) {
				onSelect(items[highlightIndex]);
				toggleDropdown('false');
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [
		highlightIndex,
		onSelect,
		toggleDropdown,
		items.length,
		items,
		setInputValue,
	]);

	return (
		<ul
			ref={ref}
			className={`${styles.dropdownList} ${isActive && styles.isActive}`}
			style={style}>
			{isNameListOpen &&
				items.map((item, index) => (
					<li
						ref={(item) => (itemRefs.current[index] = item)}
						key={index}
						onMouseDown={() => {
							onSelect(item);
							onClose();
						}}
						className={`${styles.dorpdownListElement} ${
							index === highlightIndex ? styles.highlight : ''
						}`}>
						{item}
						{index < items.length - 1 ? (
							<span className={styles.line}></span>
						) : (
							''
						)}
					</li>
				))}

			{items.length === 0 && (
				<li className={`${styles.dorpdownListElement} ${styles.emptyList}`}>
					{'You can add frequently used names to the list'}
				</li>
			)}

			{isWalletsListOpen &&
				items.map((item, index) => (
					<li
						ref={(item) => (itemRefs.current[index] = item)}
						key={index}
						onMouseDown={() => {
							onSelect({ name: item.name, balance: item.balance });
							onClose();
						}}
						className={`${styles.dorpdownListElement} ${
							index === highlightIndex ? styles.highlight : ''
						}`}>
						{`${item.name}`}
						<span className={styles.balanceText}>
							balance:{' '}
							<span className={styles.balanceAmountText}>${item.balance}</span>
						</span>
						{index < items.length - 1 ? (
							<span className={styles.line}></span>
						) : (
							''
						)}
					</li>
				))}

			{listType === 'colors' &&
				items.map((item, index) => (
					<li
						ref={(item) => (itemRefs.current[index] = item)}
						key={index}
						onMouseDown={() => {
							onSelect(item);
							onClose();
						}}
						className={`${styles.dorpdownListElement} ${styles.colorsHeight} ${
							index === highlightIndex ? styles.highlight : ''
						}`}
						style={{ width: '12.6rem' }}>
						<div className={styles.colorBox} style={item}></div>
					</li>
				))}
		</ul>
	);
}
