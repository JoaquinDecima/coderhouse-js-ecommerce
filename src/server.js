import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'connect-flash';
import exphbs from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import globalRouter from './routers/globalRouter.js';
import notify from './model/middleware/notify.js';
import sessionData from './model/middleware/sessionData.js';

// SetUp del entorno
const app = express();
const PORT = process.env.PORT || 8080;

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

// Inicio la Aplicacion
app.listen(PORT, () => {
	console.log(`Aplicacion inicio en http://localhost:${PORT}`);
});
