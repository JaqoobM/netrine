import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
	name: { type: String },
	balance: { type: String },
});

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;
