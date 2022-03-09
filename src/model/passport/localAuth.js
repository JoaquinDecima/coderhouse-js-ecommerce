import bcrypt from 'bcrypt';
import md5 from 'md5';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import 'dotenv/config';
import { usersData } from '../../instances.js';
import { logger } from '../tools/logger.js';
import sendMail from '../tools/sendMail.js';
import {register} from '../tools/writeMail.js';

// Registro local con Passport
passport.use('register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	let newUser = {
		email,
		name: req.body.name,
		lastname: req.body.lastname,
		phone: req.body.phone,
		avatar: md5(req.body.name+req.body.lastname),
		address: req.body.address,
		age: req.body.age,
		isSeller : req.body.seller == 'on',
		password: bcrypt.hashSync(password, 2)
	};
	usersData.getUserByID(email)
		.then(user => {
			if (user.length > 0){
				req.flash('notifyMenssaje', `Usuraio ${email} ya tiene una cuenta creada, intente iniciar sesion.`);
				logger.warn(`Usuario ${email} ya existe`);
				return done(false, false);
			}else{
				usersData.addUser(newUser)
					.then(()=>{
						req.flash('notifyMenssaje', `Usuraio ${email} registado con exito. Ya puedes iniciar sesion`);
						logger.info(`Se registro exitosamente ${email}`);
						sendMail(register(newUser),'osbaldo.ferry4@ethereal.email',email,'Nuevo usuario Registrado');
						return done(null, newUser);
					})
					.catch(err => {
						req.flash('notifyMenssaje', `Usuraio ${email} no se pudo registar debido a un error en el servidor`);
						logger.error(`No se pudo registrar ${email} debido a ${err}`);
						return done(false, false);
					});
			}
		})
		.catch(err=>{
			req.flash('notifyMenssaje', `Usuraio ${email} no se pudo registar debido a un error en el servidor`);
			logger.error(`No se pudo registrar ${email} debido a ${err}`);
			return done(false, false);
		});

}));

passport.use('login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},(req, email, password, done)=>{
	usersData.getUserByID(email)
		.then(user =>{
			if (user.length > 0 && bcrypt.compareSync(password, user[0].password)){
				req.flash('notifyMenssaje', `Bienvenido ${user[0].name}`);
				logger.info(`${email} Ingreso correctamente`);
				return done(null, user[0]);
			}else{
				req.flash('notifyMenssaje', 'Usuario o contraseña incorrecta');
				logger.warn(`Ususario o contraseña incorrecta para ${email}`);
				return done(false, false);
			}
		})
		.catch(err =>{
			req.flash('notifyMenssaje', `Ocurrio un error al intentar ingresar con ${email} por favor intente nuevamente`);
			logger.error(`No se pudo iniciar session con ${email} debido a ${err}`);
			return done(false, false);
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