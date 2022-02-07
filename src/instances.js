import CartMongoManager from './model/cart/cartMongoManager.js';
import ProductMongoManager from './model/product/productMongoManager.js';
import UserMongoManager from './model/user/userMongoManager.js';

export const usersData = new UserMongoManager('mongodb://jdecima:coderhouse@coderhouse-shard-00-00.gj3mp.mongodb.net:27017,coderhouse-shard-00-01.gj3mp.mongodb.net:27017,coderhouse-shard-00-02.gj3mp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-80zdtm-shard-0&authSource=admin&retryWrites=true&w=majority');
export const cartsData = new CartMongoManager('mongodb://jdecima:coderhouse@coderhouse-shard-00-00.gj3mp.mongodb.net:27017,coderhouse-shard-00-01.gj3mp.mongodb.net:27017,coderhouse-shard-00-02.gj3mp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-80zdtm-shard-0&authSource=admin&retryWrites=true&w=majority');
export const productsData = new ProductMongoManager('mongodb://jdecima:coderhouse@coderhouse-shard-00-00.gj3mp.mongodb.net:27017,coderhouse-shard-00-01.gj3mp.mongodb.net:27017,coderhouse-shard-00-02.gj3mp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-80zdtm-shard-0&authSource=admin&retryWrites=true&w=majority');
