import MongoManager from '../../dao/mongoManager.js';
import {logger} from '../tools/logger.js';

export default class ChatMongoManager {
	constructor(file = null, db = 'coderhouse') {
		this.db = new MongoManager(file, db, 'chat');
	}

	// Retorna todos los productos
	getAllMenssage(){
		this.db.readData()
			.then(result => {
				return result;
			})
			.catch(err => {
				logger.error(`Error: ${err} - Al recuperar Chat`);
				return [];
			});
	}

	// Agrega un Porducto
	addMenssage(newMenssage){
		return this.db.writeData(newMenssage);
	}
}