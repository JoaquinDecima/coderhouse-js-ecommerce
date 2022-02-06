import express from 'express';
import exphbs from 'express-handlebars';
import cartRouterAPI from './routers/cartRouterAPI.js';
import productRouterAPI from './routers/productRouterAPI.js';

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

// Configuro la app Express (setters)
app.set('view engine', 'hbs');

// Configuro las Rutas
app.use('/api/carrito', cartRouterAPI);
app.use('/api/productos', productRouterAPI);

app.get('/', (req,res)=>{
	res.render('index');
});

// Se definen casos por defecto
app.get('*', (req, res) => {
	res.status(404).send({error:-2, descripcion:'Ruta no implementada'});
});

// Inicio la Aplicacion
app.listen(PORT, () => {
	console.log(`Aplicacion inicio en http://localhost:${PORT}`);
});
