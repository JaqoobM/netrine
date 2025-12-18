import User from '../db/models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

class UserContrller {
	async createUser(req, res) {
		const { email, password } = req.body;

		const saltRounds = 12;
		const newPassword = await bcrypt.hash(password, saltRounds);

		const user = new User({
			email,
			password: newPassword,
		});

		await user.save();
		res.status(201).json(user);
	}

	async compareUser(req, res) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			const isCorrect = await bcrypt.compare(password, user.password);

			if (isCorrect) {
				const token = jwt.sign(
					{
						data: {
							id: user._id,
						},
					},
					process.env.JWT_ACCESS_SECRET,
					{ expiresIn: '1h' }
				);
				res

					.status(200)
					.cookie('token', token, {
						sameSite: 'Strict',
						path: '/',
						maxAge: 900000,
						secure: true,
						httpOnly: true,
					})
					.send('Cookies');
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserContrller();
