import { use } from 'react';
import styles from './CloseButton.module.scss';

export default function CloseButton({
	value = () => {},
	handleClear = () => {},
}) {
	return (
		<button
			type='button'
			onClick={() => {
				value();
				handleClear();
			}}
			className={styles.closeBtn}>
			<span className={`${styles.closeBtnIcon} ${styles.closeBtnBar1}`}></span>
			<span className={`${styles.closeBtnIcon} ${styles.closeBtnBar2}`}></span>
		</button>
	);
}
