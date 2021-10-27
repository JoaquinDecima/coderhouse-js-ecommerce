import FileManager from './fileManager.js';

class ProductManager {
  constructor() {
    this.fileManager = new FileManager('./products.file');
    this.lastProductID = this.getAllProducts().length;
  }

  // Retorna todos los productos
  getAllProducts(){
    return JSON.parse(this.fileManager.readData());
  }

  // Obtiene un producto mediante su ID
  getPorductByID(productID){
    const products = this.getAllProducts();
    return products.find(product => product.id == productID);
  }

  // Elimina los productos con el id productID
  removeProductById(productID){
    let products = this.getAllProducts();
    products = products.filter(product => product.id != productID);
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

const productManager = new ProductManager();
export default productManager;
