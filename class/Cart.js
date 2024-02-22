import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    createCart = async () => {
        let cart = {};
        this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        cart.id = this.carts.length + 1;
        cart.products = [];
        this.carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), "utf-8")
        .then(console.log("Se crea el carro"));
    }

    getProductsCart = async (cartId) => {
        this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8" ));
        let cart = this.carts.find((cart) => cart.id = cartId);
        return cart.products;
    }

    addProductCart = async (cartId, productId) => {
        this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8" ));
        let index = this.carts.findIndex((c) => c.id === cartId);
        if(this.carts[index].products.some((p) => p.product === productId)){
            let indexProducto = this.carts[index].products.findIndex((p) => p.product === productId);
            this.carts[index].products[indexProducto].quantity ++;
        } else {
            let productArr = {
                product: productId,
                quantity: 1
            }
            this.carts[index].products.push(productArr);
        }
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), "utf-8")
        .then(console.log("Se agregó el producto"));        
    }
}