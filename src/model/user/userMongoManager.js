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

	// Crea un usuario y retorna el ID
	addUser(user){
		user._id = user.email;

		this.db.writeData(user)
			.then(() =>{
				return user.email;
			})
			.catch( err => {
				return err;
			});
	}

	// Elimina los usuarios con el id cartID
	removeUserById(userID){
		this.db.deleteByID(userID);
	}

	// Obtiene un usuario mediante su ID
	getUserByID(userID){
		this.db.readDataByID(userID)
			.then(data => {
				return data;
			})
			.catch(err => {
				return err;
			});
	}
}