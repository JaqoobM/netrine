import './NavMobile.scss';
import styles from './NavMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGear,
	faChartLine,
	faMoneyBillTransfer,
	faWallet,
	faSackDollar,
	faCoins,
	faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

function Navigation(props) {
	const [menuIsOpen, setMenuIsOpen] = useState(true);

	let nav;
	let menuIconsArr;
	let menuTextsArr;
	let burgerBtnDesktop;
	let burgerBtnMobile;
	let bar1;
	let bar2;
	let bar3;

	useEffect(() => {
		bar1 = document.querySelector('#bar1');
		bar2 = document.querySelector('#bar2');
		bar3 = document.querySelector('#bar3');
		burgerBtnDesktop = document.querySelector('#burgerBtnDesktop');
		burgerBtnMobile = document.querySelector('#burgerBtnMobile');
		nav = document.querySelector('.nav');
		menuIconsArr = document.querySelectorAll('#menuIcon');
		menuTextsArr = document.querySelectorAll('#menuText');
	});

	const mobileMenuHandler = (btnId) => {
		if (btnId === 'burgerBtnMobile') {
			nav?.classList.toggle('nav-mobile-activated');
			burgerBtnMobile?.classList.toggle('btn-x-wispan');
			bar1?.classList.toggle('bar1-x');
			bar2?.classList.toggle('bar2-x');
			bar3?.classList.toggle('bar3-x');
		} else {
			switch (menuIsOpen) {
				case true:
					menuIconsArr.forEach((icon) => {
						icon.classList.add('nav-icons-margin-off');
					});
					menuTextsArr.forEach((text) => {
						text.classList.add('nav-texts-disabled');
					});
					setMenuIsOpen(false);
					break;
				case false:
					setTimeout(() => {
						menuTextsArr.forEach((text) => {
							text.classList.remove('nav-texts-disabled');
						});
					}, 100);
					menuIconsArr.forEach((icon) => {
						icon.classList.remove('nav-icons-margin-off');
					});
					setMenuIsOpen(true);
					break;
				default:
					break;
			}
			burgerBtnDesktop.firstChild.classList.toggle('burger-rotate');
			nav.classList.toggle('nav-small');
		}
	};

	return (
		<>
			<nav className='nav'>
				<button
					id='burgerBtnDesktop'
					className='burger-btn'
					onClick={(e) => {
						const btnId = e.target.closest('button').id;
						mobileMenuHandler(btnId);
					}}>
					<div className='burger-btn__box' type='button'>
						<span className='burger-btn__bar'></span>
						<span className='burger-btn__bar'></span>
						<span className='burger-btn__bar'></span>
					</div>
				</button>

				<a href='#' className='nav__menu-link'>
					<span id='menuIcon' className='nav__menu-icon'>
						<FontAwesomeIcon icon={faChartLine} />
					</span>
					<span id='menuText' className='nav__menu-text'>
						Panel
					</span>
				</a>
				<a href='#' className='nav__menu-link'>
					<span id='menuIcon' className='nav__menu-icon nav__transaction-icon'>
						<FontAwesomeIcon icon={faMoneyBillTransfer} />
					</span>
					<span id='menuText' className='nav__menu-text'>
						Transakcje
					</span>
				</a>
				<a href='#' className='nav__menu-link'>
					<span id='menuIcon' className='nav__menu-icon'>
						<FontAwesomeIcon icon={faWallet} />
					</span>
					<span id='menuText' className='nav__menu-text'>
						Portfele
					</span>
				</a>
				<a href='#' className='nav__menu-link'>
					<span id='menuIcon' className='nav__menu-icon'>
						<FontAwesomeIcon icon={faCoins} />
					</span>
					<span id='menuText' className='nav__menu-text'>
						Oszczędności
					</span>
				</a>
				<a href='#' className='nav__menu-link'>
					<span id='menuIcon' className='nav__menu-icon'>
						<FontAwesomeIcon icon={faSackDollar} />
					</span>
					<span id='menuText' className='nav__menu-text'>
						Budżety
					</span>
				</a>

				<div className='nav__menu-settings-box'>
					<a href='#' className='nav__menu-link'>
						<span id='menuIcon' className='nav__menu-icon'>
							<FontAwesomeIcon icon={faGear} />
						</span>
						<span id='menuText' className='nav__menu-text'>
							Ustawienia
						</span>
					</a>
					<a href='#' className='nav__menu-link'>
						<span id='menuIcon' className='nav__menu-icon'>
							<FontAwesomeIcon icon={faArrowRightToBracket} />
						</span>
						<span id='menuText' className='nav__menu-text'>
							Wyloguj
						</span>
					</a>
				</div>
			</nav>

			<nav className={styles.navMobile}>
				<NavLink
					to='/wallets'
					className={({ isActive }) =>
						`${styles.walletsBox} ${styles.navBoxes} ${
							isActive ? styles.iconActivated : ''
						}`
					}>
					<span className={`${styles.walletsIcon} ${styles.navIcons}`}>
						<FontAwesomeIcon icon='fa-solid fa-wallet' />
					</span>
					<p className={`${styles.walletsText} ${styles.navTexts}`}>Wallets</p>
				</NavLink>

				<NavLink
					to='/transactions'
					className={({ isActive }) =>
						`${styles.transactionsBox} ${styles.navBoxes} ${
							isActive ? styles.iconActivated : ''
						}`
					}>
					<span className={`${styles.transactionsIcon} ${styles.navIcons}`}>
						<FontAwesomeIcon icon='fa-solid fa-money-bill-transfer' />
					</span>
					<p className={`${styles.TransactionsText} ${styles.navTexts}`}>
						Transactions
					</p>
				</NavLink>

				<button type='button' onClick={() => props.modalActivating()} className={styles.circle}>
					<span className={styles.plusIcon}>
						<FontAwesomeIcon icon='fa-solid fa-plus' />
					</span>
				</button>

				<NavLink
					to='/shoppinglists'
					className={({ isActive }) =>
						`${styles.shoppingBox} ${styles.navBoxes} ${
							isActive ? styles.iconActivated : ''
						}`
					}>
					<span className={`${styles.shoppingIcon} ${styles.navIcons}`}>
						<FontAwesomeIcon icon='fa-solid fa-list-check' />
					</span>
					<p className={`${styles.shoppingText} ${styles.navTexts}`}>Lists</p>
				</NavLink>

				<NavLink
					to='/budgets'
					className={({ isActive }) =>
						`${styles.budgetsBox} ${styles.navBoxes} ${
							isActive ? styles.iconActivated : ''
						}`
					}>
					<span className={`${styles.budgetsIcon} ${styles.navIcons}`}>
						<FontAwesomeIcon icon='fa-solid fa-sack-dollar' />
					</span>
					<p className={`${styles.budgetText} ${styles.navTexts}`}>Budgets</p>
				</NavLink>
			</nav>
		</>
	);
}

export default Navigation;
