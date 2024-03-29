import express from 'express';
import md5 from 'md5';
import multer from 'multer';
import { canSell } from '../tools/userRank.js';
import { logger } from '../tools/logger.js';
import { productsData } from '../instances.js';

const storage = multer.diskStorage({
	destination: './public/img/productos',
	filename: function (req, file, cb) {
		cb(null, md5(req.body.name + req.body.codigo));
	},
});
const upload = multer({ storage });

const productRouterAPI = express.Router();

// Retorno todos los productos
productRouterAPI.get('/', (req, res) => {
	productsData
		.getAllProducts()
		.then((listproducts) => {
			logger.info(`[GET] se ingreso en /api/products${req.url}`);
			res.send(listproducts);
		})
		.catch((error) => {
			logger.error(
				`[GET] no se pudo ingresar en /api/products${req.url} debido a ${error}`
			);
			res.status(500);
		});
});

// Retorno el producto con id :id
productRouterAPI.get('/:id', function (req, res) {
	productsData
		.getPorductByID(req.params.id)
		.then((product) => {
			logger.info(`[GET] se ingreso en /api/products${req.url}`);
			res.send(product[0]);
		})
		.catch((error) => {
			logger.error(
				`[GET] no se pudo ingresar en /api/products${req.url} debido a ${error}`
			);
			res.status(500);
		});
});

productRouterAPI.post('/', upload.single('foto'), function (req, res) {
	logger.info(`[POST] se ingreso en /api/products${req.url}`);
	console.log(req);
	if (canSell(req.session.passport.user)) {
		productsData
			.getPorductByID(req.body.codigo)
			.then((product) => {
				if (product.length > 0) {
					logger.error(
						`No se agrego producto ${req.body.codigo} debido a que el SKU ya existe`
					);
					res.redirect('/error/addproduct');
				} else {
					productsData
						.addProdcut(
							req.body.nombre,
							req.body.descripcion,
							req.body.codigo,
							md5(req.body.name + req.body.codigo),
							req.body.precio,
							req.body.stock
						)
						.then(() => {
							logger.info(
								`Se agrego producto ${req.body.codigo}`
							);
							res.redirect('/');
						})
						.catch((error) => {
							logger.error(
								`No se agrego producto ${req.body.codigo} debido a ${error}`
							);
							res.redirect('/error/addproduct');
						});
				}
			})
			.catch((error) => {
				logger.error(
					`No se agrego producto ${req.body.codigo} debido a ${error}`
				);
				res.redirect('/error/addproduct');
			});
	} else {
		logger.warn(`[POST] No Autorizado /api/products${req.url}`);
		res.redirect('/error/addproduct');
	}
});

// Elimina el porducto con id :id
productRouterAPI.delete('/:id', function (req, res) {
	logger.info(`[DELETE] se ingreso en /api/products${req.url}`);
	if (canSell(req.session.passport.user)) {
		res.send(productsData.removeProductById(req.params.id));
	} else {
		logger.warn(`[DELETE] No autorizado /api/products${req.url}`);
		res.send({
			error: -1,
			descripcion:
				'ruta /api/products/:id con metodo DELETE no autorizada',
		});
	}
});

// Edita el producto con id :id
productRouterAPI.put('/:id', function (req, res) {
	logger.info(`[PUT] se ingreso en /api/products${req.url}`);
	if (canSell(req.session.passport.user)) {
		if (
			productsData.editPorductByID(
				req.params.id,
				req.body.nombre,
				req.body.descripcion,
				req.body.codigo,
				req.body.foto,
				req.body.precio,
				req.body.stock
			)
		) {
			res.send('');
		} else {
			logger.error(`[PUT] Error en /api/products${req.url}`);
			res.send({ error: 'Producto no encontrado' });
		}
	} else {
		logger.warn(`[PUT] no autorizado /api/products${req.url}`);
		res.send({
			error: -1,
			descripcion: 'ruta /api/products/:id con metodo PUT no autorizada',
		});
	}
});

// Exporto la ruta necesaria
export default productRouterAPI;
