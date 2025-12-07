import Transaction from '../db/models/transaction.js';
import mongoose from 'mongoose';

class TransactionControler {
	async getYears(req, res) {
		try {
			const result = await Transaction.aggregate([
				{ $project: { year: { $year: '$date' } } },
			]);

			let years = [];

			result.forEach((obj) => {
				if (!years.includes(obj.year)) {
					years.push(obj.year);
				}
			});
			res.json(years);
		} catch (error) {}
	}

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
			res.status(201).json(transaction);
		} catch (e) {
			res.sendStatus(500)
			console.log(e, 'Nie zapisano transakcji');
		}
	}

	async showTransactions(req, res) {
		try {
			const { month, year } = req.query || {};

			let years = [];
			let months = [];
	
			if (year) {
				years = year.split(',').map(Number);
			}

			if (month) {
				months = month.split(',').map(Number);
			}

			let dates = [];

			years.forEach((year) => {
				months.forEach((month) => {
					const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
					const endDate = new Date(Date.UTC(year, month, 0, 0, 0, 0, 0));

					dates.push({
						date: {
							$gte: startDate,
							$lte: endDate,
						},
					});
				});
			});

			const transactions = await Transaction.find({
				$or: dates,
			}).sort({ date: -1 });

			return res.status(200).json(transactions);
		} catch (error) {
			console.log('error:');
		}
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
			res.status(200).json(transaction);
		} catch (e) {
			res.sendStatus(500)
			console.log('Nie zapisano edycji');
		}
	}

	async deleteTransaction(req, res) {
		const { id } = req.params;
		try {
			const response = await Transaction.deleteOne({ _id: id });

			if (response.deletedCount === 1) {
				res.sendStatus(201);
			} else {
				res.status(404).json({ message: 'Transaction not found' });
			}
		} catch (e) {
			res.sendStatus(500);
			console.log(e, 'Nie usunięto transakcji');
		}
	}
}

export default new TransactionControler();
