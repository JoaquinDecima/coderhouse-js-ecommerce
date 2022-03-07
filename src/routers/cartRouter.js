import express from 'express';
import isAuthenticated from '../model/middleware/isAuthenticated.js';

const cartRouter = new express.Router();

cartRouter.get('', isAuthenticated, (req, res) => {
	res.render('cart/index');
});

export default cartRouter;