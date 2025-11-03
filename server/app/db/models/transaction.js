import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
	name: {
		type: String,
	},
	amount: {
		type: String,
	},
	date: {
		type: Date,
	},
	customId: {
		type: String,
	},
	type: {
		type: String,
	},
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
