import CartMongoManager from './model/cart/cartMongoManager.js';
import ProductMongoManager from './model/product/productMongoManager.js';
import UserMongoManager from './model/user/userMongoManager.js';
import 'dotenv/config';

export const usersData = new UserMongoManager(process.env.MONGO_USERS);
export const productsData = new ProductMongoManager(process.env.MONGO_PRODUCTS);
export const cartsData = new CartMongoManager(process.env.MONGO_CARTS, productsData);
