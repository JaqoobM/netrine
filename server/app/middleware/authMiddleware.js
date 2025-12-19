import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
	try {
		const decoded = jwt.verify(
			req.cookies.token,
			process.env.JWT_ACCESS_SECRET
		);

		req.userId = decoded.data.id;
		next();
	} catch (error) {
		console.log(error);
	}
}
