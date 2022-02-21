import express from 'express';
import { logger } from '../model/tools/logger.js';
import authRouter from './authRouter.js';
import authRouterAPI from './authRouterAPI.js';
import cartRouterAPI from './cartRouterAPI.js';
import productRouterAPI from './productRouterAPI.js';
import errorRouter from './errorRouter.js';
import productRouter from './productRouter.js';


const globalRouter = express.Router();

// Use other Routers
globalRouter.use('/api/auth/', authRouterAPI);
globalRouter.use('/api/cart', cartRouterAPI);
globalRouter.use('/api/products', productRouterAPI);
globalRouter.use('/products/', productRouter);
globalRouter.use('/auth/', authRouter);
globalRouter.use('/error/', errorRouter);

globalRouter.get('/', (req,res)=>{
	logger.info(`[GET] se ingreso en ${req.url}`);
	res.render('index');
});

// Se definen casos por defecto
globalRouter.get('*', (req, res) => {
	logger.warn(`[GET] Ruta no encontrada ${req.url}`);
	res.status(404).render('errors/404');
});

export default globalRouter;