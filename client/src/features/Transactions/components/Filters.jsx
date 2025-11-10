import styles from './Filters.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseButton from '../../../components/CloseButton/CloseButton';
import Header2 from '../../../components/Header2/Header2';

export default function Filters({ isOpen = false, openFilters = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.box} ${isOpen && styles.openFilters}`}>
				<CloseButton value={openFilters} />
				{/* <span className={styles.title}>Filters</span> */}
				<div className={styles.title}>
					<Header2 value='Filters' />
				</div>
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
