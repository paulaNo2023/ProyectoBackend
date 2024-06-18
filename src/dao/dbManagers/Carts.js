import cartsModel from "../models/carts.js";

export default class Carts {
    createCart = async cart => {
        let result = await cartsModel.create(cart);
        return result;
    }

    getProductsInCart = async (cartId) => {
        let cart = undefined;
        let exists = await cartsModel.exists({ _id: cartId })
        if (cartId.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            let cart = await cartsModel.findOne({ _id: cartId }).lean();
            return cart.products;
        } else {
            return cart;
        }
    }

    addProductToCart = async (cartId, productId) => {
        let cart = undefined;
        let exists = await cartsModel.exists({ _id: cartId })
        if (cartId.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            let cart = await cartsModel.findById(cartId).lean();
            let product = cart.products.find(p => p.product._id.toString() === productId);
            let producto = {};
            if (product === undefined) {
                producto.product = productId;
                producto.quantity = 1;
                cart.products.push(producto);
                let cartUpdate = await cartsModel.findByIdAndUpdate(cartId, { $set: cart }).lean();
            } else {
                let quantity = product.quantity + 1;
                let cartUpdate = await cartsModel.findOneAndUpdate({ _id: cartId, "products.product": productId }, { $set: { "products.$.quantity": quantity } }).lean();
            }
            return cartUpdate;
        } else {
            return cart;
        }
    }

    deleteProductFromCart = async (cartId, productId) => {
        let cart = undefined;
        let exists = await cartsModel.exists({ _id: cartId })
        if (cartId.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            let cart = await cartsModel.findById(cartId).lean();
            let product = cart.products.find(p => p.product._id.toString() === productId);
            if (product !== undefined) {
                let index = cart.products.indexOf(product);
                cart.products.splice(index, 1);
                let cartUpdate = await cartsModel.findByIdAndUpdate(cartId, { $set: cart }).lean();
            }
            return cartUpdate;
        } else {
            return cart;
        }
    }

    updateCart = async (cartId, products) => {
        let cart = undefined;
        let exists = await cartsModel.exists({ _id: cartId })
        if (cartId.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            let cart = await cartsModel.findById(cartId).lean();
            cart.products = products;
            let cartUpdate = await cartsModel.findByIdAndUpdate(cartId, { $set: cart }).lean();
            return cartUpdate;
        } else {
            return cart;
        }
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        let cart = undefined;
        let exists = await cartsModel.exists({ _id: cartId })
        if (cartId.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            let cart = await cartsModel.findById(cartId).lean();
            let product = cart.products.find(p => p.product._id.toString() === productId);
            if (product !== undefined) {
                let index = cart.products.indexOf(product);
                cart.products[index].quantity = quantity;
                let cartUpdate = await cartsModel.findByIdAndUpdate(cartId, { $set: cart }).lean();
            }
            return cartUpdate;
        } else {
            return cart;
        }
    }

    deleteProducts = async (cartId) => {
        let cart = undefined;
        let exists = await cartsModel.exists({ _id: cartId })
        if (cartId.match(/^[0-9a-fA-F]{24}$/) && exists !== null) {
            let cart = await cartsModel.findById(cartId).lean();
            cart.products = [];
            let cartUpdate = await cartsModel.findByIdAndUpdate(cartId, { $set: cart }).lean();
            return cartUpdate;
        } else {
            return cart;
        }
    }

}