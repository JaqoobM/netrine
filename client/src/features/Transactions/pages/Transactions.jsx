import styles from './Transactions.module.scss';
import TopBar from '../components/TopBar/TopBar.jsx';
import './Transactions.scss';
import React from 'react';
// import FiltersMobile from '../../../components/FiltersMobile/FiltersMobile.jsx';
// import AddTransactionModal from '../../../components/TransactionModal/TransactionModal.jsx';
// import CategoryModal from '../../../components/Categories/Categories.jsx';
import Navigation from '../../../components/NavMobile/NavMobile.jsx';
import TransactionsList from './TransactionsList.jsx';
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

function Transactions() {
	const settingsBoxRef = useRef(null);

	const [ModalIsOpen, setModalIsOpen] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [addModalIsOpen, setAddModalIsOpen] = useState(false);
	const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
	const [categoryList, setCategoryList] = useState([]);
	const [editedTransaction, setEditedTransaction] = useState([]);

	const baseURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const transactions = await axios.get(
					`${baseURL || 'http://localhost:5173'}/api/transactions`
				);

				const transactionData = transactions.data.map((transaction) => {
					const newTransaction = {
						_id: transaction._id,
						name: transaction.name,
						amount: transaction.amount,
						date: transaction.date.split('T')[0],
						customId: transaction.customId,
					};
					return newTransaction;
				});

				setTransactions(transactionData);
			} catch (e) {
				console.log(e, 'Nie udało się pobrać');
			}
		};

		fetchTransactions();
	}, []);

	// useEffect(() => {
	// 	const fetchHistoricalWeather = async () => {
	// 		const url = 'https://api.open-meteo.com/v1/forecast';

	// 		const latitude = 51.8135;
	// 		const longitude = 16.2753;
	// 		const timezone = 'Europe/Berlin'; // Berlin = Warsaw czasowo
	// 		const startHour = 16;
	// 		const pastDays = 14;

	// 		// Tworzymy daty ostatnich 14 dni w formacie YYYY-MM-DD
	// 		const dates = [];
	// 		const today = new Date();
	// 		for (let i = 0; i < pastDays; i++) {
	// 			const d = new Date(today);
	// 			d.setDate(today.getDate() - i);
	// 			dates.push(d.toISOString().slice(0, 10));
	// 		}

	// 		try {
	// 			// Pobieramy wszystkie dane w jednym zapytaniu
	// 			const params = {
	// 				latitude,
	// 				longitude,
	// 				hourly: 'temperature_2m,relativehumidity_2m,windspeed_10m',
	// 				timezone,
	// 				start_date: dates[dates.length - 1], // najstarsza data
	// 				end_date: dates[0], // najnowsza data
	// 			};

	// 			const response = await axios.get(url, { params });
	// 			const data = response.data;

	// 			const { time, temperature_2m, relativehumidity_2m, windspeed_10m } =
	// 				data.hourly;

	// 			// Tworzymy tablicę obiektów godzinowych
	// 			const combined = time.map((t, i) => ({
	// 				time: t,
	// 				temperature: temperature_2m[i],
	// 				humidity: relativehumidity_2m[i],
	// 				windspeed: windspeed_10m[i],
	// 			}));

	// 			dates.forEach((dateStr) => {
	// 				// Znalezienie godziny 16:00 dla tej daty
	// 				const startIndex = combined.findIndex(
	// 					(item) =>
	// 						item.time.startsWith(dateStr) && item.time.endsWith('T16:00')
	// 				);

	// 				if (startIndex === -1 || startIndex + 24 > combined.length) {
	// 					console.log(
	// 						`Nie można policzyć średniej dla ${dateStr}, brak danych.`
	// 					);
	// 					return;
	// 				}

	// 				const next24Hours = combined.slice(startIndex, startIndex + 24);

	// 				const avgTemp =
	// 					next24Hours.reduce((sum, item) => sum + item.temperature, 0) /
	// 					next24Hours.length;
	// 				const avgHumidity =
	// 					next24Hours.reduce((sum, item) => sum + item.humidity, 0) /
	// 					next24Hours.length;
	// 				const avgWind =
	// 					next24Hours.reduce((sum, item) => sum + item.windspeed, 0) /
	// 					next24Hours.length;

	// 				// Wyświetlamy daty godzin w tej 24h sekwencji
	// 				console.log(
	// 					`Średnia 24h od godziny 16:00 dla ${dateStr}: (${next24Hours[0].time} → ${next24Hours[23].time})`
	// 				);
	// 				console.log(`Temperatura: ${avgTemp.toFixed(2)}°C`);
	// 				console.log(`Wilgotność: ${avgHumidity.toFixed(2)}%`);
	// 				console.log(`Wiatr: ${avgWind.toFixed(2)} km/h`);
	// 			});
	// 		} catch (error) {
	// 			console.log('Nie pobrano danych:', error.message);
	// 		}
	// 	};

	// 	fetchHistoricalWeather();
	// }, []);

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

	const addTransactionData = async (newTransaction) => {
		try {
			await axios.post(
				`${baseURL || 'http://localhost:3000'}/api/transactions`,
				{
					name: newTransaction.name,
					amount: newTransaction.amount,
					date: newTransaction.date,
					customId: newTransaction.customId,
				}
			);

			const newTransactions = [...transactions];
			newTransactions.push(newTransaction);

			sortTransactionsHandler(newTransactions, 'newest');
		} catch (e) {
			console.log('Nie udało się wysłać na serwer!', e);
		}
	};

	const editTransactionData = async (transaction) => {
		try {
			await axios.put(
				`${baseURL || 'http://localhost:3000'}/api/transactions`,
				{
					_id: transaction._id,
					name: transaction.name,
					amount: transaction.amount,
					date: transaction.date,
					customId: transaction.customId,
				}
			);

			const index = transactions.indexOf(editedTransaction);
			const newTransactions = [...transactions];
			newTransactions[index] = transaction;

			sortTransactionsHandler(newTransactions, 'newest');
		} catch {
			console.log('Nie edytowano');
		}
	};

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
			<div className='transaction-btns'>
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
			</div>
			{/* <FiltersMobile /> */}

			{/* TRANSACTIONS */}
			<TransactionsList
				editTransactionHandler={editTransactionHandler}
				transactions={transactions}
				modalHandler={modalHandler}
			/>
			<div className='page-bg'></div>
		</>
	);
}

export default Transactions;
