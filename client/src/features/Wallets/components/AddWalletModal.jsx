import styles from './AddWalletModal.module.scss';
import { useState } from 'react';
import CloseButton from '../../../components/CloseButton/CloseButton';
import Header2 from '../../../components/Header2/Header2';
import Input from '../../../components/Input/Input';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';

export default function AddWallet({ modalType, isModalOpen, toggleModal }) {
	const [nameInputValue, setNameInputValue] = useState('');
	const [amountInputValue, setAmountInputValue] = useState('');

	const handleNameInputValue = (value) => {
		setNameInputValue(value);
	};

	const handleAmountInputValue = (value) => {
		setAmountInputValue(value);
	};

	const handleClear = () => {
		setNameInputValue('');
		setAmountInputValue('');
	};

	const handleSubmit = () => {};

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
					/>

					{/* INPUT AMOUNT */}
					<Input
						label={'Amount'}
						type={'number'}
						inputValue={amountInputValue}
						onChange={handleAmountInputValue}
						idValue={'amount'}
					/>

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
							// onClick={deleteTransaction}
						/>
					)}
				</form>
			</div>
		</div>
	);
}
