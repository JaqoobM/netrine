import styles from './Filters.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseButton from '../../../components/CloseButton/CloseButton';
import Header2 from '../../../components/Header2/Header2';
import { useState } from 'react';

export default function Filters({ isOpen = false, openFilters = () => {} }) {
	const [isMonthsOpen, setIsMonthsOpen] = useState(false);
	const [checkedMonths, setCheckedMonths] = useState({
		january: false,
		february: false,
		march: false,
		april: false,
		may: false,
		june: false,
		july: false,
		august: false,
		september: false,
		october: false,
		november: false,
		december: false,
	});

	const changeMonthCheck = (month) => {
		setCheckedMonths((prev) => ({ ...prev, [month]: !prev[month] }));
	};

	const handleToggleMonths = () => {
		setIsMonthsOpen(!isMonthsOpen);
	};

	return (
		<>
			{/* FILTERS */}
			<div className={`${styles.container}`}>
				<div className={`${styles.box} ${isOpen && styles.openFilters}`}>
					<CloseButton value={openFilters} />
					<div className={styles.title}>
						<Header2 value='Filters' />
					</div>
					<button onClick={handleToggleMonths} className={styles.monthBtn}>
						Month
						<span className={styles.monthBtnIcon}>
							<FontAwesomeIcon icon='fa-solid fa-chevron-right' />
						</span>
					</button>
					<div className={styles.checkboxContainer}>
						<button className={styles.checkbox}>
							<span className={styles.square}>
								<span className={styles.checkedIcon}>
									<FontAwesomeIcon icon='fa-solid fa-check' />
								</span>
							</span>
						</button>
						<span className={styles.checkboxText}>All months</span>
					</div>
				</div>

				{/* MONTHS */}

				<div className={`${styles.box} ${isMonthsOpen && styles.openFilters}`}>
					<CloseButton value={openFilters} />
					<button onClick={handleToggleMonths} className={styles.backArrow}>
						<FontAwesomeIcon icon='fa-solid fa-reply' />
					</button>
					<div className={styles.title}>
						<Header2 value='Months' />
					</div>
					<div className={styles.monthsWrapper}>
						<button
							onClick={() => {
								changeMonthCheck('january');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.january && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.january && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>January</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('february');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.february && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.february && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>February</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('march');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.march && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.march && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>March</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('april');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.april && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.april && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>April</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('may');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.may && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.may && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>May</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('june');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.june && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.june && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>June</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('july');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.july && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.july && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>July</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('august');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.august && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.august && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>August</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('september');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.september && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.september && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>September</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('october');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.october && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.october && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>October</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('november');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.november && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.november && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>November</span>
						</button>
						<button
							onClick={() => {
								changeMonthCheck('december');
							}}
							className={`${styles.checkboxContainer} ${
								checkedMonths.december && styles.checkedContainer
							}`}>
							<span className={styles.checkbox}>
								<span
									className={`${styles.square} ${
										checkedMonths.december && styles.checked
									}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>December</span>
						</button>
					</div>
				</div>
			</div>

			<div className={`${styles.bg} ${isOpen && styles.blur}`}></div>
		</>
	);
}
