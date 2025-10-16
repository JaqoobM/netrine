import './TransactionsList.scss';
// import React from 'react';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function TransactionsList(props) {

	const transactions = props.transactions;

	return (
		<div className='transactions'>
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
								<span className='transactions__date'>
									{transaction.date.split('-').reverse().join('.')}
								</span>

								<div
									onClick={() => {
										props.modalHandler('editBtn');
										props.editTransactionHandler(
											transaction._id,
											transaction.customId
										);
									}}
									className={`transactions__transaction ${
										isFirst ? 'transaction-first-border' : ''
									}`}>
									<span className='transactions__icon-bg'>
										<span className='transactions__icon'>
											<FontAwesomeIcon icon={faCartShopping} />
										</span>
									</span>

									<div className='transactions__title-container'>
										<span className='transactions__title'>
											{transaction.name}
										</span>
										<span className='transactions__price'>
											{transaction.amount}
											<span className='transactions__price-ending'>zł</span>
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
								className={`transactions__transaction ${
									isBetween ? 'transaction-between-border' : ''
								} ${isLast ? 'transaction-last-border' : ''}`}>
								<span className='transactions__icon-bg'>
									<span className='transactions__icon'>
										<FontAwesomeIcon icon={faCartShopping} />
									</span>
								</span>

								<div className='transactions__title-container'>
									<span className='transactions__title'>
										{transaction.name}
									</span>
									<span className='transactions__price'>
										{transaction.amount}
										<span className='transactions__price-ending'>zł</span>
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
