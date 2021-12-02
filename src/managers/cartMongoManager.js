import MongoManager from "./mongoManager.js";
import productManager from "./productManager.js";
import {response} from "express";

export default class CartMongoManager{
    constructor(file = null, db = "coderhouse") {
        this.db = new MongoManager(file, db, "cart");
    }

    // Retorna todos los carritos
    getAllCarts(){
        this.db.readData()
            .then(data => {
                return data;
            })
            .catch( err => {
                return err;
            })
    }

    // Crea un carrito y retorna el ID
    addCart(){
        this.db.writeData({
            timestamp: Date.now(),
            products: []
        })
            .then(response => {
                return response.toArray();
            })
    }

    // Elimina los carritos con el id cartID
    removeCartById(cartID){
        this.db.deleteByID(cartID);
    }

    // Obtiene un carrito mediante su ID
    getCartByID(cartID){
        this.db.readDataByID(cartID)
            .then(data => {
                return data
            })
            .catch(err => {
                return err
            })
    }

    // Retorna los productos del carrico con id cartID
    getProductsOfCartWhitID(cartID){
        let cart = this.getCartByID(cartID);
        return cart.products;
    }

    // Agrega el producto con id productID al carrito con id cartID
    addProductsOfCartWhitID(cartID, productID){
        const product = productManager.getPorductByID(productID);

        this.db.updateData({
            products: this.getProductsOfCartWhitID(cartID).concat(product)
        }, { _id:cartID })
    }

    // Elimina el producto con id productID del carrito con id cartID
    removeProductsOfCartWhitID(cartID, productID){
        const cart = this.getCartByID(cartID);

        this.db.updateData({
            products: this.getProductsOfCartWhitID(cartID).filter(product => product.id != productID)
        }, { _id:cartID })
    }

}