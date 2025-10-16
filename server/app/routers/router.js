import express from 'express';
const router = express.Router();
import transactionControler from '../controllers/transaction-controller.js';

router
	.route('/api/transactions')
	.post(transactionControler.createTransaction)
	.get(transactionControler.showTransactions)
	.put(transactionControler.editTransaction);
	
router
	.route('/api/transactions/:id')
	.delete(transactionControler.deleteTransaction);
export default router;
