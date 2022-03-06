import express from 'express';
import { productsData } from '../instances.js';
import isSeller from '../model/middleware/isSeller.js';
import { logger } from '../model/tools/logger.js';

const productRouter = express.Router();

productRouter.get('/', (req, res)=>{
	res.render('products/index');
});

productRouter.get('/add/', isSeller, (req, res)=>{
	res.render('products/add');
});

productRouter.get('/:id', (req, res)=>{
	productsData.getPorductByID(req.params.id)
		.then(products => {
			res.render('products/product', {product: products[0]});
		})
		.catch(error => {
			logger.error(`No se puedo mostrar producto debiado a ${error}`);
			res.redirect('/404');
		});
});

export default productRouter;