import express from 'express';
import md5 from 'md5';
import multer from 'multer';
import passport from 'passport';
import '../middleware/passport/localAuth.js';

const storage = multer.diskStorage({
	destination: './public/img/profile',
	filename: function (req, file, cb) {
		cb(null, md5(req.body.name+req.body.lastname));
	}
});

const upload = multer({ storage });

const authRouterAPI = express.Router();

authRouterAPI.post('/register/', upload.single('avatar'), passport.authenticate('register',{
	successRedirect: '/',
	failureRedirect: '/error/register',
	passReqToCallBack: true
}));

authRouterAPI.post('/login/', passport.authenticate('login',{
	successRedirect: '/',
	failureRedirect: '/error/login',
	passReqToCallBack: true
}));

export default authRouterAPI;