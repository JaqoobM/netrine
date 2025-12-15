import mongoose from 'mongoose';
import Wallet from '../db/models/wallet.js';

class WalletController {
	async showWallets(req, res) {
		try {
			const wallets = await Wallet.find({});

			res.status(200).json(wallets);
		} catch (error) {
			res.sendStatus(500);
		}
	}

	async createWallet(req, res) {
		try {
			const wallet = new Wallet({
				name: req.body.name,
				balance: req.body.balance,
			});

			await wallet.save();
			res.status(201).json(wallet);
		} catch (error) {
			res.sendStatus(500);
		}
	}

	async editWallet(req, res) {
		try {
			const { id } = req.body;

			const wallet = await Wallet.findOne({ _id: id });

			wallet.name = req.body.name;
			wallet.balance = req.body.balance;

			await wallet.save();

			res.status(200).json(wallet);
		} catch (error) {
			res.sendStatus(500);
			console.log(error);
		}
	}

	async deleteWallet(req, res) {
		
		try {
			const { id } = req.params;

			const response = await Wallet.deleteOne({ _id: id });

			if (response.deletedCount === 1) {
				res.status(200).json(id);
			} else {
				res.status(404).json({ message: 'Wallet not found' });
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new WalletController();
