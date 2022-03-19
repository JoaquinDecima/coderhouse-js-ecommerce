import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';

const cartRouter = new express.Router();

cartRouter.get('', (req, res) => {
	res.render('cart/index');
});

export default cartRouter;