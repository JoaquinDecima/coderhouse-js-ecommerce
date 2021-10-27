import express from 'express';
import ProductManager from '../managers/productManager.js';

const productRouter = express.Router();
const productManager = new ProductManager();

// Retorno todos los productos
productRouter.get('/', (req, res, next) =>{
  res.send(productManager.getAllProducts());
})

// Retorno el producto con id :id
productRouter.get('/:id', function(req, res, next){
  res.send(productManager.getPorductByID(req.params.id));
});

// Retorno la id del producto creado
productRouter.post('/', function(req, res, next){
  const id = productManager.addProdcut(
    req.body.nombre,
    req.body.descripcion,
    req.body.codigo,
    req.body.foto,
    req.body.precio,
    req.body.stock);
  res.send({id});
});

// Elimina el porducto con id :id
productRouter.delete('/:id', function(req, res, next){
  res.send(productManager.removeProductById(req.params.id));
});

// Edita el producto con id :id
productRouter.put('/:id', function(req, res, next){
  if(productManager.editPorductByID(
    req.params.id,
    req.body.nombre,
    req.body.descripcion,
    req.body.codigo,
    req.body.foto,
    req.body.precio,
    req.body.stock)){
    res.send("");
  }else{
    res.send({error:'Producto no encontrado'});
  }
});

// Exporto la ruta necesaria
export default productRouter;
