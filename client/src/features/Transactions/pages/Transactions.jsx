import styles from './Transactions.module.scss';
import TopBar from '../components/TopBar/TopBar.jsx';
import './Transactions.scss';
import { React, use } from 'react';
// import FiltersMobile from '../../../components/FiltersMobile/FiltersMobile.jsx';
// import AddTransactionModal from '../../../components/TransactionModal/TransactionModal.jsx';
// import CategoryModal from '../../../components/Categories/Categories.jsx';
import Navigation from '../../../components/NavMobile/NavMobile.jsx';
import TransactionsList from './TransactionsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
	faEllipsisVertical,
	faMagnifyingGlass,
	faPlus,
	faGear,
	faRightFromBracket,
	faSquareUpRight,
	faList,
	faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { TransactionsContext } from '../../../layouts/AppLayout/AppLayout.jsx';

function Transactions() {
	const settingsBoxRef = useRef(null);
	const [ModalIsOpen, setModalIsOpen] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [addModalIsOpen, setAddModalIsOpen] = useState(false);
	const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
	const [categoryList, setCategoryList] = useState([]);
	const [editedTransaction, setEditedTransaction] = useState([]);
	const transactionsContext = use(TransactionsContext);

	const baseURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const transactions = await axios.get(
					`${baseURL || 'http://localhost:3000'}/api/transactions`
				);

				const transactionsData = transactions.data.map((transaction) => {
					const newTransaction = {
						_id: transaction._id,
						name: transaction.name,
						amount: transaction.amount,
						date: transaction.date?.split('T')[0],
						type: transaction.type,
						customId: transaction.customId,
					};
					return newTransaction;
				});

				transactionsContext.transactionsUpdate(transactionsData);
			} catch (e) {
				console.log(e, 'Nie udało się pobrać');
			}
		};
		fetchTransactions();
	}, []);

	// const addTransactionData = async (newTransaction) => {
	// 	try {
	// 		await axios.post(
	// 			`${baseURL || 'http://localhost:3000'}/api/transactions`,
	// 			{
	// 				name: newTransaction.name,
	// 				amount: newTransaction.amount,
	// 				date: newTransaction.date,
	// 				customId: newTransaction.customId,
	// 			}
	// 		);

	// 		const newTransactions = [...transactions];
	// 		newTransactions.push(newTransaction);

	// 		sortTransactionsHandler(newTransactions, 'newest');
	// 	} catch (e) {
	// 		console.log('Nie udało się wysłać na serwer!', e);
	// 	}
	// };

	// const editTransactionData = async (transaction) => {
	// 	try {
	// 		await axios.put(
	// 			`${baseURL || 'http://localhost:3000'}/api/transactions`,
	// 			{
	// 				_id: transaction._id,
	// 				name: transaction.name,
	// 				amount: transaction.amount,
	// 				date: transaction.date,
	// 				customId: transaction.customId,
	// 			}
	// 		);

	// 		const index = transactions.indexOf(editedTransaction);
	// 		const newTransactions = [...transactions];
	// 		newTransactions[index] = transaction;

	// 		sortTransactionsHandler(newTransactions, 'newest');
	// 	} catch {
	// 		console.log('Nie edytowano');
	// 	}
	// };

	const editTransactionHandler = (_id, customId) => {
		const transaction = transactions.find((transaction) => {
			if (_id) {
				return transaction._id === _id;
			} else {
				return transaction.customId === customId;
			}
		});

		setEditedTransaction(transaction);
	};

	const deleteTransactionData = async () => {
		try {
			await axios.delete(
				`${baseURL || 'http://localhost:3000'}/api/transactions/` +
					(editedTransaction._id || editedTransaction.customId)
			);

			const newTransactions = transactions.filter((transaction) => {
				return editedTransaction._id
					? transaction._id !== editedTransaction._id
					: transaction.customId !== editedTransaction.customId;
			});

			sortTransactionsHandler(newTransactions, 'newest');
		} catch {
			console.log('Nie usunięto transakcji');
		}
	};

	// const categoryHandler = (newCategory) => {
	// 	setCategoryList((prevCategoryList) => [...prevCategoryList, newCategory]);
	// };

	const categoryModalHandler = () => {
		setCategoryModalIsOpen(!categoryModalIsOpen);
	};

	const settingsMenuHandler = () => {
		settingsBoxRef.current.classList.toggle('settings-open');
	};

	const modalHandler = (x) => {
		if (x === 'addModalBtn') {
			setTimeout(() => {
				setModalIsOpen(false);
				setAddModalIsOpen(false);
			}, 100);
		} else if (x === 'addBtn') {
			setModalIsOpen(true);
			setAddModalIsOpen(true);
		} else if (x === 'editBtn') {
			setModalIsOpen(true);
		} else {
			setModalIsOpen(false);
			setAddModalIsOpen(false);
		}
	};

	return (
		<>
			{/* <Navigation /> */}
			{categoryModalIsOpen && (
				<CategoryModal
					categoryModalHandler={categoryModalHandler}
					categoryModalIsOpen={categoryModalIsOpen}
					categoryList={categoryList}
				/>
			)}
			{/* TOP BAR */}
			<TopBar />

			{/* BOTTOM BUTTONS */}
			{/* <div className='transaction-btns'>
				<button
					className='transaction-btns__btn transaction-btns__plan-btn'
					type='button'>
					<div className='transaction-btns__text-box'>
						<span className='transaction-btns__text'>Transakcje</span>
						<span className='transaction-btns__text'>zaplanowane</span>
					</div>
					<span className='transaction-btns__icon'>
						<FontAwesomeIcon icon={faCalendar} />
					</span>
				</button>
				<button
					className='transaction-btns__btn transaction-btns__add-btn'
					type='button'
					onClick={() => {
						modalHandler('addBtn');
					}}>
					<div className='transaction-btns__text-box'>
						<span className='transaction-btns__text'>Dodaj</span>
						<span className='transaction-btns__text'>transakcję</span>
					</div>
					<span className='transaction-btns__icon'>
						<FontAwesomeIcon icon={faPlus} />
					</span>
				</button>
			</div> */}
			{/* <FiltersMobile /> */}

			{/* TRANSACTIONS */}
			<TransactionsList
				editTransactionHandler={editTransactionHandler}
				transactionsList={transactions}
				modalHandler={modalHandler}
			/>
			<div className='page-bg'></div>
		</>
	);
}

export default Transactions;
