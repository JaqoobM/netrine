import styles from './BottomSheet.module.scss';
import Header2 from '../Header2/Header2';
import CloseButton from '../CloseButton/CloseButton';
import { WalletContext } from '../../layouts/AppLayout/AppLayout';
import React, { use } from 'react';

export default function BottomSheet({
	isOpen = false,
	toggle = () => {},
	selectedItem = {},
	onClick = () => {},
}) {
	const walletContext = use(WalletContext);

	const wallets = walletContext.wallets.filter(
		(wallet) => wallet._id != selectedItem._id
	);

	return (
		<div className={`${styles.modalBox} ${isOpen && styles.modalBoxOpen}`}>
			<div className={`${styles.container} ${isOpen && styles.modalOpen}`}>
				<Header2 value='Wallets' />
				<CloseButton value={toggle} />
				<div className={styles.btnWrapper}>
					{wallets.map((wallet) => {
						return (
							<React.Fragment key={wallet._id}>
								<button
									onClick={() => {
										onClick(wallet);
									}}
									className={styles.btn}>
									<span className={styles.walletName}>{wallet.name}</span>
									<span className={styles.walletBalance}>
										${wallet.balance}
									</span>
								</button>
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</div>
	);
}
