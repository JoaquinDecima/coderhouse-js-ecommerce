import {cartsData} from '../../instances.js';
import {logger} from '../tools/logger.js';

export default function sessionData(req, res, next){
	res.locals.session = req.session.passport;

	// Set session cart

	if(req.session.passport){
		cartsData.getCartByID(req.session.passport.user.email)
			.then(carts => {
				if (carts.length == 0){
					cartsData.addCart(req.session.passport.user.email)
						.then(() => {
							logger.info(`Se creo el carrito ${req.session.passport.user.email}`);
							next();
						})
						.catch(error => {
							logger.error(`Error al crear el carrito id ${req.session.passport.user.email} : ${error}`);
							next();
						});
				} else {
					res.locals.cart = carts[0];
					res.locals.cart.haveProducts = carts[0].products.length > 0;
					next();
				}
			})
			.catch(err => {
				logger.error(`Error al obtener el carrito id ${req.session.passport.user.email} : ${err}`);
				next();
			});
	}else {
		next();
	}
}