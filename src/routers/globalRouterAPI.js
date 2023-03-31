import express from 'express';
import authRouterAPI from './authRouterAPI.js';
import cartRouterAPI from './cartRouterAPI.js';
import productRouterAPI from './productRouterAPI.js';

const globalRouterAPI = express.Router();

globalRouterAPI.use('/auth/', authRouterAPI);
globalRouterAPI.use('/cart/', cartRouterAPI);
globalRouterAPI.use('/products/', productRouterAPI);

export default globalRouterAPI;
