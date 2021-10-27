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
    let products = this.getAllProducts();
    products = products.filter(product => product.id != numID);
    this.save(products);
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
    const products = this.getAllProducts();
    var cambio = false;

    products.forEach(product =>{
      if (product.id == id){
        product.nombre = nombre;
        product.descripcion = descripcion;
        product.codigo = codigo;
        product.foto = foto;
        product.precio = precio;
        product.stock = stock;
        cambio = true;
      }
    })
    this.save(products);

    return cambio;
  }

  // Guarda los datos con el formato correcto
  save(data){
    this.fileManager.writeData(JSON.stringify(data,null,2));
  }
}
