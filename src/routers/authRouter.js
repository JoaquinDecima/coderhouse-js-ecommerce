import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import isNotAuthenticated from '../middleware/isNotAuthenticated.js';
import { logger } from '../tools/logger.js';

const authRouter = new express.Router();

authRouter.get('/register', isNotAuthenticated, (req, res) => {
	logger.info(`[GET] se ingreso a /auth${req.url}`);
	res.render('auth/register');
});

authRouter.get('/login', isNotAuthenticated, (req, res) => {
	logger.info(`[GET] se ingreso a /auth${req.url}`);
	res.render('auth/login');
});

authRouter.get('/logout', (req, res) => {
	res.render('auth/logout');
});

export default authRouter;
