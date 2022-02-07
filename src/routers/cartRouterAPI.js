import express from 'express';
import cartManager from '../model/cart/cartManager.js';
import {logger} from '../model/tools/logger.js';

const cartRouterAPI = express.Router();

// Crea un carrito nuevo y retorna su ID
cartRouterAPI.post('/', function(req, res){
	const id = cartManager.addCart();
	res.send({id});
});

// Elimina el carrito con id :id
cartRouterAPI.delete('/:id', function(req, res){
	logger.info(`[DELETE] se ingreso en ${req.url}`);
	res.send(cartManager.removeCartById(req.params.id));
});

// Retorna los productos del carrito con id :id
cartRouterAPI.get('/:id/productos', function(req, res){
	logger.info(`[GET] se ingreso en ${req.url}`);
	res.send(cartManager.getProductsOfCartWhitID(req.params.id));
});

// Agrega el producto con id productID al carrito con id :id
cartRouterAPI.post('/:id/productos', function(req, res){
	logger.info(`[POST] se ingreso en ${req.url}`);
	res.send(cartManager.addProductsOfCartWhitID(req.params.id, req.body.productID));
});

// Remueve los productos con id id_prod del carrito con id :id
cartRouterAPI.delete('/:id/productos/:id_prod', function(req, res){
	logger.info(`[DELETE] se ingreso en ${req.url}`);
	res.send(cartManager.removeProductsOfCartWhitID(req.params.id, req.params.id_prod));
});

// Exporto ruta
export default cartRouterAPI;
