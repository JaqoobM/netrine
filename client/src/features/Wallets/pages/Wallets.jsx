import styles from './wallets.module.scss';
import AddWallet from '../components/AddWalletModal';
import React, { useState, use } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	ToastContext,
	WalletContext,
} from '../../../layouts/AppLayout/AppLayout';

export default function Wallets() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState('add');
	const [editedWallet, setEditedWallet] = useState({});

	const [nameValue, setNameValue] = useState('');
	const [balanceValue, setBalanceValue] = useState('');
	const [id, setId] = useState('');

	const walletContext = use(WalletContext);
	const toastContext = use(ToastContext);

	const createWallet = async (newWallet) => {
		try {
			const response = await walletContext.create(newWallet);

			if (response) {
				walletContext.add([response]);
				handleToggleModal('');
				toastContext.showSuccessToast('success', 'Created a new Wallet!');
			}
		} catch (error) {}
	};

	const editWallet = async (editedWallet) => {
		try {
			const response = await walletContext.editData(editedWallet);

			if (response) {
				walletContext.edit(response);
				handleToggleModal('');
				toastContext.showSuccessToast('success', 'Edited wallet!');
			}
		} catch (error) {}
	};

	const handleToggleModal = (
		modalType = 'add',
		nameValue = '',
		balanceValue = '',
		id = ''
	) => {
		setNameValue(nameValue);
		setBalanceValue(balanceValue);
		setId(id);
		setIsModalOpen((prev) => !prev);

		if (modalType === 'add') {
			setModalType('add');
		} else {
			setModalType('edit/delete');
		}
	};

	const onSubmit = (wallet) => {
		if (modalType === 'add') {
			createWallet(wallet);
		} else if (modalType === 'edit/delete') {
			editWallet(wallet);
			console.log(wallet);
		}
	};

	const deleteWallet = async (id) => {
		try {
			const response = await walletContext.delData(id);

			if (response) {
				handleToggleModal('');
				walletContext.del(response);
				toastContext.showSuccessToast('success', 'Deleted wallet!');
			}
		} catch (error) {}
	};

	return (
		<>
			<AddWallet
				isModalOpen={isModalOpen}
				toggleModal={handleToggleModal}
				modalType={modalType}
				onSubmit={onSubmit}
				nameValue={nameValue}
				balanceValue={balanceValue}
				id={id}
				del={deleteWallet}
			/>
			<div className={styles.wrapper}>
				{walletContext.wallets.map((wallet) => {
					return (
						<React.Fragment key={wallet._id}>
							<div className={styles.container}>
								<button
									onClick={() =>
										handleToggleModal(
											'edit/delete',
											wallet.name,
											wallet.balance,
											wallet._id
										)
									}
									type='button'
									className={styles.settingsIcon}>
									<FontAwesomeIcon icon='fa-solid fa-pen-to-square' />
								</button>
								<div className={styles.nameContainer}>
									<span className={styles.name}>{wallet.name}</span>
								</div>
								<div className={styles.balanceBox}>
									<span className={styles.balanceIcon}>
										<FontAwesomeIcon icon='fa-solid fa-sack-dollar' />
									</span>
									<div className={styles.amountbox}>
										<span className={styles.leftCurrency}>$</span>
										<span className={styles.balance}>
											{wallet.balance -
												(walletContext.walletBalance[wallet._id]?.cost
													? walletContext.walletBalance[wallet._id]?.cost
													: 0) +
												(walletContext.walletBalance[wallet._id]?.income
													? walletContext.walletBalance[wallet._id]?.income
													: 0)}
										</span>
									</div>
								</div>
								<div className={styles.statsContainer}>
									<div className={styles.incomeBox}>
										<span className={styles.incomeIcon}>
											<FontAwesomeIcon icon='fa-solid fa-caret-up' />
										</span>
										<div className={styles.amountBox}>
											<span className={styles.leftCurrency}>$</span>
											<span className={styles.income}>
												{walletContext.walletBalance[wallet._id]?.income
													? walletContext.walletBalance[wallet._id]?.income
													: 0}
											</span>
										</div>
									</div>
									<div className={styles.costBox}>
										<span className={styles.costIcon}>
											<FontAwesomeIcon icon='fa-solid fa-caret-down' />
										</span>
										<div className={styles.amountBox}>
											<span className={styles.leftCurrency}>$</span>
											<span className={styles.cost}>
												{walletContext.walletBalance[wallet._id]?.cost
													? walletContext.walletBalance[wallet._id]?.cost
													: 0}
											</span>
										</div>
									</div>
								</div>
							</div>
						</React.Fragment>
					);
				})}
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
