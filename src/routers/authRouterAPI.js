import express from 'express';
import passport from 'passport';
import '../model/passport/localAuth.js';

const authRouterAPI = express.Router();

authRouterAPI.post('/register/', passport.authenticate('register',{
	successRedirect: '/',
	failureRedirect: '/error/register',
	passReqToCallBack: true
}));

export default authRouterAPI;