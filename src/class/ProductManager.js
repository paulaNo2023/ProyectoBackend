import fs from "fs"
class ProductManager{
  
    constructor(PATH){

      this.PATH = PATH;
      this.products = [];

  
    }
  
    getProducts = async() => {
      let productsStr = await fs.promises.readFile(this.PATH, "utf-8");
      let productsObject = JSON.parse(productsStr);
      return productsObject; 
    }
    
    addProducts = async(producto) =>{
        this.products = JSON.parse(await fs.promises.readFile(this.PATH,"utf-8" ));
        producto.id = this.products.length+1;
        this.products.push(producto);
        await fs.promises.writeFile(this.PATH, JSON.stringify(this.products, null, '\t'), "utf-8").then(console.log("El producto quedo guardado"));
    }
  
    
    getProductById = async(id) => {
      let productSt = await fs.promises.readFile(this.PATH, "utf-8");
      let productsOb = JSON.parse(productSt);
      let product = productsOb.find((p) => p.id== id);
      return product; 

    
    }

    updateProduct= async(id,producto) =>{
      let index;
      this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      index = this.products.findIndex((p) => p.id === id);
      this.products[index] = {
          title: producto.title,
          description: producto.description,
          code: producto.code,
          price: producto.price,
          status: producto.status,
          stock: producto.stock,
          category: producto.category,
          thumbnails: producto.thumbnail, 
          id: id
      };
      await fs.promises.writeFile(this.PATH, JSON.stringify(this.products, null, '\t'))
       
    }

    deleteProducts = async(id) => {
      this.products = await JSON.parse(fs.readFileSync(this.PATH, "utf-8"));
      this.products = this.products.filter((p) => p.id !==id);
      await fs.promises.writeFile(this.PATH, JSON.stringify(this.products, null, '\t'));


    
    }
  
    
    }
  /*const administrador = new ProductManager()
  administrador.addProduct("Iphone","Celular de alta gama","$6.000.000","NA","123","25")
  administrador.addProduct("Aspiradora","Elemento de aseo","$1.000.000","NA","124","10")
  administrador.addProduct("Computador","Elemento de tecnologia","$5.000.000","NA","125","15")
  const result = administrador.getProducts()*/
