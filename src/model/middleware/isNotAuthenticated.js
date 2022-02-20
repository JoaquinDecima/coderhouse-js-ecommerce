export default function isNotAuthenticated(req, res, next) {
	if (!req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}