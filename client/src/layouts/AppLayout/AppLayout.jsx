import NavMobile from '../../components/NavMobile/NavMobile';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import { Outlet } from 'react-router';
import { useState, createContext, useContext } from 'react';
import Toast from '../../components/Toast/Toast';

export const ModalContext = createContext(null);

export default function Applayout() {
	const [isActive, setIsActive] = useState(false);

	const modalActivating = () => {
		setIsActive((prev) => !prev);
	};

	return (
		<>
			<Toast />
			<ModalContext value={modalActivating}>
				<TransactionModal isModalOpen={isActive} />
				<main>
					<Outlet />
				</main>
				<NavMobile modalActivating={modalActivating} />
			</ModalContext>
		</>
	);
}
