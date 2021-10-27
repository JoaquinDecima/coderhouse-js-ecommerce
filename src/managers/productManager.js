import FileManager from './fileManager.js';

export default class ProductManager {
  constructor() {
    this.fileManager = new FileManager('./products.file');
    this.lastProductID = this.getAllProducts().length;
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
  removeProductById(numID){
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

    const products = this.getAllProducts();
    products.push(newProduct);
    this.save(content);

    return this.lastProductID;
  }

  // Edita el producto de id :id
  editProductByID(id, nombre, descripcion, codigo, foto, precio, stock){
    const elems = this.getAll();
    var cambio = false;

    elems.forEach(elem =>{
      if (elem.id == id){
        elem.nombre = nombre;
        elem.descripcion = descripcion;
        elem.codigo = codigo;
        elem.foto = foto;
        elem.precio = precio;
        elem.stock = stock;
        cambio = true;
      }
    })
    this.save(elems);

    return cambio;
  }

  // Guarda los datos con el formato correcto
  save(data){
    this.fileManager.writeData(JSON.stringify(data,null,2));
  }
}
