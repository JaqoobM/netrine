import styles from './Email.module.scss';
import { useEffect, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function Email(props) {
	const [emailValue, setEmailValue] = useState('');
	const [isEmailFocused, setIsEmailFocused] = useState(true);
	const [isEmailCorrect, setIsEmailCorrect] = useState(false);
	const [error, setError] = useState('');
	const [isLabelUpped, setIsLabelUpped] = useState(false);
	const [regex, setRegex] = useState(
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	);

	const handleValueChange = (value) => {
		setEmailValue(value);
		props.setEmail(value);
	};

	const validateEmail = useCallback(() => {
		const isCorrect = regex.test(emailValue);
		let errorText = '';

		if (
			(emailValue === '' && !isEmailFocused) ||
			(emailValue === '' && props.isSubmit)
		) {
			errorText = 'Please enter your email address';
		} else if (!isCorrect && !isEmailFocused) {
			errorText = 'Please enter a valid email';
		}

		setError(errorText);

		setIsEmailCorrect(isCorrect);

		if (!errorText && props.isSubmit) {
			props.setEmail(emailValue);
		}
	}, [emailValue, isEmailFocused, regex, props]);

	useEffect(() => {
		validateEmail();
	}, [validateEmail]);

	return (
		<>
			<div className={styles.box}>
				{error ? (
					<span className={styles.errorIcon}>
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
				) : null}
				{isEmailCorrect ? (
					<span className={styles.correctIcon}>
						<FontAwesomeIcon icon={faCircleCheck} />
					</span>
				) : null}
				<label
					className={`${styles.label} ${
						isLabelUpped ? styles.labelUp : styles.label
					}`}
					htmlFor='email'>
					Email
				</label>
				<input
					className={`${styles.input} ${error ? styles.inputError : ''} ${
						isEmailCorrect ? styles.inputCorrect : ''
					}`}
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
						setIsEmailFocused(false);
					}}
					value={emailValue}
					id='email'
					type='email'></input>
			</div>

			{/* ERROR EMAIL */}
			<p className={styles.errorText}>{error}</p>
		</>
	);
}
