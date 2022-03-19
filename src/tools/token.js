import jwt from 'jsonwebtoken';

export function createToken(data){
	return jwt.sign(
		{
			data
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1d'
		});
}

export function validateToken(token){
	return jwt.verify(token, process.env.JWT_SECRET);
}

export function getIDInSession(token){
	return jwt.verify(token, process.env.JWT_SECRET).data.id;
}