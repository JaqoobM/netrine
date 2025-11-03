import styles from './TransactionsList.module.scss';
// import React from 'react';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function TransactionsList({ transactionsList }) {
	const transactions = transactionsList;

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
										{transaction.date.split('-').reverse().join('.')}
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
												1800
											</span>
										</div>

										<div className={`${styles.costBox} ${styles.amountBoxes}`}>
											<span
												className={`${styles.costIcon} ${styles.amountIcons}`}>
												<FontAwesomeIcon icon='fa-solid fa-caret-down' />
											</span>

											<span
												className={`${styles.costText} ${styles.amountTexts}`}>
												800
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
										<span className={styles.price}>
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
									<span className={styles.price}>
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
