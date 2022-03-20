import MongoManager from '../../dao/mongoManager.js';
import {logger} from '../../tools/logger.js';

export default class ChatMongoManager {
	constructor(file = null, db = 'coderhouse') {
		this.db = new MongoManager(file, db, 'chat');
	}

	// Retorna todos los productos
	async getAllMenssage(){
		return await this.db.readData();
	}

	// Agrega un Porducto
	addMenssage(newMenssage){
		return this.db.writeData(newMenssage);
	}
}