import styles from './AddWalletModal.module.scss';
import { useState } from 'react';
import CloseButton from '../../../components/CloseButton/CloseButton';
import Header2 from '../../../components/Header2/Header2';
import Input from '../../../components/Input/Input';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';
import { useEffect } from 'react';

export default function AddWallet({
	modalType,
	isModalOpen,
	toggleModal,
	onSubmit = () => {},
	nameValue = '',
	balanceValue = '',
	id = '',
	del = () => {},
}) {
	const [nameInputValue, setNameInputValue] = useState('');
	const [amountInputValue, setAmountInputValue] = useState('');
	const [errorText, setErrorText] = useState({
		name: '',
		balance: '',
	});

	const handleNameInputValue = (value) => {
		setNameInputValue(value);
	};

	const handleAmountInputValue = (value) => {
		setAmountInputValue(value);
	};

	useEffect(() => {
		handleNameInputValue(nameValue);
		handleAmountInputValue(balanceValue);
	}, [nameValue, balanceValue]);

	const handleClear = () => {
		setNameInputValue('');
		setAmountInputValue('');
		setErrorText({ name: '', balance: '' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let nameValue = false;
		let amountValue = false;

		if (nameInputValue) {
			nameValue = true;
		} else {
			setErrorText((prev) => ({ ...prev, nameValue: 'Please enter the name' }));
		}

		if (amountInputValue) {
			amountValue = true;
		} else {
			setErrorText((prev) => ({
				...prev,
				amountValue: 'Please enter the balance',
			}));
		}

		if (nameValue && amountValue && !id) {
			onSubmit({
				name: nameInputValue,
				balance: amountInputValue,
			});
		} else {
			onSubmit({
				name: nameInputValue,
				balance: amountInputValue,
				id,
			});
		}
	};

	return (
		<div className={`${styles.modalBox} ${isModalOpen && styles.modalBoxOpen}`}>
			<div
				className={`${styles.modalContainer} ${
					isModalOpen && styles.modalOpen
				}`}>
				<CloseButton value={toggleModal} handleClear={handleClear} />

				<Header2
					value={
						modalType === 'add' ? 'Create new wallet' : 'Edit or delete wallet'
					}
				/>

				<form onSubmit={handleSubmit} className={styles.form}>
					{/* INPUT NAME */}
					<Input
						label={'Name'}
						type={'text'}
						inputValue={nameInputValue}
						onChange={handleNameInputValue}
						idValue={'name'}
						errorText={errorText.nameValue}
					/>

					{/* INPUT AMOUNT */}
					<Input
						label={'Balance'}
						type={'number'}
						inputValue={amountInputValue}
						onChange={handleAmountInputValue}
						idValue={'balance'}
						errorText={errorText.amountValue}
					/>

					{modalType === 'add' && (
						<SubmitButton
							id='addBtn'
							value='Add wallet'
							buttonType='add'
							btnType='submit'
						/>
					)}

					{modalType === 'edit/delete' && (
						<SubmitButton
							id='editBtn'
							value='Edit wallet'
							buttonType='add'
							btnType='submit'
						/>
					)}

					{modalType === 'edit/delete' && (
						<SubmitButton
							id='deleteBtn'
							value='Delete wallet'
							buttonType='delete'
							btnType='button'
							onClick={() => {
								del(id);
							}}
						/>
					)}
				</form>
			</div>
		</div>
	);
}
