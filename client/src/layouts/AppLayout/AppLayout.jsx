import NavMobile from '../../components/NavMobile/NavMobile';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import Toast from '../../components/Toast/Toast';
import { Outlet } from 'react-router';
import {
	useState,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useCallback,
} from 'react';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const ToggleModalContext = createContext(null);
export const TransactionsContext = createContext(null);
export const ToastContext = createContext(null);
export const WalletContext = createContext(null);

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

	const [wallets, setWallets] = useState([]);
	const [walletBalance, setWalletBalance] = useState({});

	const [confirm, setConfirm] = useState(false);

	const handleShowToast = (type = 'success', text = 'Success!') => {
		setIsSuccessToastActive(true);
		setToastType(type);
		setSuccesToastText(text);

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
	};

	const parseTransactions = (response) => {
		return response.map((transaction) => ({
			_id: transaction._id,
			name: transaction.name,
			amount: transaction.amount,
			date: transaction.date?.split('T')[0],
			type: transaction.type,
			walletId: transaction.walletId,
		}));
	};

	const getTransactionsFromApi = async () => {
		try {
			const response = await axios.get(
				`${
					baseURL || 'http://localhost:3000'
				}/api/transactions?year=${selectedYears}&month=${selectedMonths}`,
				{ withCredentials: true }
			);
			return response.data;
		} catch (error) {
			throw new Error('Failed to load transactions. Please try again later');
		}
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await getTransactionsFromApi();

				const transactions = response.transactions;
				const years = response.years;
				const parsedTransactions = parseTransactions(transactions);
				setWalletBalance(response.walletsBallances);
				setAllYears(years);
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
		walletId = '',
	}) => {
		let editedTransaction = filteredTransactions.find(
			(transaction) => transaction._id === transactionId
		);

		editedTransaction = { ...editedTransaction };

		editedTransaction.name = inputValue;
		editedTransaction.amount = amountValue;
		editedTransaction.date = dateValue;
		editedTransaction.type = type;
		editedTransaction.walletId = walletId;

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

	// WALLETS
	const addWallets = (newWallet) => {
		setWallets((prev) => [...prev, ...newWallet]);
	};

	const editWallets = (editedWallet) => {
		const newWallets = wallets.filter(
			(wallet) => wallet._id != editedWallet._id
		);

		newWallets.push(editedWallet);

		setWallets(newWallets);
	};

	// const parseWallets = (wallets) => {
	// 	const newWallets = wallets.map((wallet) => {
	// 		return {
	// 			...wallet,
	// 			name: wallet.name,
	// 			balance: wallet.balance,
	// 			cost: walletsBallances[wallet._id]?.cost
	// 				? walletsBallances[wallet._id]?.cost
	// 				: 0,
	// 			income: walletsBallances[wallet._id]?.income
	// 				? walletsBallances[wallet._id]?.income
	// 				: 0,
	// 		};
	// 	});
	// 	setWallets(newWallets);
	// };

	const fetchWalletsData = async () => {
		try {
			const response = await axios.get(
				`${baseURL || 'http://localhost:3000'}/api/wallets`
			);

			if (response.status === 200) {
				setWallets(response.data);
			}
		} catch (error) {}
	};

	const createWalletData = async (newWallet) => {
		try {
			const response = await axios.post(
				`${baseURL || 'http://localhost:3000'}/api/wallets`,
				newWallet
			);

			if (response.status === 201) {
				return response.data;
			} else {
				return false;
			}
		} catch (error) {}
	};

	const editWalletData = async (editedWallet) => {
		try {
			const response = await axios.put(
				`${baseURL || 'http://localhost:3000'}/api/wallets`,
				editedWallet
			);

			if (response.status === 200) {
				return response.data;
			} else {
				return false;
			}
		} catch (error) {}
	};

	useEffect(() => {
		fetchWalletsData();
	}, []);

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

	const deleteWalletData = async (id) => {
		try {
			const response = await axios.delete(
				`${baseURL || 'http://localhost:3000'}/api/wallets/` + id
			);

			if (response.status === 200) {
				return response.data;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteWallet = (id) => {
		const newWallets = wallets.filter((wallet) => wallet._id != id);
		setWallets(newWallets);
	};

	const navigate = useNavigate();

	useEffect(() => {
		const test = async () => {
			try {
				const response = await axios.get(
					`${baseURL || 'http://localhost:3000'}/api/transactions/me`,
					{ withCredentials: true }
				);
				setConfirm(true);
			} catch (error) {
				navigate('/signin');
			}
		};
		test();
	}, []);

	if (confirm) {
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
							<WalletContext
								value={{
									create: createWalletData,
									add: addWallets,
									editData: editWalletData,
									edit: editWallets,
									delData: deleteWalletData,
									del: deleteWallet,
									wallets,
									walletBalance,
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
							</WalletContext>
						</TransactionsContext>
					</ToggleModalContext>
				</ToastContext>
			</>
		);
	}
}
