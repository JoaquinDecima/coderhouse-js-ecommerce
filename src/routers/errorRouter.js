import express from 'express';
import {logger} from '../model/tools/logger.js';

const errorRouter = express.Router();

errorRouter.get('/register', (req, res)=>{
	logger.info(`[GET] se ingreso en /error${req.url}`);
	res.render('errors/register');
});

export default errorRouter;