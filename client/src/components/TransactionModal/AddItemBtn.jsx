import styles from './AddItemBtn.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddItemBtn({
	value = () => {},
	handleArr = () => {},
	ref = null,
	handleOpen = () => {},
}) {
	return (
		<button
			ref={ref}
			onClick={() => {
				handleOpen();
			}}
			type='button'
			className={styles.addBtn}>
			<span className={styles.plusIcon}>
				<FontAwesomeIcon icon='fa-solid fa-plus' />
			</span>
		</button>
	);
}
