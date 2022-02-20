import express from 'express';
import {logger} from '../model/tools/logger.js';

const authRouter = new express.Router();

authRouter.get('/register', (req,res)=>{
	logger.info(`[GET] se ingreso a /auth${req.url}`);
	res.render('register');
});

export default authRouter;