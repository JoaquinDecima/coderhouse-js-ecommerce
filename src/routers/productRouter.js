import express from 'express';
import productManager from '../model/product/productManager.js';
import { isAdmin } from '../utils/userRank.js';

const productRouter = express.Router();

// Retorno todos los productos
productRouter.get('/', (req, res) =>{
	res.send(productManager.getAllProducts());
});

// Retorno el producto con id :id
productRouter.get('/:id', function(req, res){
	res.send(productManager.getPorductByID(req.params.id));
});

// Retorno la id del producto creado
productRouter.post('/', function(req, res){
	if (isAdmin('')) {
		const id = productManager.addProdcut(
			req.body.nombre,
			req.body.descripcion,
			req.body.codigo,
			req.body.foto,
			req.body.precio,
			req.body.stock);
		res.send({id});
	}else {
		res.send({error:-1, descripcion:'ruta /api/products/:id con metodo POST no autorizada'});
	}
});

// Elimina el porducto con id :id
productRouter.delete('/:id', function(req, res){
	if (true) {
		res.send(productManager.removeProductById(req.params.id));
	}else {
		res.send({error:-1, descripcion:'ruta /api/products/:id con metodo DELETE no autorizada'});
	}
});

// Edita el producto con id :id
productRouter.put('/:id', function(req, res){
	if (true) {
		if(productManager.editPorductByID(
			req.params.id,
			req.body.nombre,
			req.body.descripcion,
			req.body.codigo,
			req.body.foto,
			req.body.precio,
			req.body.stock)){
			res.send('');
		}else{
			res.send({error:'Producto no encontrado'});
		}
	} else {
		res.send({error:-1, descripcion:'ruta /api/products/:id con metodo PUT no autorizada'});
	}

});

// Exporto la ruta necesaria
export default productRouter;
