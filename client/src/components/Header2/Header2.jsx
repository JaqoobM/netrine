import styles from './Header2.module.scss';

export default function Header2({ value }) {
	return <h2 className={styles.header}>{value}</h2>;
}
