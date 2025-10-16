import styles from './BottomSheet.module.scss';
import Header2 from '../Header2/Header2';
import CloseButton from '../CloseButton/CloseButton';

export default function BottomSheet() {
	return (
		<div className={styles.container}>
			<Header2 />
			<CloseButton />
			<div className={styles.contentBox}>
				<button className={styles.squareBtn}></button>
			</div>
		</div>
	);
}
