import styles from './TransactionModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	useState,
	useRef,
	useEffect,
	useContext,
	use,
	createContext,
	act,
} from 'react';
import Dropdown from '../Dropdown/Dropdown';
import DropdownBtn from '../Dropdown/DropdownBtn';
import DropdownList from '../Dropdown/DropdownList';
import useClickOutside from '../../hooks/useClickOutside';
import Input from '../Input/Input';
import DropdownInput from '../Dropdown/DropdownInput';
import AddItemBtn from './AddItemBtn';
import {
	ToggleModalContext,
	TransactionsContext,
} from '../../layouts/AppLayout/AppLayout';
import CloseButton from '../CloseButton/CloseButton';
import SubmitButton from '../SubmitButton/SubmitButton';
import AddNameModal from './AddNameModal.jsx';
import Header2 from '../Header2/Header2';
import AddCategoryModal from './AddCategoryModal.jsx';
import axios from 'axios';

// export const CloseContext = createContext(null);
export const NameContext = createContext(null);

export default function AddTransactionModal({
	isModalOpen,
	transactionId = null,
	modalType = null,
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
	const [allWallets, setAllWallets] = useState([
		{ name: 'Main wallet', balance: 4500 },
		{ name: 'Secondary wallet', balance: 1200 },
		{ name: 'Company wallet', balance: 4700.87 },
	]);

	const [allCategories, setAllCategories] = useState([
		{
			name: 'Food',
			backgroundColor: '657BE5',
			iconColor: '657BE5',
			icon: '<FontAwesomeIcon icon="fa-solid fa-utensils" />',
		},
		{
			name: 'Shopping',
			backgroundColor: '657BE5',
			iconColor: '657BE5',
			icon: '<FontAwesomeIcon icon="fa-solid fa-utensils" />',
		},
	]);

	const [allNames, setAllNames] = useState([
		'Lidl',
		'Biedronka',
		'Dino',
		'Rachunek za prąd',
		'Zakupy na Zalando',
		'Naprawa samochodu u najlepszego mechanika w mieście Płock',
		'Fryzjer',
		'Woda',
		'Pizza',
		'Kebab',
	]);

	const [selectedWallet, setSelectedWallet] = useState(allWallets[0]);
	const walletsToDisplay = allWallets.filter(
		(wallet) => wallet != selectedWallet
	);
	const handleWallets = (wallet) => {
		setSelectedWallet(wallet);
	};

	const [isSwitched, setIsSwitched] = useState(false);
	const [nameInputValue, setNameInputValue] = useState('');
	const [amountInputValue, setAmountInputValue] = useState('');
	const [dateInputValue, setDateInputValue] = useState(actualDate);

	useEffect(() => {
		const transaction = transactionsContext.list.find(
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

	const [isAddNameModalOpen, setIsNameModalOpen] = useState(false);

	const handleAddNameModalToggle = () => {
		setIsNameModalOpen((prev) => !prev);
	};

	const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

	const handleAddCategoryModalToggle = () => {
		setIsAddCategoryModalOpen(!isAddCategoryModalOpen);
	};

	const addNewName = (value) => {
		setAllNames((prev) => [...prev, value]);
	};

	const handleClose = () => {
		setIsNameModalOpen(false);
		setIsAddCategoryModalOpen(false);
	};

	const toggleModalContext = use(ToggleModalContext);
	const transactionsContext = use(TransactionsContext);

	const addTransactionData = async (newTransaction) => {
		try {
			await axios.post(
				`${baseURL || 'http://localhost:3000'}/api/transactions`,
				newTransaction
			);
			toggleModalContext();
			transactionsContext.addNewTransaction(newTransaction);
			setNameInputValue('');
			setAmountInputValue('');
		} catch (e) {
			console.log('Nie udało się wysłać na serwer!', e);
		}
	};

	const dateRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();

		let type;

		if (isSwitched === false) {
			type = 'cost';
		} else {
			type = 'income';
		}

		const chars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789';

		let result = '';
		for (let index = 0; index < 24; index++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		const newTransaction = {
			name: nameInputValue,
			amount: amountInputValue,
			date: dateRef.current.value,
			type,
			customId: result,
		};

		addTransactionData(newTransaction);
	};

	const handleClear = () => {
		setIsSwitched(false);
		setAmountInputValue('');
		setNameInputValue('');
		setDateInputValue(actualDate);
	};

	return (
		// <CloseContext value={handleClose}>
		<div className={`${styles.modalBox} ${isModalOpen && styles.modalBoxOpen}`}>
			{/* <AddNameModal
					isOpen={isAddNameModalOpen}
					allNames={allNames}
					newName={nameInputValue}
					handleNameValue={handleNameValue}
					addNewName={addNewName}
				/> */}

			<AddCategoryModal
				isOpen={isAddCategoryModalOpen}
				allCategories={allCategories}
			/>

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
					{/* <div className={styles.inputContainer}>
							<DropdownInput
								label={'Name'}
								type={'text'}
								items={allNames}
								handleNameValue={handleNameValue}
							/>
							<AddItemBtn handleOpen={handleAddNameModalToggle} />
						</div> */}
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
							ref={dateRef}
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
					<DropdownBtn
						title={'Wallets'}
						items={allWallets}
						btnType={'categories'}
					/>

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

					<SubmitButton
						value={modalType === 'add' ? 'Add transaction' : 'Edit transaction'}
						buttonType={'add'}
					/>
					{modalType === 'Edit/Delete' && (
						<SubmitButton value={'Delete transaction'} buttonType={'delete'} />
					)}
				</form>
			</div>
		</div>
		// </CloseContext>
	);
}
