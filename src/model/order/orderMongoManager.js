import MongoManager from '../../dao/mongoManager.js';

export default class OrderMongoManager{
	constructor(file = null, db = 'coderhouse'){
		this.db = new MongoManager(file, db, 'orders');
	}

	addOrder(order){
		this.db.writeData(order);
	}
}