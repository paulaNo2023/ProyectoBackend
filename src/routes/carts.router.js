import { Router } from 'express';
import CartManager from '../dao/dbManagers/Carts';

const cartManager = new CartManager();

const router = Router();

router.post('/', async (req, res) => {
    try {
        let data = await cartManager.createCart()
        res.json(data)
    } catch (error) {
        res.status(401);
    }
});

router.get('/:cid', async (req, res) => {
    const cid = String(req.params.cid);
    const products = await cartManager.getProductsInCart(cid);
    if (products != null) {
        res.json(products);
    } else {
        res.json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        await cartManager.addProductToCart(cid, pid)
            .then(res.json({ status: 'success', message: 'Se agregó el producto al carrito' }));
    } catch (error) {
        res.status({ status: 'failed', message: 'El producto no pudó ser añadido al carrito', error: error });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        await cartManager.deleteProductFromCart(cid, pid)
            .then(res.json({ status: 'success', message: 'Se eliminó el producto del carrito' }));
    } catch (error) {
        res.status({ status: 'failed', message: 'El producto no pudó ser eliminado del carrito', error: error });
    }
});

router.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const products = req.body.products;
    try {
        await cartManager.updateCart(cid, products)
            .then(res.json({ status: 'success', message: 'Se actualizó el carrito' }));
    } catch (error) {
        res.status({ status: 'failed', message: 'El carrito no pudó ser actualizado', error: error });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    try {
        await cartManager.updateProductQuantity(cid, pid, quantity)
            .then(res.json({ status: 'success', message: 'Se actualizó la cantidad del producto en el carrito' }));
    } catch (error) {
        res.status({ status: 'failed', message: 'La cantidad del producto no pudó ser actualizada', error: error });
    }
});

router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    try {
        await cartManager.deleteProducts(cid)
            .then(res.json({ status: 'success', message: 'Se eliminaron los productos del carrito' }));
    } catch (error) {
        res.status({ status: 'failed', message: 'El carrito no pudó ser eliminado', error: error });
    }
});

export default router;