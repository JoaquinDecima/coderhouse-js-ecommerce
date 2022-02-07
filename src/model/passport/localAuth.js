import passport from 'passport';
import LocalStrategy from 'passport-local';
import { usersData } from '../../instances.js';
import { logger } from '../tools/logger.js';

// Registro local con Passport
passport.use('register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	let user = {
		email,
		name: req.name,
		lastname: req.lastname,
		phone: req.phone,
		img: req.img,
		address: req.address,
		age: req.age,
		password: password
	};

	if ([] == usersData.getUserByID(email)){
		req.flash('notifyMenssaje', `Usuraio ${email} ya tiene una cuenta creada, intente iniciar sesion.`);
		logger.warn(`Usuario ${email} ya existe`);
		return done(true,'Usuario Existente');
	}else{
		usersData.addUser(user)
			.then(()=>{
				req.flash('notifyMenssaje', `Usuraio ${email} registado con exito. Ya puedes iniciar sesion`);
				console.info(`Se registro exitosamente ${email}`);
				return done(null, user);
			})
			.catch(err => {
				req.flash('notifyMenssaje', `Usuraio ${email} no se pudo registar debido a un error en el servidor`);
				logger.error(`No se pudo registrar ${email} debido a ${err}`);
				return done(true, err);
			});
	}
}));

// Serializacion
passport.serializeUser((user, done)=>{
	return done(null, user._id);
});


// Deserializacion
passport.deserializeUser((id, done)=>{
	usersData.getUserByID(id)
		.then(user =>{
			return done(null, user[0]);
		})
		.catch(err => {
			return done(true, err);
		});
});