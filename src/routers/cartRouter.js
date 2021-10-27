import express from 'express';
import cartManager from '../managers/cartManager.js';

const cartRouter = express.Router();

// Crea un carrito nuevo y retorna su ID
cartRouter.post('/', function(req, res, next){
  const id = cartManager.addCart();
  res.send({id});
});

// Elimina el carrito con id :id
cartRouter.delete('/:id', function(req, res, next){
  res.send(cartManager.removeCartById(req.params.id));
});

// Retorna los productos del carrito con id :id
cartRouter.get('/:id/productos', function(req, res, next){
  res.send(cartManager.getProductsOfCartWhitID(req.params.id));
});

// Agrega el producto con id productID al carrito con id :id
cartRouter.post('/:id/productos', function(req, res, next){
  res.send(cartManager.addProductsOfCartWhitID(req.params.id, req.body.productID));
});

// Remueve los productos con id id_prod del carrito con id :id
cartRouter.delete('/:id/productos/:id_prod', function(req, res, next){
  res.send(cartManager.removeProductsOfCartWhitID(req.params.id, req.params.id_prod));
});

// Exporto ruta
export default cartRouter;
