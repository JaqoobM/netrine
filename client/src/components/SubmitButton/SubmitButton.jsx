import styles from './SubmitButton.module.scss';

export default function SubmitButton({
	value = '',
	buttonType = 'add',
	id = '',
	btnType = '',
	onClick = () => {},
}) {
	return (
		<>
			{buttonType === 'add' && (
				<button type={btnType} className={styles.submitBtn}>
					{value}
				</button>
			)}

			{buttonType === 'delete' && (
				<button
					id={id}
					type={btnType}
					className={`${styles.submitBtn} ${styles.deleteBtn}`}
					onClick={onClick}>
					{value}
				</button>
			)}
		</>
	);
}
