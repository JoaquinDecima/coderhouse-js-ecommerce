import { cartsData } from '../../instances.js';
import { logger } from './logger.js';

export default function getCart(id){
	cartsData.getCartByID(id)
		.then(carts => {
			if (carts.length == 0){
				cartsData.addCart(id)
					.then(() => {
						return getCart(id); // Aplico recursividad
					})
					.catch(error => {
						logger.error(`Error al crear el carrito id ${id} : ${error}`);
					});
			} else {
				return carts[0];
			}
		})
		.catch(err => {
			logger.error(`Error al obtener el carrito id ${id} : ${err}`);
		});
}

