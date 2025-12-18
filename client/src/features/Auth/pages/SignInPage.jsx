import styles from './SignInPage.module.scss';
import PasswordRequirements from '../../../components/PasswordRequirements/PasswordRequirements';
import Email from '../../../components/Email/Email';
import Password from '../../../components/Password/Password';
import RepeatPassword from '../../../components/RepeatPassword/RepeatPassword';
import { useState } from 'react';
import axios from 'axios';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

export default function SignInPage() {
	const baseURL = import.meta.env.VITE_API_URL;

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

	const navigate = useNavigate();

	const userData = async (user) => {
		try {
			const response = await axios.post(
				`${baseURL || 'http://localhost:3000'}/api/auth/login`,
				user,
				{ withCredentials: true }
			);

			navigate('/transactions');
		} catch (error) {
			console.log('error');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsSubmit(true);

		userData({
			email,
			password,
		});

		// if (email && password && repeatPassword) {
		// 	console.log(email, password, repeatPassword);
		// 	console.log('Wysłano');
		// } else {
		// 	console.log(email, password, repeatPassword);
		// 	console.log('Nie wysłano');
		// }
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
