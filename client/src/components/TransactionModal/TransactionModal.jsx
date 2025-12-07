import styles from './TransactionModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, use, createContext } from 'react';
import DropdownBtn from '../Dropdown/DropdownBtn';
import Input from '../Input/Input';
import AddItemBtn from './AddItemBtn';
import {
	ToastContext,
	ToggleModalContext,
	TransactionsContext,
} from '../../layouts/AppLayout/AppLayout';
import CloseButton from '../CloseButton/CloseButton';
import SubmitButton from '../SubmitButton/SubmitButton';
import Header2 from '../Header2/Header2';
import AddCategoryModal from './AddCategoryModal.jsx';

export const NameContext = createContext(null);

export default function AddTransactionModal({
	isModalOpen,
	transactionId = '',
	modalType = '',
	createTransaction = () => {},
	editTransaction = () => {},
	deleteTransactionData = () => {},
}) {
	const baseURL = import.meta.env.VITE_API_URL;
	const numbersArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const date = new Date();
	const year = date.getFullYear();
	const month = numbersArr.includes(date.getMonth() + 1)
		? `0${date.getMonth() + 1}`
		: date.getMonth() + 1;
	const day = numbersArr.includes(date.getDate())
		? `0${date.getDate()}`
		: date.getDate();

	const actualDate = `${year}-${month}-${day}`;

	// WALLETS

	const [isSwitched, setIsSwitched] = useState(false);
	const [nameInputValue, setNameInputValue] = useState('');
	const [amountInputValue, setAmountInputValue] = useState('');
	const [dateInputValue, setDateInputValue] = useState(actualDate);

	useEffect(() => {
		const transaction = transactionsContext.filteredList.find(
			(transaction) =>
				(transaction._id || transaction.customId) === transactionId
		);

		if (transaction && transaction?.type === 'income') {
			setIsSwitched(true);
			setNameInputValue(transaction?.name);
			setAmountInputValue(transaction?.amount);
			setDateInputValue(transaction?.date);
		} else if (transaction && transaction?.type === 'cost') {
			setIsSwitched(false);
			setNameInputValue(transaction?.name);
			setAmountInputValue(transaction?.amount);
			setDateInputValue(transaction?.date);
		}
	}, [isModalOpen]);

	const handleNameInputValue = (value) => {
		setNameInputValue(value);
	};

	const handleAmountInputValue = (value) => {
		setAmountInputValue(value);
	};

	const handleDateInputValue = (value) => {
		setDateInputValue(value);
	};

	const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

	const handleAddCategoryModalToggle = () => {
		setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
	};

	const toggleModalContext = use(ToggleModalContext);
	const transactionsContext = use(TransactionsContext);
	const toastContext = use(ToastContext);

	const handleClear = () => {
		setIsSwitched(false);
		setAmountInputValue('');
		setNameInputValue('');
		setDateInputValue(actualDate);
	};

	const deleteTransaction = async () => {
		try {
			const success = await deleteTransactionData();

			if (success) {
				handleClear();
				toggleModalContext();
			}
		} catch (error) {
			toastContext.showSuccessToast('error', error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (modalType === 'add') {
			try {
				const newTransaction = {
					name: nameInputValue,
					amount: amountInputValue,
					date: dateInputValue,
					type: isSwitched ? 'income' : 'cost',
				};

				await createTransaction(newTransaction);

				toastContext.showSuccessToast('success', 'Transaction added!');
				handleClear();
				toggleModalContext();
			} catch (error) {
				console.log(error);
				toastContext.showSuccessToast('error', 'Transaction not added');
			}
		} else if (modalType === 'edit/delete') {
			try {
				await editTransaction({
					inputValue: nameInputValue,
					amountValue: amountInputValue,
					dateValue: dateInputValue,
					type: isSwitched ? 'income' : 'cost',
				});

				toastContext.showSuccessToast('success', 'Transaction edited!');
				handleClear();
				toggleModalContext();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className={`${styles.modalBox} ${isModalOpen && styles.modalBoxOpen}`}>
			<div
				className={`${styles.modalContainer} ${
					isModalOpen && styles.modalOpen
				}`}>
				<CloseButton
					value={use(ToggleModalContext)}
					handleClear={handleClear}
				/>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Header2
						value={
							modalType === 'add'
								? 'Create new transaction'
								: 'Edit or delete transaction'
						}
					/>

					<div className={styles.switchContainer}>
						<button
							type='button'
							onClick={() => setIsSwitched(false)}
							className={`${styles.switchBoxes} ${styles.switchRedBox}`}>
							COST
						</button>

						<button
							type='button'
							onClick={() => setIsSwitched(true)}
							className={`${styles.switchBoxes} ${styles.switchGreenBox}`}>
							INCOME
						</button>

						<div className={styles.switchBoxContainer}>
							<div
								className={`${styles.switchBox} ${
									isSwitched ? styles.boxSwitched : ''
								}`}></div>
						</div>
					</div>

					{/* INPUT NAME */}
					<Input
						label={'Name'}
						type={'text'}
						inputValue={nameInputValue}
						onChange={handleNameInputValue}
						idValue={'name'}
					/>

					{/* INPUT AMOUNT */}
					<Input
						label={'Amount'}
						type={'number'}
						inputValue={amountInputValue}
						onChange={handleAmountInputValue}
						idValue={'amount'}
					/>

					{/* INPUT DATE */}
					<div className={styles.datepickerContainer}>
						<input
							className={styles.datepicker}
							type='date'
							style={{ marginBottom: '2.5rem' }}
							id='date'
							value={dateInputValue}
							onChange={(e) => handleDateInputValue(e.target.value)}
						/>
						<label className={styles.datepickerLabel} htmlFor='date'>
							Date
						</label>
					</div>

					{/* BUTTON WALLETS */}
					<DropdownBtn title={'Wallets'} btnType={'categories'} />

					{/* BUTTON CATEGORY */}
					<div className={styles.inputContainer}>
						<DropdownBtn title={'Category'} btnType={'categories'} />
						<AddItemBtn handleOpen={handleAddCategoryModalToggle} />
					</div>

					<button
						type='button'
						aria-label='Wallet'
						className={styles.dropdownBtn}>
						<span className={styles.dropdownTitle}>Tag</span>
					</button>

					<button
						type='button'
						aria-label='Wallet'
						className={styles.dropdownBtn}>
						<span className={styles.dropdownTitle}>Repeat</span>
					</button>

					{modalType === 'add' && (
						<SubmitButton
							id='addBtn'
							value='Add transaction'
							buttonType='add'
							btnType='submit'
						/>
					)}

					{modalType === 'edit/delete' && (
						<SubmitButton
							id='editBtn'
							value='Edit transaction'
							buttonType='add'
							btnType='submit'
						/>
					)}

					{modalType === 'edit/delete' && (
						<SubmitButton
							id='deleteBtn'
							value='Delete transaction'
							buttonType='delete'
							btnType='button'
							onClick={deleteTransaction}
						/>
					)}
				</form>
			</div>
		</div>
	);
}
