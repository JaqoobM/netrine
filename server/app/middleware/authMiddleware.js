import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
	try {
		const decoded = jwt.verify(
			req.cookies.token,
			process.env.JWT_ACCESS_SECRET
		);

		req.userId = decoded.id;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Sesion expired' });
	}
}
