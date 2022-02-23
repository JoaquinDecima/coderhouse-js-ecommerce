import express from 'express';
import isNotAuthenticated from '../model/middleware/isNotAuthenticated.js';
import {logger} from '../model/tools/logger.js';

const errorRouter = express.Router();

errorRouter.get('/register', isNotAuthenticated, (req, res)=>{
	logger.info(`[GET] se ingreso en /error${req.url}`);
	res.render('errors/register');
});

errorRouter.get('/login', isNotAuthenticated, (req, res)=>{
	logger.info(`[GET] se ingreso en /error${req.url}`);
	res.render('errors/login');
});

errorRouter.get('/permisos', (req, res)=>{
	logger.info(`[GET] se ingreso en /error${req.url}`);
	res.render('errors/permisos');
});

errorRouter.get('/addproduct', (req, res)=>{
	logger.info(`[GET] se ingreso en /error${req.url}`);
	res.render('errors/addproduct');
});

export default errorRouter;