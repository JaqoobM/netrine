import styles from './SignUpPage.module.scss';
import PasswordRequirements from '../../../components/PasswordRequirements/PasswordRequirements';
import Email from '../../../components/Email/Email';
import Password from '../../../components/Password/Password';
import RepeatPassword from '../../../components/RepeatPassword/RepeatPassword';
import { useState } from 'react';

export default function RegisterPage() {
	const [isSubmit, setIsSubmit] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const [passwordValue, setPasswordValue] = useState('');

	const [isPasswordActivated, setIsPasswordActivated] = useState(false);

	const [errors, setErrors] = useState({
		isPasswordSpecialCharacter: false,
		isPasswordDigit: false,
		isPasswordLowercase: false,
		isPasswordUppercase: false,
		isPasswordLength: false,
	});

	const sendData = () => {
		if (email && password && repeatPassword) {
			console.log('Wysłano formularz');
		} else {
			console.log('Nie wysłano formularza');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsSubmit(true);

		if (email && password && repeatPassword) {
			sendData();
			console.log('Wysłano');
		} else {
			console.log('Nie wysłano');
		}
	};

	return (
		<>
			<div className={styles.partsWrapper}>
				<h2 className={styles.title}>Create a new account</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Email isSubmit={isSubmit} setEmail={setEmail} />
					<Password
						isSubmit={isSubmit}
						setPassword={setPassword}
						setPasswordValue={setPasswordValue}
						setIsPasswordActivated={setIsPasswordActivated}
						setErrors={setErrors}
					/>
					<PasswordRequirements
						isSubmit={isSubmit}
						setPassword={setPassword}
						setRepeatPassword={setRepeatPassword}
						isPasswordActivated={isPasswordActivated}
						errors={errors}
					/>
					<RepeatPassword
						passwordValue={passwordValue}
						isPasswordActivated={isPasswordActivated}
					/>

					{/* SUBMIT BUTTON */}
					<button className={styles.submitBtn}>Sign Up</button>
				</form>
				<p className={styles.info}>
					Already have an account?
					<a className={styles.link} href='/signin'>
						Sign In
					</a>
				</p>
			</div>
		</>
	);
}
