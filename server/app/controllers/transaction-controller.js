import Transaction from '../db/models/transaction.js';
import mongoose from 'mongoose';

class TransactionControler {
	async createTransaction(req, res) {
		const transaction = new Transaction({
			name: req.body.name,
			amount: req.body.amount,
			date: req.body.date,
			customId: req.body.customId,
			type: req.body.type,
		});

		try {
			await transaction.save();
			res.status(201).send('Zapisano transakcję');
		} catch (e) {
			console.log(e, 'Nie zapisano transakcji');
		}
	}

	async showTransactions(req, res) {
		const transactions = await Transaction.find({}).sort({ date: -1 });
		res.json(transactions);
	}

	async editTransaction(req, res) {
		const id = req.body._id || req.body.customId;

		const transaction = await Transaction.findOne(
			req.body._id ? { _id: id } : { customId: id }
		);

		transaction.name = req.body.name;
		transaction.amount = req.body.amount;
		transaction.date = req.body.date;

		try {
			await transaction.save();
			res.status(200).send('Zapisano edycje');
		} catch (e) {
			console.log('Nie zapisano edycji');
		}
	}

	async deleteTransaction(req, res) {
		const { id } = req.params;

		try {
			if (mongoose.isValidObjectId(id)) {
				await Transaction.deleteOne({ _id: id });
			} else {
				await Transaction.deleteOne({ customId: id });
			}
			res.status(200).send('Usunięto transakcję');
		} catch (e) {
			console.log(e, 'Nie usunięto transakcji');
		}
	}
}

export default new TransactionControler();
