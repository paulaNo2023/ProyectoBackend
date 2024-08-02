import { CartsService } from "../service/carts.service.js";

const cartsService = new CartsService();

export class CartsController {
    constructor() {
    }

    getCarts = async (req, res) => {
        try {
            const carts = await cartsService.getAll();
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvieron los carritos',
                payload: carts
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No pudieron obtener los carritos',
                payload: error
            });
        }
    }

    getCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartsService.getId(cid)
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvo el carrito',
                payload: cart
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo obtener el carrito',
                payload: error
            });
        }
    }

    getProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const products = await cartsService.getId(cid); 
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvieron los productos del carrito',
                payload: products.products
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudieron obtener los productos del carrito',
                payload: error
            });
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await cartsService.getId(cid);
            const product = cart.products.find(p => p.product._id.toString() === pid);
            let index = cart.products.indexOf(product);
            let producto = {};
            let result = undefined;
            if (product === undefined) {
                producto.product = pid;
                producto.quantity = 1;
                cart.products.push(producto);
                result = await cartsService.update(cid, cart);
            } else {
                let quantity = product.quantity + 1;
                cart.products[index].quantity = quantity;
                result = await cartsService.update(cid, cart);
            }
            res.status(201).send({
                status: 'success',
                message: 'Se agregó el producto al carrito',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'El producto no pudó ser añadido al carrito',
                payload: error
            });
        }
    }

    updateProductQuantity = async (req, res) => {
        try {
            const { cid, pid,  } = req.params;
            const quantity = req.body.quantity;
            const cart = cartsService.getCart(cid);
            let product = cart.products.find(p => p.product._id.toString() === pid);
            let index = cart.products.indexOf(product);
            cart.products[index].quantity = quantity;
            const result = cartsService.updateCart(cid, cart);
            res.status(201).send({
                status: 'success',
                message: 'Se actualizó la cantidad del producto del carrito',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'La cantidad del producto no pudó ser actualizada del carrito',
                payload: error
            });
        }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await cartsService.getId(cid);
            const product = cart.products.find(p => p.product._id.toString() === pid);
            let result = undefined;
            if (product !== undefined) {
                let index = cart.products.indexOf(product);
                cart.products.splice(index, 1);
                result = await cartsService.update(cid, cart);
            }
            res.status(201).send({
                status: 'success',
                message: 'Se eliminó el producto del carrito',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'El producto no pudó ser eliminado del carrito',
                payload: error
            });
        }
    }

    deleteProducts = async (req, res) => {
        try {
            const {cid} = req.params;
            const cart = await cartsService.getId(cid);
            cart.products = [];
            const result = cartsService.updateCart(cid);
            res.status(201).send({
                status: 'success',
                message: 'Se eliminaron los productos del carrito',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudieron eliminar los productos del carrito',
                payload: error
            });
        }
    }

    createCart = async (req, res) => {
        try {
            const result = await cartsService.create({});
            res.status(201).send({
                status: 'success',
                message: 'Se creó el carrito',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo crear el carrito',
                payload: error
            });
        }
    }

    updateCart = async (req, res) => {
        try {
            const {cid} = req.params;
            const { products } = req.body;
            if(!products) return res.status(400).send({
                status: 'error',
                message: 'Faltan datos'
            });
            const cart = { products };
            const result = await cartsService.update(cid, cart);
            res.status(201).send({
                status: 'success',
                message: 'Se actualizó el carrito',
                payload: result
            })
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo actualizar el carrito',
                payload: error
            })
        }
    }

}