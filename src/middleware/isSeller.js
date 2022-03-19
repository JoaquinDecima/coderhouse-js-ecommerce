import {usersData} from '../instances.js';
import {getIDInSession} from '../tools/token.js';

export default function isSeller(req, res, next) {
	usersData.getUserByID(getIDInSession(req.headers.token))
		.then(user => {
			if (user.isSeller){
				next();
			}
			res.redirect('/error/permisos');
		})
		.catch(()=>{
			res.redirect('/error/permisos');
		});

}