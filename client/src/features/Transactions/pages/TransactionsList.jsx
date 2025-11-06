import styles from './TransactionsList.module.scss';
import React, { useState, useRef, use, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TransactionsContext } from '../../../layouts/AppLayout/AppLayout';

export default function TransactionsList() {
	const [transactions, setTransactions] = useState([]);
	const [amountSum, setAmountSum] = useState({});

	const transactionsContext = use(TransactionsContext);

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

		const balanceCalculation = () => {
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
		balanceCalculation();
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

				return (
					<React.Fragment key={transaction._id || transaction.customId}>
						{transaction === transactions[0] || isDifferent ? (
							<>
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
									onClick={() => {
										props.modalHandler('editBtn');
										props.editTransactionHandler(
											transaction._id,
											transaction.customId
										);
									}}
									className={`${styles.transaction} ${
										isFirst ? styles.transactionFirstBorder : ''
									}`}>
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
								onClick={() => {
									props.modalHandler('editBtn');
									props.editTransactionHandler(
										transaction._id,
										transaction.customId
									);
								}}
								className={`${styles.transaction} ${
									isBetween ? styles.transactionBetweenBorder : ''
								} ${isLast ? styles.transactionLastBorder : ''}`}>
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
