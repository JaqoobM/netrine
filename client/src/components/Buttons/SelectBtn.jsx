import styles from './SelectBtn.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SelectBtn({
	title = '',
	onClick = () => {},
	selectedItem = {},
}) {
	return (
		<button
			onClick={onClick}
			type='button'
			aria-label={title}
			className={`${styles.btn}`}>
			<div className={styles.textBox}>
				<span className={styles.walletName}>{selectedItem.name}</span>
				<span className={styles.walletBalance}>${selectedItem.balance}</span>
			</div>
			<span className={`${styles.title}`}>{title}</span>
			<span className={`${styles.chevron}`}>
				<FontAwesomeIcon icon='fa-solid fa-chevron-down' />
			</span>
		</button>
	);
}
