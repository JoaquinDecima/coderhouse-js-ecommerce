import cookieParser from 'cookie-parser';
import express from 'express';
import compression from 'compression';
import cluster from 'cluster';
import flash from 'connect-flash';
import exphbs from 'express-handlebars';
import minimist from 'minimist';
import os from 'os';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import globalRouter from './routers/globalRouter.js';
import notify from './middleware/notify.js';
import sessionData from './middleware/sessionData.js';
import {logger} from './tools/logger.js';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import {chatData} from './instances.js';

// SetUp del entorno
const nodeParams = minimist(process.argv.slice(2));
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

// Configuro la App Express (middlewares)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine('hbs', exphbs ({
	extname: 'hbs',
	defaultLayout: 'index.hbs'
}));
// Init Session
app.use(session({
	secret: process.env.SECRET_SESSION,
	resave: true,
	saveUninitialized: false
}));
app.use(compression());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(notify);
app.use(sessionData);

// Configuro la app Express (setters)
app.set('view engine', 'hbs');

// Configuro las Rutas
app.use('/', globalRouter);

io.on('connection', socket =>{

	// Se conecta y recive todo el historial de mensajes
	socket.emit('update-menssajes', chatData.getAllMenssage());

	// Agrego mensaje y envio propago Mensajes
	socket.on('add-menssaje', data => {
		console.log(data);
		chatData.addMenssage({
			author : {
				email: data.email,
				nombre: data.name,
				avatar: data.avatar
			},
			menssaje : data.mensaje,
			date : new Date()
		})
			.then(() => socket.emit('update-menssajes', chatData.getAllMenssage()))
			.catch (err => {
				logger.error(`Error: ${err} al agregar mensaje`);
			});
	});
});


// Inicio la Aplicacion
if (nodeParams.modo == 'cluster' && cluster.isPrimary){
	console.log(`PID MASTER ${process.pid}`);

	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died [${code}] - ${signal}`);
		cluster.fork();
	});
} else {
	const conectedServer = httpServer.listen((parseInt(process.argv[2]) || PORT), err => {
		if (!err){
			console.log(`Inicio pode verlo en http://localhost:${(parseInt(process.argv[2]) || PORT)} [${process.pid}]`);
		}
	});

	conectedServer.on('error', error => logger.error(`error en servidor ${error}`));
}