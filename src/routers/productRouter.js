import express from 'express';
import { productsData } from '../instances.js';
import isSeller from '../model/middleware/isSeller.js';
import { logger } from '../model/tools/logger.js';

const productRouter = express.Router();

productRouter.get('/', (req, res)=>{
	productsData.getAllProducts()
		.then(products => {
			res.render('products/index', products);
		})
		.catch(error => {
			logger.error(`No se puedo mostrar productos debiado a ${error}`);
			res.redirect('/404');
		});
});

productRouter.get('/add/', isSeller, (req, res)=>{
	res.render('products/add');
});

export default productRouter;