import FileManager from './fileManager.js';

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

  // Elimina los carritos con el id numID
  removeCartById(numID){
    let carts = this.getAllCarts();
    carts = carts.filter(cart => cart.id != numID);
    this.save(carts);
  }

  // Guarda los datos con el formato correcto
  save(data){
    this.fileManager.writeData(JSON.stringify(data,null,2));
  }
}

const cartManager = new CartManager;
export default cartManager;
