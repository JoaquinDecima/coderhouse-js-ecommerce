import express from 'express';
import { logger } from '../tools/logger.js';
import authRouter from './authRouter.js';
import errorRouter from './errorRouter.js';
import productRouter from './productRouter.js';
import globalRouterAPI from './globalRouterAPI.js';
import cartRouter from './cartRouter.js';
import chatRouter from './chatRouter.js';


const globalRouter = express.Router();

// Use other Routers
globalRouter.use('/api/', globalRouterAPI);
globalRouter.use('/products/', productRouter);
globalRouter.use('/cart/', cartRouter);
globalRouter.use('/chat/', chatRouter);
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