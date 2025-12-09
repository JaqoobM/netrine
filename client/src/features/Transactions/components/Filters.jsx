import styles from './Filters.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseButton from '../../../components/CloseButton/CloseButton';
import Header2 from '../../../components/Header2/Header2';
import { useEffect, useState, use } from 'react';
import { TransactionsContext } from '../../../layouts/AppLayout/AppLayout';

export default function Filters({ isOpen = false, openFilters = () => {} }) {
	const transactionsContext = use(TransactionsContext);
	const date = new Date();
	const actualYear = date.getFullYear();
	const actualMonth = date.getMonth() + 1;

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
	// To do useEffect i warunek, że mają być obje rzeczy przed wysłaniem
	// const changePeriod = ({ years = [], months = [] }) => {
	// 	let checkedYears = [];
	// 	let checkedMonths = [];

	// 	if (years.length > 0) {
	// 		checkedYears = years
	// 			.filter((obj) => obj.isChecked === true)
	// 			.map((obj) => obj.year);

	// 		transactionsContext.changePeriod({ checkedYears });
	// 	}

	// 	if (months.length > 0) {
	// 		checkedMonths = months
	// 			.filter((obj) => obj.isChecked === true)
	// 			.map((obj) => obj.monthNumber);

	// 		transactionsContext.changePeriod({ checkedMonths });
	// 	}
	// };

	useEffect(() => {
		let checkedYears = [];
		let checkedMonths = [];

		checkedYears = years
			.filter((obj) => obj.isChecked === true)
			.map((obj) => obj.year);

		checkedMonths = months
			.filter((obj) => obj.isChecked === true)
			.map((obj) => obj.monthNumber);

		if (checkedMonths.length > 0 && checkedYears > 0) {
			transactionsContext.changePeriod({ checkedYears, checkedMonths });
		}
	}, [years, months]);

	const changeYears = () => {
		let newYears = [];
		const index = transactionsContext.allYears.length - 1;
		const yearsArr = years.map((obj) => obj.year);

		const compare = (a, b) => {
			return Number(b.year) - Number(a.year);
		};

		if (years.length === 0 || !years.some((obj) => obj.isChecked === true)) {
			newYears = transactionsContext.allYears.map((year) => ({
				year,
				isChecked: year === actualYear ? true : false,
			}));
		} else if (!yearsArr.includes(transactionsContext.allYears[index])) {
			const newYear = {
				year: transactionsContext.allYears[index],
				isChecked: false,
			};

			newYears = [...years];
			newYears.push(newYear);
		}

		if (newYears.length > 0) {
			newYears.sort(compare);
			setYears(newYears);
		}
	};

	const monthsContainerHeightCalculation = () => {
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

	const changeYearToCurrent = () => {
		
	};

	const changeMonthToCurrent = () => {
		if (!months.some((obj) => obj.isChecked === true) && isOpen) {
			setMonths((prev) =>
				prev.map((obj, i) =>
					i === actualMonth ? { ...obj, isChecked: true } : obj
				)
			);
		} else if (!isOpen) {
			const newMonths = months.map((obj, i) =>
				i === actualMonth ? { ...obj, isChecked: true } : obj
			);

			setMonths(newMonths);
		}
	};

	const bodyScroll = () => {
		if (isOpen) {
			document.body.classList.add(styles.noScroll);
		} else {
			document.body.classList.remove(styles.noScroll);
		}
	};

	const toggleMonths = () => {
		monthsContainerHeightCalculation();

		if (isOpen) {
			setIsMonthsOpen(false);
		}

		if (isOpen) {
			document.querySelector(`.${styles.scrollBox}`).scrollTop = 0;
		}
	};

	useEffect(() => {
		changeYears();
	}, [transactionsContext.allYears]);

	useEffect(() => {
		toggleMonths();
		changeMonthToCurrent();
		changeYears();
		bodyScroll();
	}, [isOpen]);

	const handleChangeMonthCheck = (month) => {
		const newMonths = months.map((obj) =>
			obj.month === month ? { ...obj, isChecked: !obj.isChecked } : obj
		);

		setMonths(newMonths);
	};

	const handleChangeYearCheck = (year) => {
		const newYears = years.map((obj) =>
			obj.year === year ? { ...obj, isChecked: !obj.isChecked } : obj
		);

		setYears(newYears);
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
							monthsContainerHeightCalculation();
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
