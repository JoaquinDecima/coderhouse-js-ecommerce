import express from 'express';
import { logger } from '../tools/logger.js';
import authRouter from './authRouter.js';
import errorRouter from './errorRouter.js';
import productRouter from './productRouter.js';
import globalRouterAPI from './globalRouterAPI.js';
import cartRouter from './cartRouter.js';
import chatRouter from './chatRouter.js';
import minimist from 'minimist';
import os from 'os';

const nodeParams = minimist(process.argv.slice(2));
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

globalRouter.get('/serverinfo/', (req, res) => {
	logger.info(`[GET] se ingreso en ${req.url}`);
	res.render('server',{
		args: JSON.stringify(nodeParams),
		platform: process.platform,
		process_id: process.pid,
		folder: process.env.PWD,
		node_version: process.versions.node,
		memory: process.memoryUsage().rss,
		cores: os.cpus().length
	});
});

// Se definen casos por defecto
globalRouter.get('*', (req, res) => {
	logger.warn(`[GET] Ruta no encontrada ${req.url}`);
	res.status(404).render('errors/404');
});

export default globalRouter;