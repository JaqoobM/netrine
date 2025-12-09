import NavMobile from '../../components/NavMobile/NavMobile';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import Toast from '../../components/Toast/Toast';
import { Outlet } from 'react-router';
import { useState, createContext, useContext, useEffect } from 'react';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const ToggleModalContext = createContext(null);
export const TransactionsContext = createContext(null);
export const ToastContext = createContext(null);

export default function Applayout() {
	const baseURL = import.meta.env.VITE_API_URL;

	const date = new Date();
	const actualYear = date.getFullYear();
	const actualMonth = date.getMonth() + 1;

	const [allYears, setAllYears] = useState([]);
	const [selectedYears, setYears] = useState([actualYear]);
	const [selectedMonths, setMonths] = useState([actualMonth]);

	const [transactions, setTransactions] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [transactionId, setTransactionId] = useState('');
	const [modalType, setModalType] = useState('');

	const [isSuccessToastActive, setIsSuccessToastActive] = useState(false);
	const [succesToastText, setSuccesToastText] = useState(false);
	const [toastType, setToastType] = useState('success');

	const handleShowToast = (type = 'success', text = 'Success!') => {
		setToastType(type);
		setSuccesToastText(text);
		setIsSuccessToastActive(true);

		setTimeout(() => {
			setIsSuccessToastActive(false);
		}, 3000);
	};

	const transactionsUpdate = (transactionsList) => {
		setTransactions(transactionsList);
	};

	const filteredTransactionsUpdate = (filteredTransactions) => {
		setFilteredTransactions(filteredTransactions);
	};

	const addNewTransaction = (newTransaction) => {
		setFilteredTransactions((prev) => [...prev, newTransaction]);
	};

	const changePeriod = ({
		checkedYears = selectedYears || [actualYear],
		checkedMonths = selectedMonths || [actualMonth],
	}) => {
		const selectedMonthsResult = selectedMonths?.reduce((a, b) => a + b, 0);
		const checkedMonthsResult = checkedMonths.reduce((a, b) => a + b, 0);

		if (
			selectedMonthsResult != checkedMonthsResult &&
			checkedYears?.length > 0 &&
			checkedMonths?.length > 0
		) {
			console.log(checkedYears);
			setMonths(checkedMonths);
		}

		const selectedYearsResult = selectedYears?.reduce((a, b) => a + b, 0);
		const checkedYearsResult = checkedYears.reduce((a, b) => a + b, 0);

		if (
			selectedYearsResult != checkedYearsResult &&
			checkedMonths?.length > 0 &&
			checkedYears?.length > 0
		) {
			setYears(checkedYears);
		}

		// console.log(selectedMonthsResult + checkedMonthsResult);
		// console.log(selectedYearsResult + checkedYearsResult);
		// console.log(selectedYears);
	};

	useEffect(() => {
		const getYearsFromApi = async () => {
			try {
				const response = await axios.get(
					`${baseURL || 'http://localhost:3000'}/api/years`
				);

				if (response.status === 200) {
					setAllYears(response.data);
					return true;
				}
			} catch (error) {}
		};
		getYearsFromApi();
	}, []);

	const parseTransactions = (response) => {
		return response.data.map((transaction) => ({
			_id: transaction._id,
			name: transaction.name,
			amount: transaction.amount,
			date: transaction.date?.split('T')[0],
			type: transaction.type,
		}));
	};

	const getTransactionsFromApi = async () => {
		console.log('fetch');
		try {
			const response = await axios.get(
				`${
					baseURL || 'http://localhost:3000'
				}/api/transactions?year=${selectedYears}&month=${selectedMonths}`
			);

			return response;
		} catch (error) {
			throw new Error('Failed to load transactions. Please try again later');
		}
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await getTransactionsFromApi();
				const parsedTransactions = parseTransactions(response);
				filteredTransactionsUpdate(parsedTransactions);
			} catch (error) {}
		};
		fetchTransactions();
	}, [selectedMonths, selectedYears]);

	const addTransactionData = async (newTransaction) => {
		try {
			const response = await axios.post(
				`${baseURL || 'http://localhost:3000'}/api/transactions`,
				newTransaction
			);
			if (response.status === 201) {
				return response.data;
			}
			return false;
		} catch (error) {
			throw new Error('An unexpected error occurred. Please try again later.');
		}
	};

	const createTransaction = async (newTransaction) => {
		try {
			const response = await addTransactionData(newTransaction);
			response.date = response.date.split('T')[0];

			if (!allYears.includes(response.date.split('-')[0])) {
				setAllYears((prev) => [...prev, response.date.split('-')[0]]);
			}

			addNewTransaction(response);
		} catch (error) {
			handleShowToast('error', error.message);
		}
	};

	const deleteTransactionData = async () => {
		try {
			const response = await axios.delete(
				`${baseURL || 'http://localhost:3000'}/api/transactions/` +
					transactionId
			);

			if (response.status === 200) {
				const transactions = filteredTransactions.filter(
					(transaction) => transaction._id != transactionId
				);

				filteredTransactionsUpdate(transactions);
				return true;
			}
		} catch (error) {
			if (error.response.status === 404) {
				throw new Error(
					'We couldn’t find this transaction. It may have been removed already'
				);
			} else {
				throw new Error(
					'An unexpected error occurred. Please try again later.'
				);
			}
		}
	};

	const editTransactionData = async (editedTransaction) => {
		try {
			const response = await axios.put(
				`${baseURL || 'http://localhost:3000'}/api/transactions`,
				editedTransaction
			);

			if (response.status === 200) {
				return response.data;
			}

			return false;
		} catch (error) {
			throw new Error('An unexpected error occurred. Please try again later.');
		}
	};

	const editTransaction = async ({
		inputValue = '',
		amountValue = '',
		dateValue = '',
		type = 'cost',
	}) => {
		let editedTransaction = filteredTransactions.find(
			(transaction) => transaction._id === transactionId
		);

		editedTransaction = { ...editedTransaction };

		editedTransaction.name = inputValue;
		editedTransaction.amount = amountValue;
		editedTransaction.date = dateValue;
		editedTransaction.type = type;

		try {
			const response = await editTransactionData(editedTransaction);

			if (response) {
				const updatedTransactions = filteredTransactions.map((obj) =>
					obj._id === transactionId
						? { ...response, date: response.date.split('T')[0] }
						: obj
				);
				handleShowToast('success', 'Edited transaction!');
				filteredTransactionsUpdate(updatedTransactions);
			}
		} catch (error) {
			handleShowToast('error', error.message);
		}
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleToggleModal = (id = null) => {
		setIsModalOpen((prev) => !prev);
		setModalType('add');
		setTransactionId('');

		if (id) {
			setTransactionId(id);
			setModalType('edit/delete');
		}
	};

	return (
		<>
			<Toast
				isActive={isSuccessToastActive}
				text={succesToastText}
				toastType={toastType}
			/>
			<ToastContext
				value={{
					showSuccessToast: handleShowToast,
				}}>
				<ToggleModalContext value={handleToggleModal}>
					<TransactionsContext
						value={{
							addNewTransaction,
							list: transactions,
							transactionsUpdate,
							filteredList: filteredTransactions,
							filteredTransactionsUpdate,
							changePeriod,
							allYears,
						}}>
						<TransactionModal
							isModalOpen={isModalOpen}
							transactionId={transactionId}
							modalType={modalType}
							createTransaction={createTransaction}
							editTransaction={editTransaction}
							deleteTransactionData={deleteTransactionData}
						/>

						<main>
							<Outlet />
						</main>
						<NavMobile toggleModal={handleToggleModal} />
					</TransactionsContext>
				</ToggleModalContext>
			</ToastContext>
		</>
	);
}
