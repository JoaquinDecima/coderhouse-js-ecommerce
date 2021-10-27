import express from 'express';
import ProductManager from '../managers/productManager.js';

const productRouter = express.Router();
const productManager = new ProductManager();

export default productRouter;
