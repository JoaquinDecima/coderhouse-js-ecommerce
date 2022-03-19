import {validateToken} from '../tools/token.js';

export default function isAuthenticated(req, res, next) {
	try {
		if(validateToken(req.headers.token)){
			next();
		}else{
			res.status(401).send({
				error: 'Unauthorized',
				message: 'client failed to authenticate with the server'
			});
		}
	} catch(error) {
		res.status(409).send({
			error: 'Unauthorized',
			message: error
		});
	}
}