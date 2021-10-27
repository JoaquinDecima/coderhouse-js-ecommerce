import express from 'express';
import CartManager from '../managers/cartManager.js';

const cartRouter = express.Router();
const cartManager = new CartManager;

// Crea un carrito nuevo y retorna su ID
cartRouter.post('/', function(req, res, next){
  const id = cartManager.addCart();
  res.send({id});
});

// Exporto ruta
export default cartRouter;
