import styles from './SubmitButton.module.scss';

export default function SubmitButton({ value }) {
	return (
		<button type='submit' className={styles.submitBtn}>
			{value}
		</button>
	);
}
