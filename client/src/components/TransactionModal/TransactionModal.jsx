import styles from './TransactionModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	useState,
	useRef,
	useEffect,
	useContext,
	use,
	createContext,
} from 'react';
import Dropdown from '../Dropdown/Dropdown';
import DropdownBtn from '../Dropdown/DropdownBtn';
import DropdownList from '../Dropdown/DropdownList';
import useClickOutside from '../../hooks/useClickOutside';
import Input from '../Input/Input';
import DropdownInput from '../Dropdown/DropdownInput';
import AddItemBtn from './AddItemBtn';
import { ModalContext } from '../../layouts/AppLayout/AppLayout';
import CloseButton from '../CloseButton/CloseButton';
import SubmitButton from '../SubmitButton/SubmitButton';
import AddNameModal from './AddNameModal.jsx';
import Header2 from '../Header2/Header2';
import AddCategoryModal from './AddCategoryModal.jsx';

export const CloseContext = createContext(null);
export const NameContext = createContext(null);

export default function AddTransactionModal({ isModalOpen }) {
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
	const [inputValue, setInputValue] = useState('');
	const [amountInputValue, setAmountInputValue] = useState('');

	const handleNameValue = (value) => {
		setInputValue(value);
	};

	const handleAmountInputValueChange = (value) => {
		setAmountInputValue(value);
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

	return (
		<CloseContext value={handleClose}>
			<div
				className={`${styles.modalBox} ${isModalOpen && styles.modalBoxOpen}`}>
				<AddNameModal
					isOpen={isAddNameModalOpen}
					allNames={allNames}
					newName={inputValue}
					handleNameValue={handleNameValue}
					addNewName={addNewName}
				/>

				<AddCategoryModal
					isOpen={isAddCategoryModalOpen}
					allCategories={allCategories}
				/>

				<div
					className={`${styles.modalContainer} ${
						isModalOpen && styles.modalOpen
					}`}>
					<CloseButton value={use(ModalContext)} />
					<form className={styles.form}>
						<Header2 value={'Create new transaction'} />

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
						<div className={styles.inputContainer}>
							<DropdownInput
								label={'Name'}
								type={'text'}
								items={allNames}
								handleNameValue={handleNameValue}
							/>
							<AddItemBtn handleOpen={handleAddNameModalToggle} />
						</div>

						{/* INPUT AMOUNT */}
						<Input
							label={'Amount'}
							type={'number'}
							inputValue={amountInputValue}
							onChange={handleAmountInputValueChange}
							idValue={'amount'}
						/>

						{/* BUTTON WALLETS */}
						<DropdownBtn title={'Wallets'} items={allWallets} />

						{/* BUTTON CATEGORY */}
						<div className={styles.inputContainer}>
							<DropdownBtn title={'Category'} />
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

						<SubmitButton value={'Add transaction'} />
					</form>
				</div>
			</div>
		</CloseContext>
	);
}
