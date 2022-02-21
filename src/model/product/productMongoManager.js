import MongoManager from '../../dao/mongoManager.js';

export default class ProductMongoManager {
	constructor(file = null, db = 'coderhouse') {
		this.db = new MongoManager(file, db, 'products');
	}

	// Retorna todos los productos
	getAllProducts(){
		return this.db.readData();
	}

	// Obtiene un producto mediante su ID
	getPorductByID(productID){
		return this.db.readDataByID(productID);
	}

	// Elimina los productos con el id productID
	removeProductById(productID){
		this.db.deleteByID(productID);
	}

	// Agrega un Porducto
	addProdcut(nombre, descripcion, codigo, foto, precio, stock){
		const newProduct = {
			timestamp: Date.now(),
			nombre,
			descripcion,
			codigo,
			foto,
			precio,
			stock
		};

		this.db.writeData(newProduct);
	}

	// Edita el producto de id :id
	editProductByID(id, nombre, descripcion, codigo, foto, precio, stock){
		this.db.updateData({
			nombre,
			descripcion,
			codigo,
			foto,
			precio,
			stock
		},{_id:id});
	}

}