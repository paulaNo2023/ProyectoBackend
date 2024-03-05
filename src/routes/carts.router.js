import { Router } from 'express';
import CartManager from '../class/Cart';

const cartManager = new CartManager('./src/BD/Carts.json');

const router = Router();

router.post('/', async(req, res) => {
    try {
        await cartManager.createCart()
        .then(res.json({ status: 'success', message: 'Se creo el carro' }));
    } catch (error) {
        res.json({ status: 'failed', message: 'No se creo el producto', error: error });
    }
});

router.get('/:cid', async(req, res) => {
    const cid = Number(req.params.cid);
    const products = await cartManager.getProductsCart(cid);
    if(products != undefined) {
        res.json(products);
    } else {
        res.json({ error: 'No se encontro el carro' });
    }
});

router.post('/:cid/product/:pid', async(req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);
    try {
        await cartManager.addProductCart(cid, pid)
        .then(res.json({ status: 'success', message: 'Se agregó el producto al carro' }));
    } catch (error) {
        res.json({ status: 'failed', message: 'No se pudo anadir el producto al carro', error: error });
    }
});

export default router;