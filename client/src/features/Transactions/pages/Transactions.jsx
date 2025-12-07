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

	const [balance, setBalance] = useState({
		cost: 0,
		income: 0,
		result: 0,
	});

	useEffect(() => {
		const allBalanceCalculation = () => {
			let cost = 0;
			let income = 0;

			transactionsContext.filteredList.forEach((transaction) => {
				if (transaction.type === 'cost') {
					cost += Number(transaction.amount);
				} else {
					income += Number(transaction.amount);
				}
			});
			setBalance((prev) => ({ ...prev, cost, income, result: income - cost }));
		};

		allBalanceCalculation();
	}, [transactionsContext.filteredList]);

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
			<TopBar openFilters={handleToggleFilters} balance={balance} />

			<Filters
				openFilters={handleToggleFilters}
				isOpen={isFiltersOpen}
				// fetchTransactions={fetchTransactions}
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
