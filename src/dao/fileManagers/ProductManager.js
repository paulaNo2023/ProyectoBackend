import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct = async (producto) => {
        this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        producto.id = this.products.length + 1;
        this.products.push(producto);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), "utf-8")
        .then(console.log("Se guardó el producto"));
    };

    getProducts = async () => {
        let productsString = await fs.promises.readFile(this.path, "utf-8");
        let productsObj = JSON.parse(productsString);
        return productsObj;
    }

    getProductById = async (id) => {
        let productsStr = await fs.promises.readFile(this.path, "utf-8");
        let productsObj = JSON.parse(productsStr);
        let product = productsObj.find((p) => p.id === id);
        return product;
    }

    updateProduct = async(id, producto) => {
        let index;
        this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        index = this.products.findIndex((p) => p.id === id);
        this.products[index] = {
            id: id,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnails: producto.thumbnail,
            code: producto.code,
            stock: producto.stock,
            status: producto.status,
            category: producto.category,
            
        };
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }

    deleteProduct = async(id) => {
        this.products = await JSON.parse(fs.readFileSync(this.path, "utf-8"));
        this.products = this.products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
    }
}