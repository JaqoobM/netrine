import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';

class AuthController {
	async register(req, res) {
		try {
			const { email, password } = req.body;

			if (!email && !password) {
				return res
					.status(400)
					.json({ message: 'Email and password are required' });
			} else if (!email) {
				return res.status(400).json({ message: 'Email is required' });
			} else if (!password) {
				return res.status(400).json({ message: 'Password is required' });
			}

			const user = await User.findOne({ email });

			if (user) {
				return res.status(409).json({ message: 'The user already exists' });
			}

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				password: passwordHash,
			});

			await newUser.save();
			res
				.status(201)
				.json({ newUser, message: 'The account has been created' });
		} catch (error) {
			console.log('[ Register error ]', error);
			res
				.status(500)
				.json({ message: 'Something went wrong. Try again later' });
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;

			if (!email && !password) {
				return res
					.status(400)
					.json({ message: 'Email and password are required' });
			} else if (!email) {
				return res.status(400).json({ message: 'Email is required' });
			} else if (!password) {
				return res.status(400).json({ message: 'Password is required' });
			}

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'The user does not exists' });
			}

			const isMatch = await bcrypt.compare(password, user?.password);

			if (!isMatch) {
				return res.status(400).json({ message: 'Incorrect login or password' });
			}

			const token = jwt.sign(
				{
					id: user._id,
				},
				process.env.JWT_ACCESS_SECRET,
				{
					expiresIn: '1h',
				}
			);
			res
				.status(200)
				.cookie('token', token, {
					sameSite: 'None',
					path: '/',
					maxAge: 900000,
					secure: true,
					httpOnly: true,
				})
				.send('Cookies');
		} catch (error) {
			console.log('[ Login error ]', error);
			res
				.status(500)
				.json({ message: 'Something went wrong. Try again later' });
		}
	}
}

export default new AuthController();
