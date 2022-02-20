import express from 'express';
import {logger} from '../model/tools/logger.js';

const authRouter = new express.Router();

authRouter.get('/register', (req,res)=>{
	logger.info(`[GET] se ingreso a /auth${req.url}`);
	res.render('register');
});

authRouter.get('/login', (req,res)=>{
	logger.info(`[GET] se ingreso a /auth${req.url}`);
	res.render('login');
});

export default authRouter;