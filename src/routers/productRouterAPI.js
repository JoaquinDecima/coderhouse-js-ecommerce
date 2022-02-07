import express from 'express';
import productManager from '../model/product/productManager.js';
import { isAdmin } from '../model/tools/userRank.js';
import { logger } from '../model/tools/logger.js';

const productRouterAPI = express.Router();

// Retorno todos los productos
productRouterAPI.get('/', (req, res) =>{
	logger.info(`[GET] se ingreso en /api/products${req.url}`);
	res.send(productManager.getAllProducts());
});

// Retorno el producto con id :id
productRouterAPI.get('/:id', function(req, res){
	logger.info(`[GET] se ingreso en /api/products${req.url}`);
	res.send(productManager.getPorductByID(req.params.id));
});

// Retorno la id del producto creado
productRouterAPI.post('/', function(req, res){
	logger.info(`[POST] se ingreso en /api/products${req.url}`);
	if (isAdmin('')) {
		const id = productManager.addProdcut(
			req.body.nombre,
			req.body.descripcion,
			req.body.codigo,
			req.body.foto,
			req.body.precio,
			req.body.stock);
		res.send({id});
	}else {
		logger.warn(`[POST] No Autorizado /api/products${req.url}`);
		res.send({error:-1, descripcion:'ruta /api/products/:id con metodo POST no autorizada'});
	}
});

// Elimina el porducto con id :id
productRouterAPI.delete('/:id', function(req, res){
	logger.info(`[DELETE] se ingreso en /api/products${req.url}`);
	if (true) {
		res.send(productManager.removeProductById(req.params.id));
	}else {
		logger.warn(`[DELETE] No autorizado /api/products${req.url}`);
		res.send({error:-1, descripcion:'ruta /api/products/:id con metodo DELETE no autorizada'});
	}
});

// Edita el producto con id :id
productRouterAPI.put('/:id', function(req, res){
	logger.info(`[PUT] se ingreso en /api/products${req.url}`);
	if (true) {
		if(productManager.editPorductByID(
			req.params.id,
			req.body.nombre,
			req.body.descripcion,
			req.body.codigo,
			req.body.foto,
			req.body.precio,
			req.body.stock)){
			res.send('');
		}else{
			logger.error(`[PUT] Error en /api/products${req.url}`);
			res.send({error:'Producto no encontrado'});
		}
	} else {
		logger.warn(`[PUT] no autorizado /api/products${req.url}`);
		res.send({error:-1, descripcion:'ruta /api/products/:id con metodo PUT no autorizada'});
	}

});

// Exporto la ruta necesaria
export default productRouterAPI;
