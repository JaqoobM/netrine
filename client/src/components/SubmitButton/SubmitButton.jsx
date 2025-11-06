import styles from './SubmitButton.module.scss';

export default function SubmitButton({ value = '', buttonType = 'add' }) {
	return (
		<>
			{buttonType === 'add' && (
				<button type='submit' className={styles.submitBtn}>
					{value}
				</button>
			)}

			{buttonType === 'delete' && (
				<button
					type='submit'
					className={`${styles.submitBtn} ${styles.deleteBtn}`}>
					{value}
				</button>
			)}
		</>
	);
}
