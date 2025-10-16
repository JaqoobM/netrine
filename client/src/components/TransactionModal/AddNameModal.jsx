import styles from './AddNameModal.module.scss';
import CloseButton from '../CloseButton/CloseButton';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import Header2 from '../Header2/Header2';
import { CloseContext } from './TransactionModal';
import { use, useEffect, useState } from 'react';

export default function AddNameModal({
	isOpen = false,
	allNames = [],
	newName = '',
	handleNameValue = () => {},
	addNewName = () => {},
}) {
	const [inputValue, setInputValue] = useState('');
	const [isError, setIsError] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [errorText, setErrorText] = useState(null);

	const closeModal = use(CloseContext);

	const handleValueChange = (value) => {
		setInputValue(value);
		handleNameValue(value);
	};

	useEffect(() => {
		if (!allNames.includes(newName)) {
			setInputValue(newName);
		} else {
			setInputValue('');
		}
	}, [newName]);

	useEffect(() => {
		if (isFocused && allNames.includes(inputValue)) {
			setIsError(true);
			setErrorText('This name is already exists');
			return;
		}
		setIsError(false);
	}, [inputValue, isFocused]);

	const handleClear = () => {
		setInputValue((prev) => (prev = ''));
		setIsFocused(false);
		setIsError(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const nameValue = e.target.elements.name.value;

		if (nameValue && allNames.includes(nameValue)) {
			setIsError(true);
			setErrorText('This name is already exists');
			return;
		} else if (!nameValue) {
			setIsError(true);
			setErrorText('Enter a name');
			return;
		}

		addNewName(nameValue);
		handleClear(true);
		closeModal();
	};

	const handleFocus = () => {
		setIsFocused();
	};

	return (
		// <div className={`${styles.modalBox} ${isOpen && styles.modalBoxOpen}`}>
		<div className={styles.wrapper}>
			<div
				className={`${styles.modalContainer} ${isOpen && styles.modalIsOpen}`}>
				<CloseButton value={use(CloseContext)} handleClear={handleClear} />
				<form onSubmit={handleSubmit}>
					<Header2 value={'Add new name'} />
					<Input
						handleFocus={handleFocus}
						isError={isError}
						errorText={errorText}
						label={'Name'}
						type={'text'}
						idValue={'name'}
						onChange={handleValueChange}
						inputValue={inputValue}
					/>
					<SubmitButton value={'Add'} />
				</form>
			</div>
		</div>
		// </div>
	);
}
