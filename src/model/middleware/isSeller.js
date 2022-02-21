export default function isSeller(req, res, next) {
	if (req.isAuthenticated() && req.session.passport.user.isSeller){
		return next();
	}
	res.redirect('/error/permisos');
}