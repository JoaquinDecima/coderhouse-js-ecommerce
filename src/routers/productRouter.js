import express from 'express';
import {productsData} from '../instances.js';
import {logger} from '../model/tools/logger.js';

const productRouter = express.Router();

productRouter.get('/', (req, res)=>{
	productsData.getAllProducts()
		.then(products => {
			res.render('products', products);
		})
		.catch(error => {
			logger.error(`No se puedo mostrar productos debiado a ${error}`);
			res.redirect('/404');
		});

});

export default productRouter;