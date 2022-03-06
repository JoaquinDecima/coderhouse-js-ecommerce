import MongoManager from '../../dao/mongoManager.js';

export default class CartMongoManager{
	constructor(file = null, productsManger, db = 'coderhouse') {
		this.db = new MongoManager(file, db, 'carts');
		this.product = productsManger;
	}

	// Retorna todos los carritos
	getAllCarts(){
		this.db.readData()
			.then(data => {
				return data;
			})
			.catch( err => {
				return err;
			});
	}

	// Crea un carrito y retorna el ID
	addCart(user){
		this.db.writeData({
			_id: user,
			timestamp: Date.now(),
			products: []
		});
	}

	// Elimina los carritos con el id cartID
	removeCartById(cartID){
		this.db.deleteByID(cartID);
	}

	// Obtiene un carrito mediante su ID
	getCartByID(cartID){
		return this.db.readDataByID(cartID);
	}

	// Retorna los productos del carrico con id cartID
	async getProductsOfCartWhitID(cartID){
		let cart = await this.getCartByID(cartID);
		return cart[0].products;
	}

	// Agrega el producto con id productID al carrito con id cartID
	async addProductsOfCartWhitID(cartID, productID){
		const product = await this.product.getPorductByID(productID);

		this.db.updateData({
			products: this.getProductsOfCartWhitID(cartID).concat(product)
		}, { _id:cartID });
	}

	// Elimina el producto con id productID del carrito con id cartID
	removeProductsOfCartWhitID(cartID, productID){
		this.db.updateData({
			products: this.getProductsOfCartWhitID(cartID).filter(product => product.id != productID)
		}, { _id:cartID });
	}

}