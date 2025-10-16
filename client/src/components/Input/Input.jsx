import styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Input({
	label = '',
	type = 'text',
	onChange = () => {},
	ref = null,
	isActive = false,
	onOpen = () => {},
	isError = false,
	errorText = null,
	handleFocus = () => {},
	idValue = '',
	inputValue = '',
}) {
	return (
		<>
			<div className={styles.inputContainer}>
				{errorText && (
					<span className={styles.errorIcon}>
						<FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
					</span>
				)}
				<input
					ref={ref}
					type={type}
					className={`${styles.input} ${isActive && styles.listOpened} ${
						errorText && styles.errorInput
					}`}
					onBlur={handleFocus}
					onFocus={onOpen}
					onChange={(e) => onChange(e.target.value)}
					value={inputValue}
					id={idValue}
				/>
				<label
					className={`${styles.label} ${errorText && styles.errorLabel}`}
					htmlFor={idValue}>
					{label}
				</label>
				{errorText && <p className={styles.errorText}>{errorText}</p>}
			</div>
		</>
	);
}
