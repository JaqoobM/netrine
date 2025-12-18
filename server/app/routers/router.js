import express from 'express';
const router = express.Router();
import transactionControler from '../controllers/transaction-controller.js';
import walletController from '../controllers/wallet-controller.js';
import userController from '../controllers/user-controller.js';

router
	.route('/api/transactions')
	.post(transactionControler.createTransaction)
	.get(transactionControler.showTransactions)
	.put(transactionControler.editTransaction);

router
	.route('/api/transactions/:id')
	.delete(transactionControler.deleteTransaction);

router
	.route('/api/wallets')
	.post(walletController.createWallet)
	.get(walletController.showWallets)
	.put(walletController.editWallet);

router.route('/api/wallets/:id').delete(walletController.deleteWallet);

router.get('/api/years', transactionControler.getYears);

router.route('/api/user/').post(userController.createUser);

router.route('/api/auth/login').post(userController.compareUser);

router.route('/api/transactions/me').get(transactionControler.confirmUser);

export default router;
