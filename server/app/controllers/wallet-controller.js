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
               res.status(201).json(wallet)
		} catch (error) {
               res.sendStatus(500)
          }
	}
}

export default new WalletController();
