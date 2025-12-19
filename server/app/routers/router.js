import express from 'express';
const router = express.Router();
import transactionControler from '../controllers/transaction-controller.js';
import walletController from '../controllers/wallet-controller.js';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

router
	.route('/api/transactions')
	.post(authMiddleware, transactionControler.createTransaction)
	.get(authMiddleware, transactionControler.showTransactions)
	.put(authMiddleware, transactionControler.editTransaction);

router
	.route('/api/transactions/:id')
	.delete(authMiddleware, transactionControler.deleteTransaction);

router
	.route('/api/wallets')
	.post(authMiddleware, walletController.createWallet)
	.get(authMiddleware, walletController.showWallets)
	.put(authMiddleware, walletController.editWallet);

router
	.route('/api/wallets/:id')
	.delete(authMiddleware, walletController.deleteWallet);

router.get('/api/years', transactionControler.getYears);

router.route('/api/user/').post(userController.createUser);

router.route('/api/auth/login').post(userController.compareUser);

router.route('/api/transactions/me').get(transactionControler.confirmUser);

export default router;
