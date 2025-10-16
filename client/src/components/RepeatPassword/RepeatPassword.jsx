import styles from './RepeatPassword.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function RepeatPassword(props) {
	const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
	const [isRepeatPasswordFocused, setIsRepeatPasswordFocused] = useState(true);
	const [isRepeatPasswordCorrect, setIsRepeatPasswordCorrect] = useState(false);
	const [error, setError] = useState('');
	const [isLabelUpped, setIsLabelUpped] = useState(false);

	const handleValueChange = (value) => {
		setRepeatPasswordValue(value);
	};

	const validateRepeatPassword = useCallback(() => {
		let errorText = '';

		if (
			(!isRepeatPasswordFocused &&
				props.passwordValue !== repeatPasswordValue) ||
			(props.passwordValue !== repeatPasswordValue && props.isSubmit)
		) {
			errorText = 'Passwords are not the same';
		}

		setError(errorText);

		setIsRepeatPasswordCorrect(
			!errorText && !isRepeatPasswordFocused && props.passwordValues
		);

		if (!errorText && props.isSubmit) {
			props.setRepeatPassword(repeatPasswordValue);
		}
	}, [repeatPasswordValue, isRepeatPasswordFocused, props]);

	useEffect(() => {
		validateRepeatPassword();
	}, [validateRepeatPassword]);

	return (
		<>
			<div className={styles.box}>
				{error ? (
					<span className={styles.errorIcon}>
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
				) : null}
				{isRepeatPasswordCorrect ? (
					<span className={styles.correctIcon}>
						<FontAwesomeIcon icon={faCircleCheck} />
					</span>
				) : null}
				<label
					className={`${styles.label} ${
						isLabelUpped ? styles.labelUp : styles.label
					}`}
					htmlFor='reapeatPassword'>
					Repeat password
				</label>
				<input
					className={`${styles.input} ${error ? styles.inputError : ''} ${
						isRepeatPasswordCorrect ? styles.inputCorrect : ''
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
						if (props.passwordValue) {
							setIsRepeatPasswordFocused(false);
						}
					}}
					value={repeatPasswordValue}
					id='reapeatPassword'
					type='password'></input>
			</div>

			{/* ERROR REAPEAT PASSWORD */}
			<p className={styles.errorText}>{error}</p>
		</>
	);
}
