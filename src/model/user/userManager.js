import FileManager from '../../dao/fileManager.js';

class UserManager {
	constructor() {
		this.fileManager = new FileManager('./users.file');
		this.lastUserID = 0;
	}

	// Retorna todos los usuarios
	getAllUsers(){
		return JSON.parse(this.fileManager.readData());
	}

	// Crea un usuario y retorna el ID
	addUser(user){
		this.lastUserID += 1;
		user.id = this.lastUserID;

		const users = this.getAllUsers();
		users.push(user);
		this.save(users);

		return this.lastUserID;
	}

	// Elimina los usuarios con el id cartID
	removeUserById(userID){
		let users = this.getAllUsers();
		this.save(users.filter(cart => cart.id != userID));
	}

	// Obtiene un usuario mediante su ID
	getUserByID(userID){
		const users = this.getAllUsers();
		return users.find(product => product.id == userID);
	}

	// Guarda los datos con el formato correcto
	save(data){
		this.fileManager.writeData(JSON.stringify(data,null,2));
	}
}

const userManager = new UserManager();
export default userManager;
