export default function sessionData(req, res, next){
	res.locals.session = req.session.passport;
	next();
}