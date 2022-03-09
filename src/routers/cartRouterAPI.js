import express from 'express';
import {logger} from '../model/tools/logger.js';
import {cartsData} from '../instances.js';

const cartRouterAPI = express.Router();

// Crea un carrito nuevo y retorna su ID
cartRouterAPI.post('/', function(req, res){
	logger.info(`[POST] se ingreso en /api/cart${req.url}`);
	cartsData.addCart(req.body.id)
		.then(()=>{
			res.status(202).send({id : req.body.id});
		})
		.catch(err=>{
			logger.error(`Error: ${err} al intentar Crear el carrito ${req.body.id}`);
		});

});

// Elimina el carrito con id :id
cartRouterAPI.delete('/:id', function(req, res){
	logger.info(`[DELETE] se ingreso en /api/cart${req.url}`);
	cartsData.removeCartById(req.params.id)
		.then(result =>{
			logger.info(`Se Borro correctamente carrito ${req.params.id} - ${result}`);
			res.status(204).send();
		})
		.catch(err => {
			logger.error(`Error: ${err} al intentar Borrar el carrito ${req.params.id}`);
			res.status(502).send(err);
		});
});

// Retorna los productos del carrito con id :id
cartRouterAPI.get('/:id/productos', function(req, res){
	logger.info(`[GET] se ingreso en /api/cart${req.url}`);
	cartsData.getProductsOfCartWhitID(req.params.id)
		.then(result =>{
			logger.info(`Se obtubieron correctamente los productos del carrito ${req.params.id} - ${result}`);
			res.send(result);
		})
		.catch(err => {
			logger.error(`Error: ${err} al obtener productos de ${req.params.id}`);
			res.status(502).send(err);
		});
});

// Agrega el producto con id productID al carrito con id :id
cartRouterAPI.post('/:id/productos', function(req, res){
	logger.info(`[POST] se ingreso en /api/cart${req.url}`);
	cartsData.addProductsOfCartWhitID(req.params.id, req.body.productID)
		.then(result => {
			logger.info(`Se agrego correctamente producto ${req.body.productID} al carrito ${req.params.id} - ${result}`);
			res.status(204).send();
		})
		.catch(err => {
			logger.error(`Error: ${err} al agregar producto en ${req.params.id}`);
			res.status(502).send(err);
		});
});

// Remueve los productos con id id_prod del carrito con id :id
cartRouterAPI.delete('/:id/productos/:id_prod', function(req, res){
	logger.info(`[DELETE] se ingreso en /api/cart${req.url}`);
	cartsData.removeProductsOfCartWhitID(req.params.id, req.params.id_prod)
		.then(result => {
			logger.info(`Se borró correctamente producto ${req.params.id_prod} al carrito ${req.params.id} - ${result}`);
			res.status(204).send();
		})
		.catch(err => {
			logger.error(`Error: ${err} al agregar producto en ${req.params.id}`);
			res.status(502).send(err);
		});
});

// Exporto ruta
export default cartRouterAPI;
