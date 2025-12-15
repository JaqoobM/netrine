import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
	name: {
		type: String,
	},
	amount: {
		type: Number,
	},
	date: {
		type: Date,
	},
	type: {
		type: String,
	},
	walletId: {
		type: String,
	},
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
