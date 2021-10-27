import FileManager from './fileManager.js';

export default class CartManager {
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

  // Guarda los datos con el formato correcto
  save(data){
    this.fileManager.writeData(JSON.stringify(data,null,2));
  }
}
