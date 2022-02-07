import MongoManager from '../../dao/mongoManager.js';

export default class UserMongoManager{
	constructor(file = null, db = 'coderhouse') {
		this.db = new MongoManager(file, db, 'users');
	}

	// Retorna todos los usuarios
	getAllUsers(){
		this.db.readData()
			.then(data => {
				return data;
			})
			.catch( err => {
				return err;
			});
	}

	// Crea un usuario
	addUser(user){
		user._id = user.email;

		return this.db.writeData(user);
	}

	// Elimina los usuarios con el id cartID
	removeUserById(userID){
		this.db.deleteByID(userID);
	}

	// Obtiene un usuario mediante su ID
	getUserByID(userID){
		return this.db.readDataByID(userID);
	}
}