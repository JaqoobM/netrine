import styles from './Transactions.module.scss';
import TopBar from '../components/TopBar/TopBar.jsx';
import './Transactions.scss';
import { React, use } from 'react';
import TransactionsList from './TransactionsList';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { TransactionsContext } from '../../../layouts/AppLayout/AppLayout.jsx';
import Filters from '../components/Filters.jsx';

function Transactions() {
	const settingsBoxRef = useRef(null);
	const [transactions, setTransactions] = useState([]);
	const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
	const [categoryList, setCategoryList] = useState([]);
	const [allYears, setAllYears] = useState([]);
	const transactionsContext = use(TransactionsContext);

	const baseURL = import.meta.env.VITE_API_URL;

	const getTransactionsFromApi = async (years, months) => {
		try {
			const response = await axios.get(
				`${
					baseURL || 'http://localhost:3000'
				}/api/transactions?year=${years}&month=${months}`
			);

			return response;
		} catch (error) {
			throw new Error('Failed to load transactions. Please try again later');
		}
	};

	useEffect(() => {
		const getYearsFromApi = async () => {
			const response = await axios.get(
				`${baseURL || 'http://localhost:3000'}/api/years`
			);
			setAllYears(response.data);
		};
		getYearsFromApi();
	}, [transactionsContext.filte]);

	// const getYearsFromApi = async () => {
	// 	const response = await axios.get(
	// 		`${baseURL || 'http://localhost:3000'}/api/years`
	// 	);
	// 	setAllYears(response.data);
	// };
	// // getYearsFromApi();

	const parseTransactions = (response) => {
		return response.data.map((transaction) => ({
			_id: transaction._id,
			name: transaction.name,
			amount: transaction.amount,
			date: transaction.date?.split('T')[0],
			type: transaction.type,
		}));
	};

	const fetchTransactions = async (years, months) => {
		try {
			const response = await getTransactionsFromApi(years, months);
			const parsedTransactions = parseTransactions(response);
			transactionsContext.filteredTransactionsUpdate(parsedTransactions);
		} catch (error) {}
	};

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

			<Filters
				openFilters={handleToggleFilters}
				isOpen={isFiltersOpen}
				fetchTransactions={fetchTransactions}
				allYears={allYears}
				// getYearsFromApi={getYearsFromApi}
			/>

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
