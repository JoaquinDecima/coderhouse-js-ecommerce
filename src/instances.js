import CartMongoManager from './model/cart/cartMongoManager.js';
import ChatMongoManager from './model/chat/chatMongoManager.js';
import ProductMongoManager from './model/product/productMongoManager.js';
import UserMongoManager from './model/user/userMongoManager.js';
import 'dotenv/config';
import OrderMongoManager from './model/order/orderMongoManager.js';

export const usersData = new UserMongoManager(process.env.MONGO_USERS);
export const productsData = new ProductMongoManager(process.env.MONGO_PRODUCTS);
export const cartsData = new CartMongoManager(process.env.MONGO_CARTS, productsData);
export const chatData = new ChatMongoManager(process.env.MONGO_CHAT);
export const ordersData = new OrderMongoManager(process.env.MONGO_ORDER);