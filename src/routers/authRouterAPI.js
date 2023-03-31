import express from 'express';
import md5 from 'md5';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { usersData } from '../instances.js';
import { logger } from '../tools/logger.js';
import sendMail from '../tools/sendMail.js';
import { register } from '../tools/writeMail.js';
import { createToken, getIDInSession } from '../tools/token.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const storage = multer.diskStorage({
	destination: './public/img/profile',
	filename: function (req, file, cb) {
		cb(null, md5(req.body.name + req.body.lastname));
	},
});

const upload = multer({ storage });

const authRouterAPI = express.Router();

authRouterAPI.post('/register/', upload.single('avatar'), (req, res) => {
	let newUser = {
		email: req.body.email,
		name: req.body.name,
		lastname: req.body.lastname,
		phone: req.body.phone,
		avatar: md5(req.body.name + req.body.lastname),
		address: req.body.address,
		age: req.body.age,
		isSeller: req.body.seller == 'on',
		password: bcrypt.hashSync(req.body.password, 2),
	};

	usersData
		.getUserByID(req.body.email)
		.then((user) => {
			if (user.length > 0) {
				logger.warn(`Usuario ${req.body.email} ya existe`);
				res.redirect('/error/register');
			} else {
				usersData
					.addUser(newUser)
					.then(() => {
						logger.info(
							`Se registro exitosamente ${req.body.email}`
						);
						sendMail(
							register(newUser),
							'osbaldo.ferry4@ethereal.email',
							req.body.email,
							'Nuevo usuario Registrado'
						);
						res.redirect('/');
					})
					.catch((err) => {
						logger.error(
							`No se pudo registrar ${req.body.email} debido a ${err}`
						);
						res.redirect('/error/register');
					});
			}
		})
		.catch((err) => {
			logger.error(
				`No se pudo registrar ${req.body.email} debido a ${err}`
			);
			res.status(500).send({
				error: 'Internal Server Error',
				descripcion: err,
			});
		});
});

// Inicio de session
authRouterAPI.post('/login/', (req, res) => {
	usersData
		.getUserByID(req.body.email)
		.then((user) => {
			if (
				user.length > 0 &&
				bcrypt.compareSync(req.body.password, user[0].password)
			) {
				logger.info(`${req.body.email} Ingreso correctamente`);
				res.send({
					token: createToken({ id: user[0]._id }),
				});
			} else {
				logger.warn(
					`Ususario o contraseña incorrecta para ${req.body.email}`
				);
				res.status(400).send({
					error: 'Bad Request',
					descripcion: 'Usuario o contraseña invalido',
				});
			}
		})
		.catch((err) => {
			logger.error(
				`No se pudo iniciar session con ${req.body.email} debido a ${err}`
			);
			res.status(500).send({
				error: 'Internal Server Error',
				descripcion: err,
			});
		});
});

authRouterAPI.get('/', isAuthenticated, (req, res) => {
	usersData
		.getUserByID(getIDInSession(req.headers.token))
		.then((user) => {
			delete user[0].password;
			res.send(user[0]);
		})
		.catch((err) => {
			logger.error(`No se pudo recuperar usuario debido a ${err}`);
			res.status(500).send({
				error: 'Internal Server Error',
				descripcion: err,
			});
		});
});

export default authRouterAPI;
