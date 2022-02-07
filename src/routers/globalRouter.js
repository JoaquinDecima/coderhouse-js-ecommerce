import express from 'express';
import cartRouterAPI from './cartRouterAPI.js';
import productRouterAPI from './productRouterAPI.js';

const globalRouter = express.Router();

// Use other Routers
globalRouter.use('/api/carrito', cartRouterAPI);
globalRouter.use('/api/productos', productRouterAPI);

globalRouter.get('/', (req,res)=>{
	res.render('index');
});

// Se definen casos por defecto
globalRouter.get('*', (req, res) => {
	res.status(404).send({error:-2, descripcion:'Ruta no implementada'});
});

export default globalRouter;