import styles from './Filters.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseButton from '../../../components/CloseButton/CloseButton';

export default function Filters({ isOpen = false, openFilters = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.box} ${isOpen && styles.openFilters}`}>
				<CloseButton value={openFilters} />
				<span className={styles.title}>Filters</span>
				<button className={styles.monthBtn}>
					Month
					<span className={styles.monthBtnIcon}>
						<FontAwesomeIcon icon='fa-solid fa-chevron-right' />
					</span>
				</button>
			</div>
		</div>
	);
}
