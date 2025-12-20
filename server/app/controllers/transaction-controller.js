import Transaction from '../db/models/transaction.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

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
			res.status(200).json(years);
		} catch (error) {
			res.sendStatus(500);
		}
	}

	async createTransaction(req, res) {
		const transaction = new Transaction({
			name: req.body.name,
			amount: Number(req.body.amount),
			date: req.body.date,
			type: req.body.type,
			walletId: req.body.walletId,
			userId: req.userId,
		});

		try {
			await transaction.save();
			res.status(201).json(transaction);
		} catch (e) {
			res.sendStatus(500);
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

			const transactions = await Transaction.aggregate([
				{
					$facet: {
						transactions: [
							{ $match: { userId: req.userId, $or: dates } },
							{ $sort: { date: -1 } },
						],

						years: [
							{ $match: { userId: req.userId } },
							{
								$group: {
									_id: { $year: '$date' },
									total: { $push: '$date' },
								},
							},
						],

						cost: [
							{ $match: { userId: req.userId, type: 'cost' } },
							{ $group: { _id: '$walletId', cost: { $sum: '$amount' } } },
						],

						income: [
							{ $match: { userId: req.userId, type: 'income' } },
							{ $group: { _id: '$walletId', income: { $sum: '$amount' } } },
						],
					},
				},
			]);

			const cost = transactions[0].cost;
			const income = transactions[0].income;

			let walletsBallances = {};

			[...cost, ...income].forEach((obj) => {
				if (!Object.keys(walletsBallances).includes(obj._id)) {
					walletsBallances = {
						...walletsBallances,
						[obj._id]: {
							cost: obj.cost,
							income: obj.income,
						},
					};
				} else {
					walletsBallances[obj._id].cost = obj.cost
						? obj.cost
						: walletsBallances[obj._id].cost;
					walletsBallances[obj._id].income = obj.income
						? obj.income
						: walletsBallances[obj._id].income;
				}
			});

			const response = {
				years: transactions[0].years.map((year) => year._id),
				transactions: transactions[0].transactions,
				walletsBallances,
			};

			return res.status(200).json(response);
		} catch (error) {
			console.log(error);
		}
	}

	async editTransaction(req, res) {
		try {
			const id = req.body._id;
			const response = await Transaction.updateOne(
				{
					_id: id,
					userId: req.userId,
				},
				{
					$set: {
						name: req.body.name,
						amount: req.body.amount,
						date: req.body.date,
						walletId: req.body.wal,
					},
				}
			);

			if (response.modifiedCount) {
				res.status(200).json(response.modifiedCount);
			} else {
				res.sendStatus(400);
			}
		} catch (e) {
			res.sendStatus(500);
			console.log('Nie zapisano edycji');
		}
	}

	async deleteTransaction(req, res) {
		const { id } = req.params;
		try {
			const response = await Transaction.deleteOne({ _id: id });

			if (response.deletedCount === 1) {
				res.sendStatus(200);
			} else {
				res.status(404).json({ message: 'Transaction not found' });
			}
		} catch (e) {
			res.sendStatus(500);
			console.log(e, 'Nie usunięto transakcji');
		}
	}

	async confirmUser(req, res) {
		try {
			const decoded = jwt.verify(
				req.cookies.token,
				process.env.JWT_ACCESS_SECRET
			);
			res.sendStatus(200);
		} catch (error) {
			console.log(req.cookies.token, process.env.JWT_ACCESS_SECRET);
			res.sendStatus(403);
		}
	}
}

export default new TransactionControler();
