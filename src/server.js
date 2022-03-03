import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'connect-flash';
import exphbs from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import globalRouter from './routers/globalRouter.js';
import {cartsData} from './instances.js';
import {logger} from './model/tools/logger.js';

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
app.use((req, res, next)=>{
	app.locals.notifyMenssaje = req.flash('notifyMenssaje');
	next();
});
app.use((req,res,next)=>{
	app.locals.session = req.session.passport;

	// Set session cart

	if(req.session.passport){
		cartsData.getCartByID(req.session.passport.user.email)
			.then(carts => {
				if (carts.length == 0){
					cartsData.addCart(req.session.passport.user.email)
						.then(() => {
							logger.info(`Se creo el carrito ${req.session.passport.user.email}`);
							next();
						})
						.catch(error => {
							logger.error(`Error al crear el carrito id ${req.session.passport.user.email} : ${error}`);
							next();
						});
				} else {
					app.locals.cart = carts[0];
					app.locals.cart.haveProducts = carts[0].products.length > 0;
					console.log(app.locals.cart);
					next();
				}
			})
			.catch(err => {
				logger.error(`Error al obtener el carrito id ${req.session.passport.user.email} : ${err}`);
				next();
			});
	}else {
		next();
	}


});

// Configuro la app Express (setters)
app.set('view engine', 'hbs');

// Configuro las Rutas
app.use('/', globalRouter);

// Inicio la Aplicacion
app.listen(PORT, () => {
	console.log(`Aplicacion inicio en http://localhost:${PORT}`);
});
