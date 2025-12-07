import styles from './wallets.module.scss';
import AddWallet from '../components/AddWalletModal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Wallets() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState('add');

	const handleToggleModal = (modalType = 'add') => {
		setIsModalOpen((prev) => !prev);

		if (modalType === 'add') {
			setModalType('add');
		} else {
			setModalType('edit/delete');
		}
	};

	return (
		<>
			<AddWallet
				isModalOpen={isModalOpen}
				toggleModal={handleToggleModal}
				modalType={modalType}
			/>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<button
						onClick={() => handleToggleModal('edit/delete')}
						type='button'
						className={styles.settingsIcon}>
						<FontAwesomeIcon icon='fa-solid fa-pen-to-square' />
					</button>
					<div className={styles.nameContainer}>
						<span className={styles.name}>Default wallet</span>
					</div>
					<div className={styles.balanceBox}>
						<span className={styles.balanceIcon}>
							<FontAwesomeIcon icon='fa-solid fa-sack-dollar' />
						</span>
						<div className={styles.amountbox}>
							<span className={styles.leftCurrency}>$</span>
							<span className={styles.balance}>34 000</span>
						</div>
					</div>
					<div className={styles.statsContainer}>
						<div className={styles.incomeBox}>
							<span className={styles.incomeIcon}>
								<FontAwesomeIcon icon='fa-solid fa-caret-up' />
							</span>
							<div className={styles.amountBox}>
								<span className={styles.leftCurrency}>$</span>
								<span className={styles.income}>1 010 000</span>
							</div>
						</div>
						<div className={styles.costBox}>
							<span className={styles.costIcon}>
								<FontAwesomeIcon icon='fa-solid fa-caret-down' />
							</span>
							<div className={styles.amountBox}>
								<span className={styles.leftCurrency}>$</span>
								<span className={styles.cost}>76 000</span>
							</div>
						</div>
					</div>
				</div>
				<button
					onClick={() => handleToggleModal('add')}
					type='button'
					className={styles.addBtn}>
					Add wallet
				</button>
			</div>

			<div className={styles.pageBg}></div>
		</>
	);
}
