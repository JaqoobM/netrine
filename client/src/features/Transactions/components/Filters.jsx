import styles from './Filters.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseButton from '../../../components/CloseButton/CloseButton';
import Header2 from '../../../components/Header2/Header2';
import { useEffect, useState, use } from 'react';
import { TransactionsContext } from '../../../layouts/AppLayout/AppLayout';

export default function Filters({
	isOpen = false,
	openFilters = () => {},
	fetchTransactions = () => {},
	allYears = [],
	getYearsFromApi = () => {},
}) {
	const [isMonthsOpen, setIsMonthsOpen] = useState(false);
	const [years, setYears] = useState([]);
	const [months, setMonths] = useState([
		{ month: 'all months', monthNumber: 0, isChecked: false },
		{ month: 'january', monthNumber: 1, isChecked: false },
		{ month: 'february', monthNumber: 2, isChecked: false },
		{ month: 'march', monthNumber: 3, isChecked: false },
		{ month: 'april', monthNumber: 4, isChecked: false },
		{ month: 'may', monthNumber: 5, isChecked: false },
		{ month: 'june', monthNumber: 6, isChecked: false },
		{ month: 'july', monthNumber: 7, isChecked: false },
		{ month: 'august', monthNumber: 8, isChecked: false },
		{ month: 'september', monthNumber: 9, isChecked: false },
		{ month: 'october', monthNumber: 10, isChecked: false },
		{ month: 'november', monthNumber: 11, isChecked: false },
		{ month: 'december', monthNumber: 12, isChecked: false },
	]);

	const transactionsContext = use(TransactionsContext);
	const date = new Date();
	const actualYear = date.getFullYear();
	const actualMonth = date.getMonth() + 1;

	useEffect(() => {
		const checkedYears = years
			.filter((obj) => obj.isChecked === true)
			.map((obj) => obj.year);

		const checkedMonths = months
			.filter((obj) => obj.isChecked === true)
			.map((obj) => obj.monthNumber);

		if (checkedYears.length > 0 && checkedMonths.length > 0) {
			fetchTransactions(checkedYears, checkedMonths);
			// getYearsFromApi();
		}
	}, [months, years]);

	useEffect(() => {
		const getYears = () => {
			let newYears = [
				{
					year: actualYear,
					isChecked: true,
				},
			];

			allYears.forEach((year) => {
				if (!newYears.some((obj) => obj.year === year)) {
					newYears.push({
						year,
						isChecked: false,
					});
				}
			});

			setYears(newYears);
		};

		getYears();
	}, [allYears]);

	const handleMothsContainerHeight = () => {
		let checkedElements = 0;
		let elements = 0;

		months.forEach((obj) => {
			if (obj.isChecked === true) {
				checkedElements += 1;
				elements += 1;
			} else {
				elements += 1;
			}
		});

		// const yearsArr = getYears();

		years.forEach((obj) => {
			if (obj.isChecked === true) {
				checkedElements += 1;
				elements += 1;
			} else {
				elements += 1;
			}
		});

		if (isMonthsOpen && isOpen) {
			document.querySelector('#monthsContainer').style.height = `${
				checkedElements * 4.8 + 1 + 4.8 + 2
			}rem`;
		} else {
			document.querySelector('#monthsContainer').style.height = `${
				elements * 4.8 + 1 + 4.8 + 2
			}rem`;
		}
	};

	const handleToggleMonths = () => {
		setIsMonthsOpen(!isMonthsOpen);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add(styles.noScroll);
		} else {
			document.body.classList.remove(styles.noScroll);
		}

		handleMothsContainerHeight();

		if (isOpen) {
			setIsMonthsOpen(false);
		}

		if (isOpen) {
			document.querySelector(`.${styles.scrollBox}`).scrollTop = 0;
		}
	}, [isOpen]);

	useEffect(() => {
		setMonths((prev) =>
			prev.map((obj, i) =>
				i === actualMonth ? { ...obj, isChecked: true } : obj
			)
		);
	}, []);

	const handleChangeMonthCheck = (month) => {
		setMonths((prev) =>
			prev.map((obj) =>
				obj.month === month ? { ...obj, isChecked: !obj.isChecked } : obj
			)
		);
	};

	const handleChangeYearCheck = (year) => {
		setYears((prev) =>
			prev.map((obj) =>
				obj.year === year ? { ...obj, isChecked: !obj.isChecked } : obj
			)
		);
	};

	return (
		<>
			{/* FILTERS */}
			<div className={`${styles.box} ${isOpen && styles.openFilters}`}>
				<CloseButton value={openFilters} />
				<div className={styles.title}>
					<Header2 value='Filters' />
				</div>
				<div className={styles.scrollBox}>
					<button
						onClick={() => {
							handleToggleMonths();
							handleMothsContainerHeight();
						}}
						className={styles.monthBtn}>
						Period
						<span
							className={`${styles.monthBtnIcon} ${
								isMonthsOpen && styles.monthBtnIconActive
							}`}>
							<FontAwesomeIcon icon='fa-solid fa-chevron-up' />
						</span>
					</button>
					<div
						className={`${styles.monthsContainer} ${
							isMonthsOpen && styles.monthsOpen
						}`}
						id='monthsContainer'>
						<span
							className={`${styles.periodTitles} ${styles.periodYearsTitle}`}>
							Years
						</span>
						{years.map((obj) => {
							return (
								<button
									key={obj.year}
									onClick={() => {
										handleChangeYearCheck(obj.year);
									}}
									className={`${styles.checkboxContainer} ${
										obj.isChecked && styles.checkedContainer
									} ${
										!isMonthsOpen &&
										obj.isChecked === false &&
										styles.monthsClose
									}`}>
									<span className={styles.checkbox}>
										<span
											className={`${styles.square} ${
												obj.isChecked && styles.checked
											}`}>
											<span className={styles.checkedIcon}>
												<FontAwesomeIcon icon='fa-solid fa-check' />
											</span>
										</span>
									</span>
									<span className={styles.checkboxText}>{obj.year}</span>
								</button>
							);
						})}
						<span
							className={`${styles.periodTitles} ${styles.periodMonthsTitle}`}>
							Months
						</span>
						{months.map((obj) => {
							return (
								<button
									key={obj.month}
									onClick={() => {
										handleChangeMonthCheck(obj.month);
									}}
									className={`${styles.checkboxContainer} ${
										obj.isChecked && styles.checkedContainer
									} ${
										!isMonthsOpen &&
										obj.isChecked === false &&
										styles.monthsClose
									}`}>
									<span className={styles.checkbox}>
										<span
											className={`${styles.square} ${
												obj.isChecked && styles.checked
											}`}>
											<span className={styles.checkedIcon}>
												<FontAwesomeIcon icon='fa-solid fa-check' />
											</span>
										</span>
									</span>
									<span className={styles.checkboxText}>{obj.month}</span>
								</button>
							);
						})}
					</div>
					<button className={styles.monthBtn}>
						Wallets
						<span
							className={`${styles.monthBtnIcon} ${
								isMonthsOpen && styles.monthBtnIconActive
							}`}>
							<FontAwesomeIcon icon='fa-solid fa-chevron-up' />
						</span>
					</button>
					<div className={`${styles.monthsContainer}`} id='monthsContainer'>
						<button
							onClick={() => {
								changeMonthCheck('all');
							}}
							className={`${styles.checkboxContainer} ${styles.checkedContainer}`}>
							<span className={styles.checkbox}>
								<span className={`${styles.square} ${styles.checked}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>Main wallet</span>
						</button>
					</div>
					<button className={styles.monthBtn}>
						Categories
						<span
							className={`${styles.monthBtnIcon} ${
								isMonthsOpen && styles.monthBtnIconActive
							}`}>
							<FontAwesomeIcon icon='fa-solid fa-chevron-up' />
						</span>
					</button>
					<div className={`${styles.monthsContainer}`} id='monthsContainer'>
						<button
							onClick={() => {
								changeMonthCheck('all');
							}}
							className={`${styles.checkboxContainer} ${styles.checkedContainer}`}>
							<span className={styles.checkbox}>
								<span className={`${styles.square} ${styles.checked}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>All categories</span>
						</button>
					</div>
					<button className={`${styles.monthBtn} ${styles.tags}`}>
						Tags
						<span
							className={`${styles.monthBtnIcon} ${
								isMonthsOpen && styles.monthBtnIconActive
							}`}>
							<FontAwesomeIcon icon='fa-solid fa-chevron-up' />
						</span>
					</button>
					<div className={`${styles.monthsContainer}`} id='monthsContainer'>
						<button
							onClick={() => {
								changeMonthCheck('all');
							}}
							className={`${styles.checkboxContainer} ${styles.checkedContainer}`}>
							<span className={styles.checkbox}>
								<span className={`${styles.square} ${styles.checked}`}>
									<span className={styles.checkedIcon}>
										<FontAwesomeIcon icon='fa-solid fa-check' />
									</span>
								</span>
							</span>
							<span className={styles.checkboxText}>All tags</span>
						</button>
					</div>
				</div>
				<div className={styles.bottomBar}>
					<button className={styles.saveBtn} disabled>
						Save
					</button>
				</div>
			</div>

			<div className={`${styles.bg} ${isOpen && styles.blur}`}></div>
		</>
	);
}
