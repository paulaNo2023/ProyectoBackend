
class ProductManager{
  
    constructor(PATH){

      this.PATH = "./Productos.json"

  
    }
  
    getProducts = async() => {
      const products = await fs.promises.readFile(this.PATH, 'utf-8')
      console.log("~ProductManager ~ getProducts = async ~ data:", products)
    }
    
  

      addProducts = async(products) =>{
        products.id = 0
        const product = await this.getProducts()

        if(product.length ===0){
          products.id=1
        } else{
          products.id = product[product.length-1].id+1
        }
        product.push(products)
        await fs.promises.writeFile(this.PATH, JSON.stringify(product, null, "\t"))
        return products
      }
    
    
    /*generarId() {
      let id = 0;
    
      if (this.products.length === 0) {
        id = 1;
      } else {
        id = this.products[this.products.length - 1].id + 1;
      }
    
      return id;
    }*/
    
    getProductById(productId) {
      const product = this.products.findIndex((product) => product.id === productId);
      if (Id === -1) {
        console.log("Not found");
      }else{

      }
      
      return this.products[product].push(productId);
    
       }

       updateProduct= async(id,campo) =>{
       
        }

       deleteProducts = async(id) => {
        const id = product.find((Element)=> element.id);
        product = product.filter((productId) =>{
           
        });
        await fs.promises.writeFile(this.PATH, JSON.stringify(id, null, "\t"))
        return productId !== id;


    
        }
  
    
    }
  /*const administrador = new ProductManager()
  administrador.addProduct("Iphone","Celular de alta gama","$6.000.000","NA","123","25")
  administrador.addProduct("Aspiradora","Elemento de aseo","$1.000.000","NA","124","10")
  administrador.addProduct("Computador","Elemento de tecnologia","$5.000.000","NA","125","15")
  const result = administrador.getProducts()*/
