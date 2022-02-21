export default function isSeller(req, res, next) {
	if (req.isAuthenticated() && req.session.express.user.isSeller){
		return next();
	}
	res.redirect('/error/permisos');
}