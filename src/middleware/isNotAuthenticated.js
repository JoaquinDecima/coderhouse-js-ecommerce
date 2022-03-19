import {validateToken} from '../tools/token.js';

export default function isNotAuthenticated(req, res, next) {
	try {
		if(!validateToken(req.headers.token)){
			next();
		}else{
			res.redirect('/');
		}
	} catch(error) {
		next();
	}
}