import styles from './Toast.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Toast({
	isActive = false,
	text = 'Success!',
	toastType = 'success',
}) {
	return (
		<>
			<div
				className={`${styles.container} ${isActive && styles.active} ${
					toastType === 'error' && styles.errorContainer
				}`}>
				<div
					className={`${styles.box} ${
						toastType === 'error' && styles.errorBox
					}`}>
					<div
						className={`${styles.iconBox} ${
							toastType === 'error' && styles.errorIconBox
						}`}>
						<span
							className={`${styles.icon} ${
								toastType === 'error' && styles.errorIcon
							}`}>
							{toastType === 'success' ? (
								<FontAwesomeIcon icon='fa-solid fa-check' />
							) : (
								<FontAwesomeIcon icon='fa-solid fa-exclamation' />
							)}
						</span>
					</div>
					<span className={styles.text}>{text}</span>
				</div>
			</div>
		</>
	);
}
