import { useState } from 'react';
import styles from './Checkbox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Checkbox() {
	const [isActive, setIsActive] = useState(false);

	return (
		<>
			<button
				type='button'
				onClick={() => {
					setIsActive((prev) => {
						return !prev;
					});
				}}
				className={`${styles.checkbox} ${
					isActive ? styles.checkboxActive : ''
				}`}>
				<div
					className={`${styles.circle} ${isActive ? styles.circleActive : ''}`}>
					<span className={styles.xIcon}>
						{isActive ? (
							<FontAwesomeIcon icon='fa-solid fa-check' />
						) : (
							<FontAwesomeIcon icon='fa-solid fa-xmark' />
						)}
					</span>
				</div>
			</button>
		</>
	);
}
