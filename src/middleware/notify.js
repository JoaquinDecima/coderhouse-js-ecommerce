export default function notify(req, res, next){
	res.locals.notifyMenssaje = req.flash('notifyMenssaje');
	next();
}