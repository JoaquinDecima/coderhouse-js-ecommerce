import FileManager from './fileManager.js';

class ProductManager {
  constructor() {
    this.lastProductID = 0;
    this.fileManager = new FileManager('./products.file');
  }

  // Retorna todos los productos
  getAllProducts(){
    return JSON.parse(this.fileManager.readData());
  }

  // Obtiene un producto mediante su ID
  getPorductByID(numID){
    const elems = this.getAll();
    return elems.find(elem => elem.id == numID);
  }

  // Elimina los productos con el id numID
  deleteProductById(numID){
    let elems = this.getAll();
    elems = elems.filter(elem => elem.id != numID);
    this.save(elems);
  }

  // Agrega un Porducto
  addProdcut(nombre, descripcion, codigo, foto, precio, stock){
    this.lastProductID += 1;

    const newProduct = {
      id: this.lastProductID,
      timestamp: Date.now(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    }

    const content = this.getAllProducts();
    content.push(object);
    this.save(content);

    return this.lastProductID;
  }

  // Guarda los datos con el formato correcto
  save(data){
    this.fileManager.writeData(JSON.stringify(data,null,2));
  }
}
