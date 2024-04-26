import {promises as fs, read} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.productos2 = []
    }

    static id = 0

    addProduct = async (title, descripcion, precio, imagen, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            descripcion,
            precio,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }

        this.productos2.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.productos2));
    };

    readProducts = async() => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("Productos no Encontrado")
        } else {
        console.log(respuesta3.find(product => product.id === id))
        }
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(product => product.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    };

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts()
        let productsModificados = [
            {id, ...producto}, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModificados));
        };
}

// const productos = new ProductManager();

  /* productos.addProduct("Titulo1","Descripcion1", 1000, "Imagen1", "abc121", 5)
  productos.addProduct("Titulo2","Descripcion2", 2000, "Imagen2", "abc122", 10)
  productos.addProduct("Titulo3","Descripcion3", 3000, "Imagen3", "abc123", 15)
  productos.addProduct("Titulo4","Descripcion4", 3000, "Imagen4", "abc124", 20)
  productos.addProduct("Titulo5","Descripcion5", 3000, "Imagen5", "abc125", 25)
  productos.addProduct("Titulo6","Descripcion6", 3000, "Imagen6", "abc126", 30)
  productos.addProduct("Titulo7","Descripcion7", 3000, "Imagen7", "abc127", 35)
  productos.addProduct("Titulo8","Descripcion8", 3000, "Imagen8", "abc128", 40)
  productos.addProduct("Titulo9","Descripcion9", 3000, "Imagen9", "abc129", 45)
  productos.addProduct("Titulo10","Descripcion10", 3000, "Imagen10", "abc1210", 50) */

// productos.getProducts()
// productos.getProductsById(3)
// productos.deleteProductsById(2)

// productos.updateProducts({
//     title: 'Titulo3',
//     descripcion: 'Descripcion3',
//     precio: 4500,
//     imagen: 'Imagen3',
//     code: 'abc123',
//     stock: 15,
//     id: 3
//   })