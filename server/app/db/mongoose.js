import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// mongoose.set('strictQuery', false);

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Połączono z bazą danych');
	} catch (e) {
		console.log(e, 'Nie połączono się z bazą danych');
	}
};

export default connectDB;
