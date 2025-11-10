import styles from './Transactions.module.scss';
import TopBar from '../components/TopBar/TopBar.jsx';
import './Transactions.scss';
import { React, use } from 'react';
// import FiltersMobile from '../../../components/FiltersMobile/FiltersMobile.jsx';
// import AddTransactionModal from '../../../components/TransactionModal/TransactionModal.jsx';
// import CategoryModal from '../../../components/Categories/Categories.jsx';
import TransactionsList from './TransactionsList';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { TransactionsContext } from '../../../layouts/AppLayout/AppLayout.jsx';
import Filters from '../components/Filters.jsx';

function Transactions() {
	const settingsBoxRef = useRef(null);
	// const [ModalIsOpen, setModalIsOpen] = useState(false);
	const [transactions, setTransactions] = useState([]);
	// const [addModalIsOpen, setAddModalIsOpen] = useState(false);
	const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
	const [categoryList, setCategoryList] = useState([]);
	// const [editedTransaction, setEditedTransaction] = useState([]);
	const transactionsContext = use(TransactionsContext);

	const baseURL = import.meta.env.VITE_API_URL;

	const getTransactionsFromApi = async () => {
		try {
			const response = await axios.get(
				`${baseURL || 'http://localhost:3000'}/api/transactions`
			);
			return response;
		} catch (error) {
			throw new Error('Failed to load transactions. Please try again later');
		}
	};

	const parseTransactions = (response) => {
		return response.data.map((transaction) => ({
			_id: transaction._id,
			name: transaction.name,
			amount: transaction.amount,
			date: transaction.date?.split('T')[0],
			type: transaction.type,
			customId: transaction.customId,
		}));
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await getTransactionsFromApi();
				const parsedTransactions = parseTransactions(response);
				transactionsContext.transactionsUpdate(parsedTransactions);
			} catch (error) {}
		};
		fetchTransactions();
	}, []);

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

	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const handleToggleFilters = () => {
		setIsFiltersOpen(!isFiltersOpen);
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
			<TopBar openFilters={handleToggleFilters} />
			<Filters openFilters={handleToggleFilters} isOpen={isFiltersOpen} />
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
				// editTransactionHandler={editTransactionHandler}
				transactionsList={transactions}
				modalHandler={modalHandler}
			/>
			<div className='page-bg'></div>
		</>
	);
}

export default Transactions;
