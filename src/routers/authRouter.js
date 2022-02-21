import express from 'express';
import isAuthenticated from '../model/middleware/isAuthenticated.js';
import isNotAuthenticated from '../model/middleware/isNotAuthenticated.js';
import {logger} from '../model/tools/logger.js';

const authRouter = new express.Router();

authRouter.get('/register', isNotAuthenticated, (req,res)=>{
	logger.info(`[GET] se ingreso a /auth${req.url}`);
	res.render('auth/register');
});

authRouter.get('/login', isNotAuthenticated, (req,res)=>{
	logger.info(`[GET] se ingreso a /auth${req.url}`);
	res.render('auth/login');
});

authRouter.get('/logout', isAuthenticated, (req,res)=>{
	req.flash('notifyMenssaje', `Adios ${req.session.passport.user.name}, esperamos que vuelvas pronto`);
	req.logout();
	res.redirect('/');
});

export default authRouter;