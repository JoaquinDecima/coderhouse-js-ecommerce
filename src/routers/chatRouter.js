import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';

const chatRouter = new express.Router();

chatRouter.get('', (req, res) => {
	res.render('chat/index');
});

export default chatRouter;
