import React from 'react';
import styles from './TopBar.module.scss';
import logo from '../../../../assets/img/N.png';
import Checkbox from './Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TopBar() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.topBox}>
					<div className={styles.inputBox}>
						<img className={styles.logo} src={logo} />
						<input className={styles.search} placeholder='Search' />
					</div>
					<div className={styles.dataBox}>
						<div className={styles.statsBox}>
							<div className={styles.statBox}>
								<span className={`${styles.icons} ${styles.icon1}`}>
									<FontAwesomeIcon icon='fa-solid fa-caret-up' />
								</span>
								<p className={styles.currency}>$</p>
								<p className={styles.statsAmount}>5000</p>
							</div>
							<div className={styles.statBox}>
								<span className={`${styles.icons} ${styles.icon2}`}>
									<FontAwesomeIcon icon='fa-solid fa-caret-down' />
								</span>
								<p className={styles.currency}>$</p>
								<p className={styles.statsAmount}>1430</p>
							</div>
							<div className={styles.statBox}>
								<span className={`${styles.icons} ${styles.icon3}`}>
									<FontAwesomeIcon icon='fa-solid fa-arrow-turn-up' />
								</span>
								<p className={styles.currency}>$</p>
								<p className={`${styles.statsAmount} ${styles.bilans}`}>
									+3570
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.bottomBox}>
					<div className={styles.bottomContainer}>
						<Checkbox />
						<p className={styles.checkboxText}>Future</p>
						<div className={styles.rightBox}>
							<button type='button' className={styles.sortBox}>
								<span className={styles.sortIcon}>
									<FontAwesomeIcon icon='fa-solid fa-arrow-right-arrow-left' />
								</span>
								<p className={styles.sortText}>Sort</p>
							</button>

							<button type='button' className={styles.filterBox}>
								<span className={styles.filterIcon}>
									<FontAwesomeIcon icon='fa-solid fa-filter' />
								</span>
								<p className={styles.sortText}>Filter</p>
							</button>

							<div className={styles.FilterBox}></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
