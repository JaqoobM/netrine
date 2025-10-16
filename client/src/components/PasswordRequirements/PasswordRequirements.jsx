import styles from './PasswordRequirements.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function PasswordRequirements(props) {
	return (
		<>
			{/* PASSWORD REQUIREMENTS LIST BOX */}
			<div className={styles.passwordInfoTextBox}>
				<p className={styles.passwordInfo}>
					The password must meet the following requirements:
				</p>

				{/* PASSWORD REQUIREMENTS LIST */}
				<ul className={styles.passwordInfoList}>
					<li
						className={`${
							props.errors.isPasswordLength ? '' : styles.passwordInfoText
						} ${
							props.isPasswordActivated && props.errors.isPasswordLength
								? styles.passwordInfoErrorText
								: null
						}`}>
						At least 8 characters long{' '}
						{props.isPasswordActivated && props.errors.isPasswordLength ? (
							<FontAwesomeIcon icon={faXmark} />
						) : null}
						{!props.errors.isPasswordLength ? (
							<FontAwesomeIcon icon={faCheck} />
						) : null}
					</li>
					<li
						className={`${
							!props.errors.isPasswordUppercase ? styles.passwordInfoText : ''
						} ${
							props.isPasswordActivated && props.errors.isPasswordUppercase
								? styles.passwordInfoErrorText
								: ''
						}`}>
						At least one uppercase letter (A-Z){' '}
						{props.isPasswordActivated && props.errors.isPasswordUppercase ? (
							<FontAwesomeIcon icon={faXmark} />
						) : null}
						{!props.errors.isPasswordUppercase ? (
							<FontAwesomeIcon icon={faCheck} />
						) : null}
					</li>
					<li
						className={`${
							!props.errors.isPasswordLowercase ? styles.passwordInfoText : ''
						} ${
							props.isPasswordActivated && props.errors.isPasswordLowercase
								? styles.passwordInfoErrorText
								: ''
						}`}>
						At least one lowercase letter (a-z){' '}
						{props.isPasswordActivated && props.errors.isPasswordLowercase ? (
							<FontAwesomeIcon icon={faXmark} />
						) : null}
						{!props.errors.isPasswordLowercase ? (
							<FontAwesomeIcon icon={faCheck} />
						) : null}
					</li>
					<li
						className={`${
							!props.errors.isPasswordDigit ? styles.passwordInfoText : ''
						} ${
							props.isPasswordActivated && props.errors.isPasswordDigit
								? styles.passwordInfoErrorText
								: ''
						}`}>
						At least one digit (0-9){' '}
						{props.isPasswordActivated && props.errors.isPasswordDigit ? (
							<FontAwesomeIcon icon={faXmark} />
						) : null}
						{!props.errors.isPasswordDigit ? (
							<FontAwesomeIcon icon={faCheck} />
						) : null}
					</li>
					<li
						className={`${
							!props.errors.isPasswordSpecialCharacter
								? styles.passwordInfoText
								: ''
						} ${
							props.isPasswordActivated &&
							props.errors.isPasswordSpecialCharacter
								? styles.passwordInfoErrorText
								: ''
						}`}>
						At least one special character (!, @, #, etc.){' '}
						{props.isPasswordActivated &&
						props.errors.isPasswordSpecialCharacter ? (
							<FontAwesomeIcon icon={faXmark} />
						) : null}
						{!props.errors.isPasswordSpecialCharacter ? (
							<FontAwesomeIcon icon={faCheck} />
						) : null}
					</li>
				</ul>
			</div>
		</>
	);
}
