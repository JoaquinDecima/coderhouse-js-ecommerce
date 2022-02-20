import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import 'dotenv/config';
import { usersData } from '../../instances.js';
import { logger } from '../tools/logger.js';

// Registro local con Passport
passport.use('register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	console.log(req.body);
	let newUser = {
		email,
		name: req.body.name,
		lastname: req.body.lastname,
		phone: req.body.phone,
		img: req.body.img,
		address: req.body.address,
		age: req.body.age,
		password: bcrypt.hashSync(password, 20)
	};
	usersData.getUserByID(email)
		.then(user => {
			console.log(user);
			if (user.length > 0){
				req.flash('notifyMenssaje', `Usuraio ${email} ya tiene una cuenta creada, intente iniciar sesion.`);
				logger.warn(`Usuario ${email} ya existe`);
				return done(false,'Usuario Existente');
			}else{
				usersData.addUser(newUser)
					.then(()=>{
						req.flash('notifyMenssaje', `Usuraio ${email} registado con exito. Ya puedes iniciar sesion`);
						console.info(`Se registro exitosamente ${email}`);
						return done(null, newUser);
					})
					.catch(err => {
						req.flash('notifyMenssaje', `Usuraio ${email} no se pudo registar debido a un error en el servidor`);
						logger.error(`No se pudo registrar ${email} debido a ${err}`);
						return done(false, err);
					});
			}
		})
		.catch(err=>{
			req.flash('notifyMenssaje', `Usuraio ${email} no se pudo registar debido a un error en el servidor`);
			logger.error(`No se pudo registrar ${email} debido a ${err}`);
			return done(false, err);
		});

}));

// Serializacion
passport.serializeUser((user, done)=>{
	return done(null, user);
});


// Deserializacion
passport.deserializeUser((user, done)=>{
	return done(null, user);
});