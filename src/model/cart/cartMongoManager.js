import MongoManager from '../../dao/mongoManager.js';
import {productsData} from '../../instances.js';

export default class CartMongoManager{
	constructor(file = null, productsManger, db = 'coderhouse') {
		this.db = new MongoManager(file, db, 'carts');
		this.product = productsData;
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
	async addCart(user){
		await this.db.writeData({
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
		console.log(cart);
		return cart[0].products;
	}

	// Agrega el producto con id productID al carrito con id cartID
	async addProductsOfCartWhitID(cartID, productID){
		let productList = await this.getProductsOfCartWhitID(cartID);
		await this.product.getPorductByID(productID)
			.then(async product => {
				let exist = false;
				productList.forEach(elem =>{
					exist = exist || elem._id === productID;
				});
				if(exist){
					productList.map(elem => {
						if (elem._id == productID){
							elem.cant += 1;
						}
					});
					await this.db.updateData({
						products: productList
					}, { _id:cartID });
				}else{
					console.log(product);
					product[0].cant = 1;
					delete product[0].stock;
					await this.db.updateData({
						products: productList.concat(product[0])
					}, { _id:cartID });
				}

			});
	}

	// Elimina el producto con id productID del carrito con id cartID
	async removeProductsOfCartWhitID(cartID, productID){
		let productList = await this.getProductsOfCartWhitID(cartID);
		let removed = false;
		productList.map(elem =>{
			if (elem._id == productID && elem.cant > 1){
				elem.cant -= 1;
				removed = true;
			}
		});
		if(!removed){
			productList = productList.filter(elem => elem._id !== productID);
		}
		console.log(productList);
		await this.db.updateData({
			products: productList
		}, { _id:cartID });
	}

}