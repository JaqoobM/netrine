import styles from './TransactionsList.module.scss';
import React, { useState, useRef, use, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TransactionsContext } from '../../../layouts/AppLayout/AppLayout';
import { ToggleModalContext } from '../../../layouts/AppLayout/AppLayout';

export default function TransactionsList() {
	const [transactions, setTransactions] = useState([]);
	const [amountSum, setAmountSum] = useState({});
	const [monthlyTotal, setMonthlyTotal] = useState({});

	const transactionsContext = use(TransactionsContext);
	const toggleModalContext = use(ToggleModalContext);

	useEffect(() => {
		const sortTransactionsHandler = (transactions, sortType) => {
			let sortedTransactions;

			if (sortType === 'newest') {
				sortedTransactions = [...transactions].sort((a, b) => {
					const dateA = new Date(a.date);
					const dateB = new Date(b.date);
					return dateB - dateA;
				});
			} else if (sortType === 'oldest') {
				sortedTransactions = [...transactions].sort((a, b) => {
					const dateA = new Date(a.date);
					const dateB = new Date(b.date);
					return dateA - dateB;
				});
			}
			setTransactions(sortedTransactions);
		};

		const dayBalanceCalculation = () => {
			const dates = [];
			const amountSum = {};

			transactionsContext.list.forEach((transaction) => {
				if (!dates.includes(transaction.date)) {
					dates.push(transaction.date);
				}
			});

			dates.forEach((date) => {
				const newDate = transactionsContext.list.filter(
					(transaction) => transaction.date === date
				);

				let income = 0;
				let cost = 0;

				newDate.forEach((transaction) => {
					if (transaction.type === 'income') {
						income += Number(transaction.amount);
					} else {
						cost += Number(transaction.amount);
					}
				});

				amountSum[date] = {
					income,
					cost,
				};
			});
			setAmountSum(amountSum);
		};

		const monthBalanceCalculation = () => {
			const months = [];
			const monthlyTotal = {};

			transactionsContext.list.forEach((transaction) => {
				if (!months.includes(transaction.date.split('-')[1])) {
					months.push(transaction.date.split('-')[1]);
				}
			});

			months.forEach((month) => {
				const newDate = transactionsContext.list.filter(
					(transaction) => transaction.date.split('-')[1] === month
				);

				let income = 0;
				let cost = 0;

				newDate.forEach((transaction) => {
					if (transaction.type === 'income') {
						income += Number(transaction.amount);
					} else {
						cost += Number(transaction.amount);
					}
				});

				monthlyTotal[month] = {
					income,
					cost,
				};
			});
			setMonthlyTotal(monthlyTotal);
		};

		monthBalanceCalculation();
		dayBalanceCalculation();
		sortTransactionsHandler(transactionsContext.list, 'newest');
	}, [transactionsContext.list]);

	return (
		<div className={styles.transactions}>
			{transactions.map((transaction) => {
				let isDifferent;
				let isFirst;
				let isBetween;
				let isLast;

				const index = transactions.findIndex((el) => {
					return el === transaction;
				});

				if (
					transactions[index - 1]?.date !== transactions[index]?.date &&
					transactions[index]?.date === transactions[index + 1]?.date
				) {
					isDifferent = true;
					isFirst = true;
				} else if (
					transactions[index - 1]?.date !== transactions[index]?.date
				) {
					isDifferent = true;
				} else if (
					transactions[index - 1]?.date === transactions[index + 1]?.date
				) {
					isBetween = true;
				} else if (
					transactions[index]?.date !== transactions[index + 1]?.date
				) {
					isLast = true;
				}

				const month = transaction.date.split('-');

				const months = {
					'01': 'January',
					'02': 'February',
					'03': 'March',
					'04': 'April',
					'05': 'May',
					'06': 'June',
					'07': 'July',
					'08': 'August',
					'09': 'September',
					10: 'October',
					11: 'November',
					12: 'December',
				};

				let isNewMonth = false;

				if (
					transactions[index - 1]?.date.split('-')[1] !=
					transactions[index]?.date.split('-')[1]
				) {
					isNewMonth = true;
				} else {
					isNewMonth = false;
				}

				return (
					<React.Fragment key={transaction._id || transaction.customId}>
						{transaction === transactions[0] || isDifferent ? (
							<>
								{isNewMonth && (
									<div className={styles.topBarMonth}>
										<span className={styles.dateMonth}>{months[month[1]]}</span>

										<div className={styles.amountContainer}>
											<div
												className={`${styles.incomeBox} ${styles.amountBoxes}`}>
												<span
													className={`${styles.incomeIcon} ${styles.amountIcons}`}>
													<FontAwesomeIcon icon='fa-solid fa-caret-up' />
												</span>

												<span
													className={`${styles.incomeText} ${styles.amountTexts}`}>
													{monthlyTotal[transaction.date.split('-')[1]].income}
												</span>
											</div>

											<div
												className={`${styles.costBox} ${styles.amountBoxes}`}>
												<span
													className={`${styles.costIcon} ${styles.amountIcons}`}>
													<FontAwesomeIcon icon='fa-solid fa-caret-down' />
												</span>

												<span
													className={`${styles.costText} ${styles.amountTexts}`}>
													{monthlyTotal[transaction.date.split('-')[1]].cost}
												</span>
											</div>
										</div>
									</div>
								)}

								<div className={styles.topBar}>
									<span className={styles.date}>
										{transaction.date?.split('-').reverse().join('.')}
									</span>

									<div className={styles.amountContainer}>
										<div
											className={`${styles.incomeBox} ${styles.amountBoxes}`}>
											<span
												className={`${styles.incomeIcon} ${styles.amountIcons}`}>
												<FontAwesomeIcon icon='fa-solid fa-caret-up' />
											</span>

											<span
												className={`${styles.incomeText} ${styles.amountTexts}`}>
												{amountSum[transaction.date].income}
											</span>
										</div>

										<div className={`${styles.costBox} ${styles.amountBoxes}`}>
											<span
												className={`${styles.costIcon} ${styles.amountIcons}`}>
												<FontAwesomeIcon icon='fa-solid fa-caret-down' />
											</span>

											<span
												className={`${styles.costText} ${styles.amountTexts}`}>
												{amountSum[transaction.date].cost}
											</span>
										</div>
									</div>
								</div>

								<div
									onClick={(e) => {
										toggleModalContext(e.target.closest('[id]').id);
									}}
									className={`${styles.transaction} ${
										isFirst ? styles.transactionFirstBorder : ''
									}`}
									id={transaction._id || transaction.customId}>
									<span className={styles.iconBg}>
										<span className={styles.icon}>
											<FontAwesomeIcon icon={faCartShopping} />
										</span>
									</span>

									<div className={styles.titleContainer}>
										<span className={styles.title}>{transaction.name}</span>
										<span
											className={`${styles.price} ${
												transaction.type === 'cost'
													? styles.redPrice
													: styles.greenPrice
											}`}>
											{transaction.amount}
											<span className={styles.priceEnding}>zł</span>
										</span>
									</div>
								</div>
							</>
						) : (
							<div
								onClick={(e) => {
									toggleModalContext(e.target.closest('[id]').id);
								}}
								className={`${styles.transaction} ${
									isBetween ? styles.transactionBetweenBorder : ''
								} ${isLast ? styles.transactionLastBorder : ''}`}
								id={transaction._id || transaction.customId}>
								<span className={styles.iconBg}>
									<span className={styles.icon}>
										<FontAwesomeIcon icon={faCartShopping} />
									</span>
								</span>

								<div className={styles.titleContainer}>
									<span className={styles.title}>{transaction.name}</span>
									<span
										className={`${styles.price} ${
											transaction.type === 'cost'
												? styles.redPrice
												: styles.greenPrice
										}`}>
										{transaction.amount}
										<span className={styles.priceEnding}>zł</span>
									</span>
								</div>
							</div>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
}
