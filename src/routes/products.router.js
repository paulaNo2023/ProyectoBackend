import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import policies from "../middlewares/authorization.middleware.js";

const router = Router();
const productController = new ProductsController();

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct, policies.adminPolicy());

router.route('/:pid')
    .get(productController.getProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

export default router;