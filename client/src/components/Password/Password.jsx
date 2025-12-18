import styles from './Password.module.scss';
import { useEffect, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function Password(props) {
	const [passwordValue, setPasswordValue] = useState('');
	const [isPasswordFocused, setIsPasswordFocused] = useState(true);
	const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
	const [isLabelUpped, setIsLabelUpped] = useState(false);
	const [error, setError] = useState('');

	const handleValueChange = (value) => {
		setPasswordValue(value);
		props.setPassword(value);
	};

	const validatePassword = useCallback(() => {
		const regex = {
			password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
			passwordUppercase: /[A-Z]/,
			passwordLowercase: /[a-z]/,
			passwordDigit: /\d/,
			passwordSpecialCharacter: /[\W_]/,
		};

		const isCorrect = regex.password.test(passwordValue);
		const isUppercase = regex.passwordUppercase.test(passwordValue);
		const isLowercase = regex.passwordLowercase.test(passwordValue);
		const isDigit = regex.passwordDigit.test(passwordValue);
		const isSpecialCharacter =
			regex.passwordSpecialCharacter.test(passwordValue);

		let errorText = '';
		let isLength = false;

		if (passwordValue.length < 8) {
			isLength = true;
		}

		props.setErrors({
			isPasswordLength: isLength,
			isPasswordUppercase: !isUppercase,
			isPasswordLowercase: !isLowercase,
			isPasswordDigit: !isDigit,
			isPasswordSpecialCharacter: !isSpecialCharacter,
		});

		if ((!isCorrect && !isPasswordFocused) || (!isCorrect && props.isSubmit)) {
			errorText = 'Please enter a password that meets the requirements';
		}

		setError({ password: errorText });

		setIsPasswordCorrect(isCorrect);

		if (!errorText && props.isSubmit) {
			props.setPassword(passwordValue);
		}
	}, [passwordValue, isPasswordFocused, props.setErrors]);

	useEffect(() => {
		validatePassword();
	}, [validatePassword]);

	return (
		<>
			<div className={styles.box}>
				{error.password ? (
					<span className={styles.errorIcon}>
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
				) : null}
				{isPasswordCorrect ? (
					<span className={styles.correctIcon}>
						<FontAwesomeIcon icon={faCircleCheck} />
					</span>
				) : null}
				<label
					className={`${styles.label} ${
						isLabelUpped ? styles.labelUp : styles.label
					}`}
					htmlFor='password'>
					Password
				</label>
				<input
					className={`${styles.input} ${
						error.password ? styles.inputError : ''
					} ${isPasswordCorrect ? styles.inputCorrect : ''}`}
					onFocus={() => {
						setIsLabelUpped(true);
					}}
					onChange={(e) => {
						handleValueChange(e.target.value);
					}}
					onBlur={(e) => {
						if (e.target.value === '') {
							setIsLabelUpped(false);
						}
						setIsPasswordFocused(false);
						props.setIsPasswordActivated(true);
					}}
					value={passwordValue}
					id='password'
					type='password'></input>
			</div>

			{/* ERROR PASSWORD */}
			<p className={styles.errorText}>{error.password}</p>
		</>
	);
}
