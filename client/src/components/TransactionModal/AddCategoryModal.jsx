import styles from './AddCategoryModal.module.scss';
import { CloseContext } from './TransactionModal';
import CloseButton from '../CloseButton/CloseButton';
import Header2 from '../Header2/Header2';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import { use, useState, useEffect, useRef } from 'react';
import DropdownBtn from '../Dropdown/DropdownBtn';
import BottomSheet from '../BottomSheet/BottomSheet';

export default function AddCategoryModal({
	isOpen = false,
	allCategories = [],
}) {
	const [backgroundColors, setBackgroundColors] = useState([
		{ backgroundColor: '#657BE580' },
		{ backgroundColor: '#0D912A80' },
		{ backgroundColor: '#BC4F2180' },
		{ backgroundColor: '#BC4F2180' },
		{ backgroundColor: '#BC4F2180' },
		{ backgroundColor: '#BC4F2180' },
		{ backgroundColor: '#BC4F2180' },
		{ backgroundColor: '#BC4F2180' },
		{ backgroundColor: '#BC4F2180' },
	]);

	const [iconColors, setIconColors] = useState([
		{ backgroundColor: '#657BE5' },
		{ backgroundColor: '#0D912A' },
		{ backgroundColor: '#BC4F21' },
		{ backgroundColor: '#BC4F21' },
		{ backgroundColor: '#BC4F21' },
		{ backgroundColor: '#BC4F21' },
	]);
	const [inputValue, setInputValue] = useState('');
	const [errorText, setErrorText] = useState(null);
	const inputRef = useRef();

	const handleValueChange = (value) => {
		setInputValue(value);
	};

	const handleClear = () => {
		setInputValue('');
	};

	useEffect(() => {
		const HandleKeyUp = (e) => {
			if (e.target === inputRef.current) {
				setErrorText(null);
			}
		};

		document.addEventListener('keyup', HandleKeyUp);
		return () => document.removeEventListener('keyup', HandleKeyUp);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		allCategories.forEach((category) => {
			if (category.name === inputValue) {
				setErrorText('Name already exist');
			}
		});
	};

	return (
		<div className={styles.wrapper}>
			<div className={`${styles.modalContainer} ${isOpen && styles.modalIsOpen}`}>
				<CloseButton value={use(CloseContext)} handleClear={handleClear} />
				<form onSubmit={handleSubmit}>
					<Header2 value={'Create a new category'} />
					<Input
						errorText={errorText}
						label={'Category'}
						type={'text'}
						idValue={'Category'}
						onChange={handleValueChange}
						inputValue={inputValue}
						ref={inputRef}
					/>

					<DropdownBtn
						btnType={'colors'}
						title={'Background color'}
						items={backgroundColors}
					/>

					<DropdownBtn
						btnType={'colors'}
						title={'Icon color'}
						items={iconColors}
					/>

					<SubmitButton value={'Add'} />
				</form>
			</div>
		</div>
	);
}
