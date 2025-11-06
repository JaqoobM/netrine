import NavMobile from '../../components/NavMobile/NavMobile';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import { Outlet } from 'react-router';
import { useState, createContext, useContext, useEffect } from 'react';
import Toast from '../../components/Toast/Toast';

export const ToggleModalContext = createContext(null);
export const TransactionsContext = createContext(null);

export default function Applayout() {
	const baseURL = import.meta.env.VITE_API_URL;
	const [transactions, setTransactions] = useState([]);

	const updateFromDB = (transactionsList) => {
		setTransactions(transactionsList);
	};

	const addNewTransaction = (newTransaction) => {
		setTransactions((prev) => [...prev, newTransaction]);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	return (
		<>
			<Toast />
			<ToggleModalContext value={handleToggleModal}>
				<TransactionsContext
					value={{
						addNewTransaction,
						list: transactions,
						updateFromDB,
					}}>
					<TransactionModal isModalOpen={isModalOpen} />
					<main>
						<Outlet />
					</main>
					<NavMobile toggleModal={handleToggleModal} />
				</TransactionsContext>
			</ToggleModalContext>
		</>
	);
}
