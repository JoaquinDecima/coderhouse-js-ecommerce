import FileManager from './fileManager.js';
import productManager from './productManager.js';

class CartManager {
  constructor() {
    this.fileManager = new FileManager('./carts.file');
    this.lastCartID = 0;
  }

  // Retorna todos los carritos
  getAllCarts(){
    return JSON.parse(this.fileManager.readData());
  }

  // Crea un carrito y retorna el ID
  addCart(){
    this.lastCartID += 1;

    const newCart = {
      id: this.lastCartID,
      timestamp: Date.now(),
      products: []
    }

    const carts = this.getAllProducts();
    carts.push(newCart);
    this.save(content);

    return this.lastCartID;
  }

  // Elimina los carritos con el id cartID
  removeCartById(cartID){
    let carts = this.getAllCarts();
    carts = carts.filter(cart => cart.id != cartID);
    this.save(carts);
  }

  // Obtiene un carrito mediante su ID
  getCartByID(cartID){
    const carts = this.getAllCarts();
    return carts.find(product => product.id == cartID);
  }

  // Retorna los productos del carrico con id cartID
  getProductsOfCartWhitID(cartID){
    let cart = this.getCartByID();
    return cart.products;
  }

  // Agrega el producto con id productID al carrito con id cartID
  addProductsOfCartWhitID(cartID, productID){
    const product = productManager.getPorductByID(productID);
    const carts = this.getAllCarts();

    carts.forEach(cart =>{
      if (cart.id == cartID){
        cart.products.push(product);
      }
    })
    this.save(products);
  }

  // Elimina el producto con id productID del carrito con id cartID
  removeProductsOfCartWhitID(cartID, productID){
    const carts = this.getAllCarts();

    carts.forEach(cart =>{
      if (cart.id == cartID){
        cart.products.filter(product => product.id != productID);
      }
    })
    this.save(products);
  }

  // Guarda los datos con el formato correcto
  save(data){
    this.fileManager.writeData(JSON.stringify(data,null,2));
  }
}

const cartManager = new CartManager;
export default cartManager;
