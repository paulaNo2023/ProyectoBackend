import { Router } from 'express';
import { CartsController } from '../controller/carts.controller.js';
import policies from '../middlewares/authorization.middleware.js';

const router = Router();
const cartsController = new CartsController();

router.route('/')
    .post(cartsController.createCart)

router.route('/:cid')
    .get(cartsController.getProductsInCart)
    .delete(cartsController.deleteProducts)
    .put(cartsController.updateCart)

router.route('/:cid/product/:pid')
    .post(cartsController.addProductToCart, policies.productPolicy)

router.route('/:cid/products/:pid')
    .put(cartsController.updateProductQuantity)
    .delete(cartsController.deleteProductFromCart)

export default router;