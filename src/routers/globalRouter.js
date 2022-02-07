import express from 'express';
import { logger } from '../model/tools/logger.js';
import cartRouterAPI from './cartRouterAPI.js';
import productRouterAPI from './productRouterAPI.js';

const globalRouter = express.Router();

// Use other Routers
globalRouter.use('/api/carrito', cartRouterAPI);
globalRouter.use('/api/productos', productRouterAPI);

globalRouter.get('/', (req,res)=>{
	logger.info(`[GET] se ingreso en ${req.url}`);
	res.render('index');
});

// Se definen casos por defecto
globalRouter.get('*', (req, res) => {
	logger.warn(`[GET] Ruta no encontrada ${req.url}`);
	res.status(404).send({error:-2, descripcion:'Ruta no implementada'});
});

export default globalRouter;